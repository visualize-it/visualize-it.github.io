// constants
let num_boids = 50;

let move_speed = 1;
let turning_speed = toRadian(10);

let repulsion_radius = 16;
let interaction_radius = 40;

let orientation_weight = 0;
let attraction_weight = 0;

let noise_amp = toRadian(5);

// conditions
let boundary_interactions = true;
let noise = true;

// objects
let boids = [];
let translated_boids = [];

// cosmetic
let spoke_length = 5;
let spoke_angle = toRadian(150);

function update() {
    replicateLandscape();

    for (let current_boid of boids) {
        let repelling_boids = getRepellingBoids(current_boid);

        if (repelling_boids.length > 0) {
            let repulsion_sum = new Vector(0, 0);

            for (let repelling_boid of repelling_boids) {
                let repelling_vector = Vector.normalise(Vector.subtract(repelling_boid.position, current_boid.position));
                repulsion_sum.add(repelling_vector);
            }
            required_velocity = new Vector(-repulsion_sum.x, -repulsion_sum.y);
            current_boid.setVelocity(required_velocity);
        }
        else {
            let interacting_boids = getInteractingBoids(current_boid);

            if (interacting_boids.length > 0 && (orientation_weight > 0 || attraction_weight > 0)) {
                let orientation_sum = new Vector(0, 0);
                let attraction_sum = new Vector(0, 0);

                for (let interacting_boid of interacting_boids) {
                    orientation_sum.add(interacting_boid.velocity);

                    let attracting_vector = Vector.normalise(Vector.subtract(interacting_boid.position, current_boid.position));
                    attraction_sum.add(attracting_vector);
                }

                let required_velocity = new Vector(0, 0);
                required_velocity.add(Vector.scale(orientation_sum, orientation_weight));
                required_velocity.add(Vector.scale(attraction_sum, attraction_weight));
                required_velocity.add(Vector.scale(current_boid.velocity, (1 - orientation_weight - attraction_weight)));
                current_boid.setVelocity(required_velocity);
            }
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
    boids = [];

    normalTest();
    // repulsionTest();
}

function getRepellingBoids(boid) {
    let repelling_boids = [];

    for (let other_boid of translated_boids) {
        if (other_boid.position.x != boid.position.x || other_boid.position.y != boid.position.y) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < repulsion_radius) {
                repelling_boids.push(other_boid);
            }
        }
    }
    return repelling_boids;
}

function getInteractingBoids(boid) {
    let interacting_boids = [];

    for (let other_boid of translated_boids) {
        if (other_boid.position.x != boid.position.x || other_boid.position.y != boid.position.y) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < interaction_radius) {
                interacting_boids.push(other_boid);
            }
        }
    }
    return interacting_boids;
}

function replicateLandscape() {
    if (boundary_interactions) {
        translated_boids = [];

        translateLandscape(-canvas_width, -canvas_height);
        translateLandscape(-canvas_width, 0);
        translateLandscape(-canvas_width, canvas_height);
        translateLandscape(0, -canvas_height);
        translateLandscape(0, 0);
        translateLandscape(0, canvas_height);
        translateLandscape(canvas_width, -canvas_height);
        translateLandscape(canvas_width, 0);
        translateLandscape(canvas_width, canvas_height);
    }
    else {
        translated_boids = boids;
    }
}

function translateLandscape(x, y) {
    for (let boid of boids) {
        let translated_boid = new Boid(boid.position.x + x, boid.position.y + y, boid.theta);
        translated_boids.push(translated_boid);
    }
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}