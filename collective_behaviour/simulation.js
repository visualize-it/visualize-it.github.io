// objects
let boids = [];
let num_boids = 100;

// speeds
let moving_speed = 1;
let turning_speed = toRadian(8);

// lengths
let characteristic_length = 20;
let repulsion_radius = 1;
let orientation_radius = 10;
let attraction_radius = 15;

// angles
let blind_angle = toRadian(60);
let half_visible_angle = Math.PI - blind_angle / 2;

// cosmetic
let spoke_length = 8;
let spoke_angle = toRadian(150);

function update() {
    for (let boid of boids) {
        let repelling_boids = getRepellingBoids(boid);

        if (repelling_boids.length > 0) {
            // console.log("Repelling!");

            let repelling_vector_sum = new Vector(0, 0);

            for (let repelling_boid of repelling_boids) {
                let repelling_vector = Vector.subtract(repelling_boid.position, boid.position);
                repelling_vector_sum.add(Vector.normalize(repelling_vector));
            }

            repelling_vector_sum.negate();
            repelling_vector_sum.normalize();

            boid.setVelocity(repelling_vector_sum);
        }
    }

    for (let boid of boids) {
        boid.update();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let boid of boids) {
        boid.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    // createRandomBoids();
    // testRepulsion();
    testBlindSpot();
}

function inBlindSpot(boid, other_boid) {
    let approach_angle = Vector.subtract(other_boid.position, boid.position).getHeading()
    let heading_angle = boid.velocity.getHeading();

    console.log(toDegree(approach_angle), toDegree(heading_angle));

    if (heading_angle + half_visible_angle < approach_angle && heading_angle + half_visible_angle + blind_angle > approach_angle) {
        // console.log("In blind spot!");
        return true;
    }
    else if (heading_angle - half_visible_angle > approach_angle && heading_angle - half_visible_angle - blind_angle < approach_angle) {
        // console.log("In blind spot!");
        return true;
    }
    else {
        return false;
    }
}

function getRepellingBoids(boid) {
    let repelling_boids = [];
    
    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < repulsion_radius * characteristic_length) {
                if (!inBlindSpot(boid, other_boid)) {
                    repelling_boids.push(other_boid);
                }
            }
        }
    }

    return repelling_boids;
}