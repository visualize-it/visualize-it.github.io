function normalTest() {
    for (let i = 0; i < num_boids; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let theta = 2 * Math.PI * Math.random()
        boids.push(new Boid(x, y, theta));
    }
}

function repulsionTest() {
    boids.push(new Boid(canvas_width / 4, canvas_height / 2, 0));
    boids.push(new Boid(3 * canvas_width / 4, canvas_height / 2, Math.PI));
}

function boundaryTest() {
    boids.push(new Boid(canvas_width / 4, canvas_height / 2, Math.PI));
    boids.push(new Boid(3 * canvas_width / 4, canvas_height / 2, 0));
}