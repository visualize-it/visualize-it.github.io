// objects
let boids = [];
let num_boids = 100;

// speeds
let moving_speed = 1;
let turning_speed = toRadian(8);

// lengths
let characteristic_length = 12;
let repulsion_radius, orientation_radius, attraction_radius;

// angles
let blind_angle = toRadian(180);
let half_visible_angle = Math.PI - blind_angle / 2;

// states
let reflect = false;

// cosmetic
let spoke_length = 8;
let spoke_angle = toRadian(150);

function update() {
    for (let boid of boids) {
        let repelling_boids = getBoidsWithin(boid, repulsion_radius * characteristic_length);

        if (repelling_boids.length > 0) {
            // console.log("Repelling!");

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

            if (orienting_boids.length == 0) {
                // console.log("Attracting!");
                boid.setVelocity(attracting_vector_sum);
            }
            else if (attracting_boids.length == 0) {
                // console.log("Orienting!")
                boid.setVelocity(orienting_vector_sum);
            }
            else if (orienting_boids.length > 0 && attracting_boids.length > 0) {
                // console.log("Orienting and attracting!");
                orienting_vector_sum.scale(0.5);
                attracting_vector_sum.scale(0.5);
                let required_velocity = Vector.add(orienting_vector_sum, attracting_vector_sum);
                required_velocity.normalize();
                boid.setVelocity(required_velocity);
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
}

function updateParams(variable) {
    if (variable == "speed") {
        moving_speed= speed_input.value;
        speed_display.innerHTML = `Speed: ${moving_speed}`;
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
}

function initParams() {
    boids = [];

    updateParams("speed");
    updateParams("repulsion");
    updateParams("orientation");
    updateParams("attraction");

    createRandomBoids(num_boids);
    // testRepulsion();
    // testBlindSpot();
}

function inBlindSpot(boid, other_boid) {
    let approach_angle = Vector.subtract(other_boid.position, boid.position).getHeading()
    let heading_angle = boid.velocity.getHeading();

    // console.log(toDegree(approach_angle), toDegree(heading_angle));

    if (heading_angle + half_visible_angle < approach_angle && heading_angle + half_visible_angle + blind_angle > approach_angle) {
        // console.log("In blind spot!");
        return true;
    }
    else if (heading_angle - half_visible_angle > approach_angle && heading_angle - half_visible_angle - blind_angle < approach_angle) {
        // console.log("In blind spot!");
        return true;
    }
    else {
        return false;
    }
}

function getBoidsWithin(boid, radius) {
    let boids_within = [];
    
    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < radius) {
                if (!inBlindSpot(boid, other_boid)) {
                    boids_within.push(other_boid);
                }
            }
        }
    }

    return boids_within;
}