// constants
let num_boids = 10;
let repulsion_radius = 10;

// objects
let boids = [];

// cosmetic
let spoke_length = 5;
let spoke_angle = 150 * Math.PI / 180;

function update() {
    // for (let current_boid of boids) {
    //     if (hasRepulsion(current_boid)) {
    //         // repulsive interaction
    //     }
    //     else {

    //     }
    // }

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

function hasRepulsion(boid) {
    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < repulsion_radius) {
                return true;
            }
        }
    }
    return false;
}