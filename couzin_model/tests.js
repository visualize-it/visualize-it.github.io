function createRandomBoids(num) {
    for (let i = 0; i < num; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let angle = Math.random() * 2 * Math.PI;

        let position = new Vector(x, y);
        let velocity = Vector.fromHeading(angle);

        let new_boid = new Boid(position, velocity);
        boids.push(new_boid);
    }
}

function testRepulsion() {
    let boid1 = new Boid(new Vector(canvas_width / 4, canvas_height / 2), new Vector(1, 0));
    let boid2 = new Boid(new Vector(3 * canvas_width / 4, canvas_height / 2), new Vector(-1, 0));

    boids.push(boid1);
    boids.push(boid2);
}

function testBlindSpot() {
    let boid1 = new Boid(new Vector(canvas_width / 4, canvas_height / 2), new Vector(1, 0));
    let boid2 = new Boid(new Vector(canvas_width / 4 - 0.5 * characteristic_length * repulsion_radius, canvas_height / 2), new Vector(-1, 0));

    boids.push(boid1);
    boids.push(boid2);
}