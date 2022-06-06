// constants
let num_boids = 30;
let repulsion_radius = 10;
let speed = 50;
let turning_speed = toRadian(1);

// objects
let boids = [];

// cosmetic
let spoke_length = 5;
let spoke_angle = toRadian(150);

function update() {
    for (let current_boid of boids) {
        let repelling_boids = getRepellingBoids(current_boid);

        if (repelling_boids.length > 0) {
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
    
    for (let i = 0; i < num_boids; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let theta = 2 * Math.PI * Math.random() 
        boids.push(new Boid(x, y, theta));
    }
}

function getRepellingBoids(boid) {
    let repelling_boids = [];
    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < repulsion_radius) {
                repelling_boids.push(other_boid);
            }
        }
    }
    return repelling_boids;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}