// objects
let boids = [];
let num_boids = 100;

// speeds
let moving_speed = 3;
let turning_speed = 8;

// lengths
let characteristic_length;
let repulsion_radius, orientation_radius, attraction_radius;

// angles
let blind_angle;
let half_visible_angle = Math.PI - blind_angle / 2;
let noise_angle;

// states
let reflect;

// misc
let boid_step = 5;

// cosmetic
let spoke_length;
let spoke_angle = toRadian(150);

function update() {
    for (let boid of boids) {
        let repelling_boids = getBoidsWithin(boid, repulsion_radius * characteristic_length);

        if (repelling_boids.length > 0) {
            // repulsion
            let repelling_vector_sum = new Vector(0, 0);

            for (let repelling_boid of repelling_boids) {
                let repelling_vector = Vector.subtract(repelling_boid.position, boid.position);
                repelling_vector_sum.add(Vector.normalize(repelling_vector));
            }

            repelling_vector_sum.negate();
            repelling_vector_sum.normalize();

            boid.setVelocity(repelling_vector_sum);
        }
        else {
            let orienting_boids = getBoidsWithin(boid, orientation_radius * characteristic_length);
            let attracting_boids = getBoidsWithin(boid, attraction_radius * characteristic_length);

            // orientation
            let orienting_vector_sum = new Vector(0, 0);
            for (let orienting_boid of orienting_boids) {
                let orienting_vector = orienting_boid.velocity;
                orienting_vector_sum.add(orienting_vector);
            }
            orienting_vector_sum.normalize();

            // attraction
            let attracting_vector_sum = new Vector(0, 0);
            for (let attracting_boid of attracting_boids) {
                let attracting_vector = Vector.subtract(attracting_boid.position, boid.position);
                attracting_vector_sum.add(Vector.normalize(attracting_vector));
            }
            attracting_vector_sum.normalize();

            if (orienting_boids.length > 0 && attracting_boids.length == 0) {
                boid.setVelocity(orienting_vector_sum);
            }
            else if (attracting_boids.length > 0 && orienting_boids.length == 0) {
                boid.setVelocity(attracting_vector_sum);
            }
            else if (orienting_boids.length > 0 && attracting_boids.length > 0) {
                orienting_vector_sum.scale(0.5);
                attracting_vector_sum.scale(0.5);
                let required_velocity = Vector.add(orienting_vector_sum, attracting_vector_sum);
                required_velocity.normalize();
                boid.setVelocity(required_velocity);
            }
        }
    }

    let polarization_sum = new Vector(0, 0);
    for (let boid of boids) {
        polarization_sum.add(boid.velocity);
    }
    let group_polarization = polarization_sum.magnitude() / num_boids;
    polar_display.innerHTML = `Group polarization: ${group_polarization.toFixed(2)}`;

    let position_sum = new Vector(0, 0);
    for (let boid of boids) {
        position_sum.add(boid.position);
    }
    let center_of_mass = new Vector(position_sum.x / num_boids, position_sum.y / num_boids);

    let cross_product = 0;
    for (let boid of boids) {
        cross_product += Vector.cross(Vector.subtract(boid.position, center_of_mass), boid.velocity);
    }
    let group_angular_momentum = Math.abs(cross_product) / num_boids;
    ang_display.innerHTML = `Group angular momentum: ${group_angular_momentum.toFixed(2)}`;

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
    if (variable == "num-boids") {
        num_display.innerHTML = `Number of boids: ${num_boids}`;
    }
    if (variable == "repulsion") {
        repulsion_radius = repulsion_input.value;
        repulsion_display.innerHTML = `Repulsion radius: ${repulsion_radius}`;
    }
    if (variable == "orientation") {
        orientation_radius = orientation_input.value;
        orientation_display.innerHTML = `Orientation radius: ${orientation_radius}`;
    }
    if (variable == "attraction") {
        attraction_radius = attraction_input.value;
        attraction_display.innerHTML = `Attraction radius: ${attraction_radius}`;
    }
    if (variable == "moving-speed") {
        moving_speed= moving_speed_input.value;
        moving_speed_display.innerHTML = `Moving speed: ${moving_speed}`;
    }
    if (variable == "turning-speed") {
        turning_speed = toRadian(turning_speed_input.value);
        turning_speed_display.innerHTML = `Turning speed: ${turning_speed_input.value}°`;
    }
    if (variable == "noise") {
        noise_angle = toRadian(noise_input.value);
        noise_display.innerHTML = `Noise angle: ${noise_input.value}°`;
    }
    if (variable == "blind") {
        blind_angle = toRadian(blind_input.value);
        half_visible_angle = Math.PI - blind_angle / 2;
        blind_display.innerHTML = `Blind angle: ${blind_input.value}°`;
    }
}

function initParams() {
    boids = [];

    updateParams("num-boids");

    updateParams("repulsion");
    updateParams("orientation");
    updateParams("attraction");

    updateParams("moving-speed");
    updateParams("turning-speed");
    updateParams("noise");

    updateParams("blind");

    createRandomBoids(num_boids);
    // testRepulsion();
    // testBlindSpot();
}