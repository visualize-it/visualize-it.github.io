let boids = [];
let num_boids, boid_speed, rightward_bias;
let spoke_angle = 150 * Math.PI / 180, spoke_length = 10;


function update() {
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
    num_boids = 10;
    boid_speed = 5;
    rightward_bias = 0.5;

    for (let new_boid = 0; new_boid < num_boids; new_boid++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let position_vector = new Vector(x, y);
        let right_probability = Math.random();

        let new_boid = new Boid(position_vector, right_probability);
        boids.push(new_boid);
    }
}