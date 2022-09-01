let particles = [];

let num_red, num_blue, num_green, num_white;

let cutoff_length, damping;

let particle_size = 4;

let interactions = {
    "red": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "blue": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "orange": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "white": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    }
}

function update() {
    for (let particle of particles) {
        let fx = 0, fy = 0;

        for (let other_particle of particles) {
            let dx = particle.x - other_particle.x;
            let dy = particle.y - other_particle.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0 && dist < cutoff_length) {
                let force = interactions[particle.color][other_particle.color] / dist;
                fx += force * dx;
                fy += force * dy;
            }
        }
        particle.applyForce(fx, fy);
    }

    for (let particle of particles) {
        particle.update();
    }
}

function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let particle of particles) {
        particle.render();
    }
}

function updateParams(variable) {

}

function makeParticles(num, color) {
    for (let i = 0; i < num; i++) {
        let x = 0.1 * canvas_width + 0.8 * (Math.random() * canvas_width);
        let y = 0.1 * canvas_height + 0.8 * (Math.random() * canvas_height);
        particles.push(new Particle(x, y, color));
    }
}

function initParams() {
    particles = [];

    num_red = 200;
    num_blue = 200;
    num_green = 200;
    num_white = 200;

    cutoff_length = 100;
    damping = 0.8;

    makeParticles(num_red, "red");
    makeParticles(num_blue, "blue");
    makeParticles(num_green, "orange");
    makeParticles(num_white, "white");
}