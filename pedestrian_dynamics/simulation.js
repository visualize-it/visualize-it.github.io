let boids = [];
let num_boids, boid_turn_speed, rightward_bias;
let spoke_angle, spoke_length;
let repulsion_radius, border_padding;
let boid_mean_speed, boid_speed_variance;

let blue_flow, red_flow;

function update() {
    let boid, other_boid, distance_between;
    let relative_position = new Vector(0, 0);
    let repulsion_vector = new Vector(0, 0);
    let resultant_velocity = new Vector(0, 0);

    for (let i1 = 0; i1 < boids.length; i1++) {
        boid = boids[i1];
        repulsion_vector = new Vector(0, 0);
        num_repel = 0;

        // repulsion with other boids
        for (let i2 = 0; i2 < boids.length; i2++) {
            if (i1 == i2) {
                continue;
            }

            other_boid = boids[i2];

            if (boid.canSee(other_boid)) {
                distance_between = Vector.distanceBetween(boid.position, other_boid.position);

                if (distance_between < repulsion_radius) {
                    relative_position = Vector.subtract(boid.position, other_boid.position);
                    relative_position.scale(100 * Math.exp(1 / distance_between));
                    repulsion_vector.add(relative_position);
                    num_repel += 1;
                }
            }
        }

        // repulsion with walls
        if (boid.position.y < repulsion_radius) {
            relative_position = new Vector(0.01, 1);
            relative_position.scale(100 / boid.position.y);
            repulsion_vector.add(relative_position);
        }
        else if (boid.position.y > canvas_height - repulsion_radius) {
            relative_position = new Vector(0.01, -1);
            relative_position.scale(1 / (canvas_height - boid.position.y));
            repulsion_vector.add(relative_position);
        }

        if (num_repel != 0) {
            repulsion_vector.scale(num_repel);
            resultant_velocity = Vector.add(repulsion_vector, boid.pref_velocity);
            boid.setVelocity(resultant_velocity, num_repel);
        }
        else {
            boid.setVelocity(boid.pref_velocity, 0)
        }
    }

    num_blue = 0;
    num_red = 0;
    blue_flow = 0;
    red_flow = 0;

    for (let boid of boids) {
        boid.update();

        if (boid.right_probability > rightward_bias) {
            blue_flow += boid.distance;
            num_blue += 1;
        }
        else {
            red_flow += boid.distance;
            num_red += 1;
        }
    }

    blue_flow /= num_blue;
    red_flow /= num_red;

    blue_display.innerHTML = `Blue flow: ${blue_flow.toFixed(2)}`;
    red_display.innerHTML = `Red flow: ${red_flow.toFixed(2)}`;
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let boid of boids) {
        boid.render();

        if (boid.right_probability > rightward_bias) {
            blue_flow += boid.distance;
            num_blue += 1;
        }
        else {
            red_flow += boid.distance;
            num_red += 1;
        }
    }
}

function updateParams(variable) {
    if (variable == "bias") {
        rightward_bias = bias_input.value;
        bias_display.innerHTML = `Rightward bias: ${rightward_bias}`;

        for (let boid of boids) {
            boid.setPrefDirection();
        }
    }
    if (variable == "variance") {
        boid_speed_variance = variance_input.value;
        variance_display.innerHTML = `Speed variance: ${boid_speed_variance}`;

        for (let boid of boids) {
            let speed = boid_mean_speed + boid_speed_variance * (Math.random() - 0.5);
            boid.setMaxSpeed(speed);
        }
    }
}

function initParams() {
    updateParams("bias");
    updateParams("variance");

    num_boids = 100;
    boid_mean_speed = 1.5;
    boid_turn_speed = 2 * Math.PI / 180;
    spoke_angle = 150 * Math.PI / 180;
    border_padding = 5;

    if (mobile) {
        spoke_length = 5;
    }
    else {
        spoke_length = 10;
    }

    repulsion_radius = spoke_length * 4;

    makeBoids();
}

function addBoids(num) {
    num_boids += num;
    for (let new_boid = 0; new_boid < num; new_boid++) {
        let x = Math.random() * canvas_width;
        let y = border_padding + Math.random() * (canvas_height - 2 * border_padding);
        let position_vector = new Vector(x, y);
        let right_probability = Math.random();
        let speed = boid_mean_speed + boid_speed_variance * (Math.random() - 0.5);

        let new_boid = new Boid(position_vector, right_probability, speed);
        boids.push(new_boid);
    }
}

function removeBoids(num) {
    if (num > num_boids) {
        return;
    }
    
    num_boids -= num;
    for (let remove_boid = 0; remove_boid < num; remove_boid++) {
        boids.pop();
    }
}

function makeBoids() {
    clearBoids();
    addBoids(100);
}

function clearBoids() {
    num_boids = 0;
    boids = [];
}