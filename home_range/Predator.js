class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heading = 2 * Math.PI * Math.random();

        this.vx = 0;
        this.vy = 0;
    }
    update() {
        let distance = getDistanceFromCenter(this.x, this.y);
        let outward_weight;

        if(distance > 1.5 * d0) {
            outward_weight = 0;
        }
        else {
            if(distance < 0.9 * d0) {
                outward_weight = 0.8;
            }
            else if(distance < 1.1 * d0) {
                outward_weight = 0.5;
            }
            else if(distance < 1.3 * d0) {
                outward_weight = 0.3;
            }
            else {
                outward_weight = 0.2;
            }
        }

        let random_angle = turning_angle * Math.random() - (turning_angle / 2);
        this.heading += random_angle;

        this.out_vx = this.x - canvas_width / 2;
        this.out_vy = this.y - canvas_height / 2;
        this.normalizeOutVelocity();

        this.vx = Math.cos(this.heading) + outward_weight * this.out_vx;
        this.vy = Math.sin(this.heading) + outward_weight * this.out_vy;
        this.normalizeVelocity();

        this.x += v_predator * this.vx * dt;
        this.y += v_predator * this.vy * dt;

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
    render() {
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.arc(this.x, this.y, predator_radius, 0, 2 * Math.PI, false)
        context.fill();
    }
    normalizeVelocity() {
        let normalization_constant = getMagn(this.vx, this.vy);
        this.vx /= normalization_constant;
        this.vy /= normalization_constant;
    }
    normalizeOutVelocity() {
        let normalization_constant = getMagn(this.out_vx, this.out_vy);
        this.out_vx /= normalization_constant;
        this.out_vy /= normalization_constant;
    }
    getLocation() {
        let row = Math.ceil(this.y / res);
        let col = Math.ceil(this.x / res);
        return [row, col];
    }
}

function addPredator(number = 1) {
    let i = 0;
    let new_predator, distance;
    while(i < number) {
        distance = 0;
        while (distance < d0) {
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            distance = getDistanceFromCenter(x, y);
        }
        new_predator = new Predator(x, y);
        predators.push(new_predator);
        i++;
    }
    updateParams("predator");
}   

function removePredator(number = 1) {
    let i = 0;
    while(i < number && predators.length) {
        predators.pop();
        i++;
    }
    updateParams("predator");
}

function clearPredators() {
    predators = [];
    updateParams("predator");
}