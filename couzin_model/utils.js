function addBoids() {
    for (let i = 0; i < boid_step; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let angle = Math.random() * 2 * Math.PI;

        let position = new Vector(x, y);
        let velocity = Vector.fromHeading(angle);

        let new_boid = new Boid(position, velocity);
        boids.push(new_boid);
    }
    num_boids += boid_step;
    updateParams("num-boids");
}

function removeBoids() {
    let num_removed = 0;

    while (num_removed < boid_step) {
        if (num_boids > 0) {
            boids.pop();
            num_boids--;
            num_removed++;
        }
        else {
            break;
        }
    }
    updateParams("num-boids");
}

function clearBoids() {
    boids = [];
    num_boids = 0;
    updateParams("num-boids");
}

function inBlindSpot(boid, other_boid) {
    let focal_boid_heading = boid.direction;
    let x = other_boid.position.x - boid.position.x;
    let y = other_boid.position.y - boid.position.y;
    let relative_angle = Math.atan2(y, x);
    angle_diff = Math.abs(focal_boid_heading - relative_angle);

    if (angle_diff < Math.PI - blind_angle / 2) {
        return true;
    }
    else {
        return false;
    }
}

function getBoidsWithin(boid, radius) {
    let boids_within = [];
    
    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (distanceBetween(boid.position, other_boid.position) < radius) {
                if (!inBlindSpot(boid, other_boid)) {
                    boids_within.push(other_boid);
                }
            }
        }
    }

    return boids_within;
}

function distanceBetween(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

function toRadian(angle) {
    return angle * (Math.PI / 180);
}

function toDegree(angle) {
    return angle * (180 / Math.PI);
}