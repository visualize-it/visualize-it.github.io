let tortousity_steps = 120;

class Boid {
    constructor(position_params, social_params, highlight) {
        this.index = boids.length;

        this.spoke_length = 5;
        this.move_speed = 1;
        this.rotate_speed = 5;

        this.isAlive = true;
        this.highlight = (highlight === undefined) ? false : highlight;

        this.tortuosity = undefined;

        if (position_params === undefined) {
            this.setPosition(); 
        }
        else {
            this.x = params.x;
            this.y = params.y;
            this.angle = params.angle;
        }

        if(social_params === undefined) {
            this.setBehaviour();
        }
        else {
            this.attraction = social_params.a;
            this.orientation = social_params.o;
            this.persistence = social_params.p;
        }

        this.normaliseBehaviour();
        this.setColor();
    }
    setPosition() {
        this.x = Math.random() * canvas_width;
        this.y = Math.random() * canvas_height;
        this.angle = Math.random() * 360;
    }
    setBehaviour() {
        this.attraction = Math.random();
        this.orientation = Math.random();
        this.persistence = Math.random();
    }
    normaliseBehaviour() {
        let sum = this.attraction + this.orientation + this.persistence;
        this.attraction /= sum;
        this.orientation /= sum;
        this.persistence /= sum;
    }
    setColor() {
        if (this.attraction > this.orientation + this.persistence) {
            this.color = "#ff0000";
        }
        else if (this.orientation > this.attraction + this.persistance) {
            this.color = "#00ff00";
        }
        else if (this.persistence > this.attracton + this.orientation) {
            this.color = "#0000ff";
        }
        else if (this.attraction + this.orientation > this.persistence) {
            this.color = "#ffff00";
        }
        else if (this.orientation + this.persistence > this.attraction) {
            this.color = "#00ffff";
        }
        else {
            this.color = "#ff00ff";
        }
    }
    orient(angle, cause) {
        let orient_angle = minimiseDifference(angle, this.angle);

        if(debug) {
            console.log("Boid index:", this.index, "Initial angle:", this.angle, "Orientation angle:", orient_angle, "Cause:", cause);
        }

        if (Math.abs(orient_angle - this.angle) < this.rotate_speed) {
            this.angle = orient_angle;

            let direction = (orient_angle - this.angle > 0) ? "anticlockwise" : "clockwise";

            if(debug) {
                console.log("Aligned", direction, "with orientation angle");
            }
        }
        else if(Math.abs(orient_angle - this.angle) == 180) {
            this.angle += this.rotate_speed;
        }
        else if (this.angle < orient_angle) {
            this.angle += this.rotate_speed;
            
            if(debug) {
                console.log("Rotated clockwise to", this.angle);
            }
        }
        else {
            this.angle -= this.rotate_speed;

            if(debug) {
                console.log("Rotate anticlockwise to", this.angle);
            }
        }
    }
    move() {
        if (this.isAlive) {
            this.angle += gaussianNoise(-10, 10);
            this.x += this.move_speed * Math.cos(toRadian(this.angle));
            this.y += this.move_speed * Math.sin(toRadian(this.angle));

            if (this.x < 0) {
                this.x = canvas_width;

                if(this.prev_x !== undefined) {
                    this.prev_x += canvas_width;
                }
            }
            else if (this.x > canvas_width) {
                this.x = 0;

                if(this.prev_x !== undefined) {
                    this.prev_x -= canvas_width;
                }
            }

            if (this.y < 0) {
                this.y = canvas_height;

                if(this.prev_y !== undefined) {
                    this.prev_y += canvas_height;
                }
            }
            else if (this.y > canvas_height) {
                this.y = 0;

                if(this.prev_y !== undefined) {
                    this.prev_y -= canvas_height;
                }
            }
        }
    }
    render() {
        if (this.isAlive) {
            if(this.highlight) {
                context.fillStyle = "#aaaaaa";
                context.beginPath();
                context.arc(this.x, canvas_height - this.y, 3 * this.spoke_length, 0, 2 * Math.PI, false);
                context.closePath();
                context.fill();
                this.highlight = false;
            }

            context.fillStyle = "#ffffff";
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.moveTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle)), (canvas_height - this.y) - this.spoke_length * Math.sin(toRadian(this.angle)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle + 150)), (canvas_height - this.y) - this.spoke_length * Math.sin(toRadian(this.angle + 150)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle + 210)), (canvas_height - this.y) - this.spoke_length * Math.sin(toRadian(this.angle + 210)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle)), (canvas_height - this.y) - this.spoke_length * Math.sin(toRadian(this.angle)));
            context.closePath();
            context.fill();
        }
    }
    click_kill() {
        records.push({x: this.attraction, y: this.orientation});
        console.log(records);
        this.isAlive = false;
        drawHistograms();
        drawFrequencies();
    }
    getSocialParams() {
        return {a: this.attraction, o: this.orientation, p: this.persistence}
    }
    storePosition() {
        this.prev_x = this.x;
        this.prev_y = this.y;
    }
    calculateTortuosity() {
        if(this.prev_x !== undefined && this.prev_y !== undefined) {
            this.tortuosity = 1 - (displacement(this.prev_x, this.prev_y, this.x, this.y) / (this.move_speed * tortuosity_max));
            
            if(this.tortuosity > 1) {
                this.tortuosity = 1;
            }
        }
        else {
            this.tortuosity = undefined;
        }
    }
}

function addBoids(number) {
    for (let i = 0; i < number; i++) {
        boids.push(new Boid());
    }
    updateParams("number");
    drawHistograms();
    drawTortuosityHistogram();
}

function clearBoids() {
    boids = [];
    updateParams("number");
    drawHistograms();
    drawTortuosityHistogram();
}

function numAliveBoids() {
    let num = 0;

    for(let boid of boids) {
        if(boid.isAlive) {
            num++;
        }
    }
    return num;
}

function reproduceBoid() {
    let alive_boid_indices = [];

    for(let boid of boids) {
        if(boid.isAlive) {
            alive_boid_indices.push(boid.index);
        }
    }

    let social_params = boids[alive_boid_indices[Math.floor(Math.random() * alive_boid_indices.length)]].getSocialParams();

    boids.push(new Boid(undefined, social_params, true));
}

function restartSimulation() {
    clearBoids();
    addBoids(density * canvas_width * canvas_height / 10000);
}