// firefly objects
let fireflies = [];
let num_fireflies = 100;

// emits
let emits = [];
let emit_speed = 1, emit_limit = 30;

// radii
let repulsion_radius = 15;

// noise
let noise_amplitude = radians(15);

// velocities
let angular_velocity = radians(1);
let move_speed = 0.5;

let firefly_radius = 5;

// frame cycles
let frame = 0, frame_cycle = 30;

function update() {
    for (let firefly of fireflies) {
        let repelling_fireflies = getRepellingFireflies(firefly);

        if (repelling_fireflies.length > 0) {
            let repelling_vector = new Vector(0, 0);

            for (let repelling_firefly of repelling_fireflies) {
                let displacement_vector = Vector.subtract(repelling_firefly.position, firefly.position);
                displacement_vector.normalize();
                repelling_vector.add(displacement_vector);
            }
            repelling_vector.normalize();
            repelling_vector.negate();
            firefly.setVelocity(repelling_vector);
        }
    }

    for (let firefly of fireflies) {
        firefly.update();
    }

    for (let emit of emits) {
        emit.update();
    }

    frame += 1;
    if (frame >= frame_cycle) {
        frame = 0;
        removeFinishedEmits();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let emit of emits) {
        emit.render();
    }

    for (let firefly of fireflies) {
        firefly.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    frame = 0;
    fireflies = [];

    for (let i = 0; i < num_fireflies; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let direction = Math.random() * 2 * Math.PI;
        let vx = Math.cos(direction);
        let vy = Math.sin(direction);
        let phase = Math.random() * 2 * Math.PI;

        let new_firefly = new Firefly(new Vector(x, y), new Vector(vx, vy), phase);
        fireflies.push(new_firefly);
    }
}