// constants
let num_boids = 100;
let repulsion_radius = 20;
let speed = 1;
let turning_speed = toRadian(10);

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
            console.log("Repulsion!");
            // repulsive interaction
            let vector_sum = new Vector(0, 0);

            for (let repelling_boid of repelling_boids) {
                let repelling_vector = Vector.subtract(repelling_boid.position, current_boid.position);
                let magn = repelling_vector.getMagnitude();
                vector_sum.add(Vector.scale(repelling_vector, 1 / magn));
            }
            vector_sum.negate();
            current_boid.setVelocity(vector_sum);
        }
        else {
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

function replicateLandscape() {
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

function translateLandscape(x, y) {
    for (let boid of boids) {
        let translated_boid = new Boid(boid.position.x + x, boid.position.y + y, boid.theta);
        translated_boids.push(translated_boid);
    }
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}