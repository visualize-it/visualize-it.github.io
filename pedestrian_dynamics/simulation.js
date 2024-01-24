let boids = [];
let num_boids, boid_move_speed, boid_turn_speed, rightward_bias;
let spoke_angle, spoke_length;
let repulsion_radius;


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
    num_boids = 100;
    boid_move_speed = 1.5;
    boid_turn_speed = 2 * Math.PI / 180;
    rightward_bias = 0.5;
    spoke_angle = 150 * Math.PI / 180;

    if (mobile) {
        spoke_length = 5;
    }
    else {
        spoke_length = 10;
    }

    repulsion_radius = spoke_length * 4;

    for (let new_boid = 0; new_boid < num_boids; new_boid++) {
        let x = Math.random() * canvas_width;
        let y = 1 + Math.random() * (canvas_height - 2);
        let position_vector = new Vector(x, y);
        let right_probability = Math.random();

        let new_boid = new Boid(position_vector, right_probability);
        boids.push(new_boid);
    }

    // let position_vector = new Vector(canvas_width / 2, 1);
    // let right_probability = Math.random();
    // let new_boid = new Boid(position_vector, right_probability);
    // boids.push(new_boid);
}