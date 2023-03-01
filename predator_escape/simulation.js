// objects
let boids = [];
let num_boids = 100;

// speeds
let moving_speed = 3;
let turning_speed = 8;

// lengths
let characteristic_length;
let repulsion_radius, orientation_radius, attraction_radius;
let predator_lower, predator_upper, predator_vector;

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

function getBoidDirection(boid) {
    
}

function update() {
    predator_vector = new Vector(click_x, click_y);

    for (let boid of boids) {
        let distance_from_predator = distanceBetween(boid.position, predator_vector);
        let in_blind_angle = predatorInBlindSpot(boid);

        if (distance_from_predator < predator_lower && !in_blind_angle) {
            let opposite_direction = Vector.subtract(boid.position, predator_vector);
            opposite_direction.normalize();
            boid.setVelocity(opposite_direction);
        }
        else {
            let collective_direction = new Vector(0, 0);
            let opposite_direction = Vector.subtract(boid.position, predator_vector);
            opposite_direction.normalize();

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

                collective_direction = repelling_vector_sum;
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
                    collective_direction = orienting_vector_sum;
                }
                else if (attracting_boids.length > 0 && orienting_boids.length == 0) {
                    collective_direction = attracting_vector_sum;
                }
                else if (orienting_boids.length > 0 && attracting_boids.length > 0) {
                    orienting_vector_sum.scale(0.5);
                    attracting_vector_sum.scale(0.5);
                    let required_velocity = Vector.add(orienting_vector_sum, attracting_vector_sum);
                    required_velocity.normalize();
                    collective_direction = required_velocity;
                }
            }

            if (distance_from_predator > predator_upper || in_blind_angle) {
                boid.setVelocity(collective_direction);
            }
            else {
                let predator_weight = (distance_from_predator - predator_upper) / (predator_lower - predator_upper);
                opposite_direction.scale(predator_weight);
                collective_direction.scale(1 - predator_weight);
                let direction = Vector.add(collective_direction, opposite_direction);
                boid.setVelocity(direction);
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

    for (let boid of boids) {
        boid.render();
    }

    context.fillStyle = "#ff0000";
    context.beginPath();
    context.arc(click_x, click_y, characteristic_length, 0, 2 * Math.PI);
    context.fill();
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
    if (mobile) {
        spoke_length = 5;
        characteristic_length = 8;
    }
    else {
        spoke_length = 8;
        characteristic_length = 12;
    }

    boids = [];
    num_boids = 100;
    createRandomBoids(num_boids);
    updateParams("num-boids");

    // settings from "dynamic grouping"
    repulsion_radius = 1;
    orientation_radius = 6;
    attraction_radius = 7;
    moving_speed = 3;
    turning_speed = toRadian(4);
    noise_angle = toRadian(10);
    blind_angle = toRadian(90);
    half_visible_angle = Math.PI - blind_angle / 2;
    reflect = false;

    // prey response to predator
    predator_lower = characteristic_length * 10;
    predator_upper = characteristic_length * 15;

    predator_vector = new Vector(10, 10);
}