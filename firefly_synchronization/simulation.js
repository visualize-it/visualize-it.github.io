// firefly objects
let fireflies = [];
let num_fireflies = 100;

// emit objects
let emits = [];
let emit_speed = 1, emit_limit = 30;

// synchronization
let sync_strength = 1;
let sync_radius = 50;

// radii
let repulsion_radius = 15;

// noise
let noise_amplitude = radians(15);

// velocities
let angular_velocity = radians(1);
let move_speed = 1;

// cosmetic
let firefly_radius = 5;

// frame cycles
let frame = 0, frame_cycle = 30;

function update() {
    for (let firefly of fireflies) {
        // repulsion
        let repelling_fireflies = getFirefliesWithin(firefly, repulsion_radius);

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

        // synchronization
        let sync_fireflies = getFirefliesWithin(firefly, sync_radius);

        if (sync_fireflies.length > 0) {
            let phase_nudge = 0;

            for (let sync_firefly of sync_fireflies) {
                phase_nudge += Math.sin(sync_firefly.phase - firefly.phase);
            }
            phase_nudge *= (sync_strength / num_fireflies);
            firefly.nudgePhase(phase_nudge);
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

    if (fireflies.length > 0) {
        let phase_mean = 0;
        for (let firefly of fireflies) {
            phase_mean += firefly.phase;
        }
        phase_mean /= fireflies.length;

        let phase_sd = 0;
        for (let firefly of fireflies) {
            phase_sd += Math.pow(firefly.phase - phase_mean, 2);
        }
        phase_sd /= fireflies.length;
        phase_sd = Math.sqrt(phase_sd);

        phase_mean = degree(phase_mean);
        phase_sd = degree(phase_sd);

        sd_display.innerHTML = `Mean phase: ${phase_mean.toFixed(2)}° <br>SD of phase: ${phase_sd.toFixed(2)}°`;
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