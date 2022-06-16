// constants
let num_boids = 50;

let move_speed = 1;
let turning_speed = toRadian(10);

let repulsion_radius = 1;
let interaction_radius = 3;

let orientation_weight = 0.4;
let attraction_weight = 0.4;

let noise_amp = toRadian(1.5);

// conditions
let boundary_interactions = true;
let noise = true;

// objects
let boids = [];
let translated_boids = [];

// cosmetic
let spoke_length = 5;
let spoke_angle = toRadian(150);
let boid_length = 2 * spoke_length;

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

    if (boids.length > 0) {
        context.fillStyle = "#666666";
        context.beginPath();
        context.arc(boids[0].position.x, boids[0].position.y, interaction_radius * boid_length, 0, 2 * Math.PI);
        context.fill();

        context.strokeStyle = "#ff0000";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(boids[0].position.x, boids[0].position.y, repulsion_radius * boid_length, 0, 2 * Math.PI);
        context.stroke();
    }

    for (let boid of boids) {
        boid.render();
    }
}

function updateParams(variable) {
    if (variable == "num") {
        num_display.innerHTML = `Number of boids: ${num_boids}`;
    }
    if (variable == "speed") {
        move_speed = parseFloat(speed_input.value);
        speed_display.innerHTML = `Speed of boids: ${move_speed}`;
    }
    if (variable == "radius") {
        interaction_radius = parseFloat(radius_input.value);
        radius_display.innerHTML = `Radius of interaction: ${interaction_radius}`;
    }
    if (variable == "noise") {
        noise_amp = toRadian(parseFloat(noise_input.value));
        noise_display.innerHTML = `Noise amplitude: ${noise_input.value}`;
    }
    if (variable == "orientation") {
        orientation_weight = parseFloat(orientation_input.value);
        orientation_display.innerHTML = `Orientation weight: ${orientation_weight}`;

        if (orientation_weight + attraction_weight > 1) {
            attraction_weight = 1 - orientation_weight;
            attraction_input.value = attraction_weight;
            attraction_display.innerHTML = `Attraction weight: ${attraction_weight.toFixed(1)}`;
        }
    }
    if (variable == "attraction") {
        attraction_weight = parseFloat(attraction_input.value);
        attraction_display.innerHTML = `Attraction weight: ${attraction_weight}`;

        if (orientation_weight + attraction_weight > 1) {
            orientation_weight = 1 - attraction_weight
            orientation_input.value = orientation_weight;
            orientation_display.innerHTML = `Orientation weight: ${orientation_weight.toFixed(1)}`;
        }
    }
}

function initParams() {
    boids = [];

    normalTest();

    if (paused) {
        pauseToggle();
    }
}