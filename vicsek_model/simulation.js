let boids = [];
let num_boids = 100;

let speed, interaction_radius, noise_amplitude;
let polarization;

let boid_length, spoke_angle;

function update() {
    interactBoids();
    moveBoids();
    measurePolarization();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderBoids();
}

function updateParams(variable) {
    if (variable == 'i') {
        interaction_radius = i_input.value;
        i_display.innerHTML = `Interaction radius: ${interaction_radius}`;
    }
    if (variable == 'n') {
        noise_amplitude = n_input.value * Math.PI / 180;
        n_display.innerHTML = `Noise amplitude: ${n_input.value}`;
    }
    if (variable == 's') {
        speed = s_input.value;
        s_display.innerHTML = `Speed: ${speed}`;
    }
}

function initParams() {
    boids = [];
    makeBoids(num_boids);

    speed = 5;
    interaction_radius = 20;
    noise_amplitude = 20 * Math.PI / 180;

    boid_length = 5;
    spoke_angle = 150 * Math.PI / 180;

    updateParams('i');
    updateParams('n');
    updateParams('s');

    if (paused) {
        pauseToggle();
    }
}

function interactBoids() {
    let interacting_boids, required_direction;
    for (let i = 0; i < boids.length; i++) {
        interacting_boids = getBoidsWithin(boids[i]);

        if (interacting_boids.length > 0) {
            required_direction = 0;
            for (let interacting_boid of interacting_boids) {
                required_direction += interacting_boid.direction;
            }
            required_direction /= interacting_boids.length;

            boids[i].direction = required_direction;
        }
    }
}

function moveBoids() {
    for (let i = 0; i < boids.length; i++) {
        boids[i].direction += noise_amplitude * (Math.random() - 0.5);

        boids[i].x += speed * Math.cos(boids[i].direction);
        boids[i].y += speed * Math.sin(boids[i].direction);
        if (boids[i].x < 0) {
            boids[i].x = canvas_width;
        }
        if (boids[i].x > canvas_width) {
            boids[i].x = 0;
        }
        if (boids[i].y < 0) {
            boids[i].y = canvas_height;
        }
        if (boids[i].y > canvas_height) {
            boids[i].y = 0;
        }
    }
}

function measurePolarization() {
    let x = 0, y = 0;
    for (let boid of boids) {
        x += Math.cos(boid.direction);
        y += Math.sin(boid.direction);
    }

    x /= boids.length;
    y /= boids.length;
    polarization = Math.sqrt(x * x + y * y);

    p_display.innerHTML = `Polarization: ${polarization.toFixed(2)}`;
}

function makeBoids(num) {
    let new_boid;
    for (let i = 0; i < num; i++) {
        new_boid = {
            x: Math.random() * canvas_width,
            y: Math.random() * canvas_height,
            direction: Math.random() * 2 * Math.PI,
        }
        boids.push(new_boid);
    }
    num_display.innerHTML = `Number of boids: ${boids.length}`;
}

function removeBoids(num) {
    for (let i = 0; i < num; i++) {
        boids.shift();
    }
    num_display.innerHTML = `Number of boids: ${boids.length}`;
}

function clearBoids() {
    boids = [];
    num_display.innerHTML = `Number of boids: ${boids.length}`;
}

function renderBoids() {
    context.fillStyle = "#ffffff";
    for (let i = 0; i < boids.length; i++) {
        context.beginPath();
        context.moveTo(boids[i].x + boid_length * Math.cos(boids[i].direction), boids[i].y + boid_length * Math.sin(boids[i].direction));
        context.lineTo(boids[i].x + boid_length * Math.cos(boids[i].direction + spoke_angle), boids[i].y + boid_length * Math.sin(boids[i].direction + spoke_angle));
        context.lineTo(boids[i].x + boid_length * Math.cos(boids[i].direction - spoke_angle), boids[i].y + boid_length * Math.sin(boids[i].direction - spoke_angle));
        context.fill();
    }
}

function getBoidsWithin(boid) {
    let inside_boids = [];
    for (let i = 0; i < boids.length; i++) {
        if (boid != boids[i]) {
            if (Math.sqrt(Math.pow(boid.x - boids[i].x, 2) + Math.pow(boid.y - boids[i].y, 2)) < interaction_radius) {
                inside_boids.push(boids[i]);
            }
        }
    }
    return inside_boids;
}