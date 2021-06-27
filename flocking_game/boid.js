class Boid {
    constructor(params) {
        this.index = boids.length;

        this.spoke_length = 5;
        this.move_speed = 1.5;
        this.rotate_speed = 5;

        this.isAlive = true;

        if (params === undefined) {
            this.setPosition();
            this.setBehaviour();
        }
        else {
            this.x = params.x;
            this.y = params.y;
            this.angle = params.angle;

            if (params.a === undefined) {
                this.attraction = 0.4;
                this.orientation = 0.3;
                this.persistence = 0.2;
            }
            else {
                this.attraction = params.a;
                this.orientation = params.o;
                this.persistence = params.p;
            }
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
    orient(angle) {
        if (Math.abs(angle, this.angle) < this.rotate_speed) {
            this.angle = angle;
        }
        else if (this.angle < angle) {
            this.angle += this.rotate_speed;
        }
        else {
            this.angle -= this.rotate_speed;
        }
    }
    move() {
        if (this.isAlive) {
            this.x += this.move_speed * Math.cos(toRadian(this.angle));
            this.y += this.move_speed * Math.sin(toRadian(this.angle));

            if (this.x < 0) {
                this.x = canvas_width;
            }
            else if (this.x > canvas_width) {
                this.x = 0;
            }

            if (this.y < 0) {
                this.y = canvas_height;
            }
            else if (this.y > canvas_height) {
                this.y = 0;
            }
        }
    }
    render() {
        if (this.isAlive) {
            context.fillStyle = "#ffffff";
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.moveTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle)), this.y + this.spoke_length * Math.sin(toRadian(this.angle)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle + 150)), this.y + this.spoke_length * Math.sin(toRadian(this.angle + 150)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle + 210)), this.y + this.spoke_length * Math.sin(toRadian(this.angle + 210)));
            context.lineTo(this.x + this.spoke_length * Math.cos(toRadian(this.angle)), this.y + this.spoke_length * Math.sin(toRadian(this.angle)));
            context.closePath();
            context.fill();
        }
    }
    click_kill() {
        this.isAlive = false;
        drawHistograms();
    }
}

function addBoids(number) {
    for (let i = 0; i < number; i++) {
        boids.push(new Boid());
    }
    drawHistograms();
}

function clearBoids() {
    boids = [];
    drawHistograms();
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