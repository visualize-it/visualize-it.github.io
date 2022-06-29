// objects
let num_boids = 100;
let boids = [];

// simulation params
let phase_velocity;
let j, k;

// cosmetic
let boid_radius;

function update() {
    for (let boid of boids) {
        // synchronize phase
        let phase_nudge = 0;
        for (let other_boid of boids) {
            if (boid !== other_boid) {
                let displacement_vector = Vector.subtract(other_boid.position, boid.position);
                let phase_difference = other_boid.phase - boid.phase;
                phase_nudge += Math.sin(phase_difference) / displacement_vector.getMagnitude();
            }
        }
        phase_nudge *= (k / num_boids);
        boid.setPhaseNudge(phase_nudge);

        let repelling_boids = getRepellingBoids(boid);
        if (repelling_boids.length > 0) {
            // repel
            let repelling_vector = new Vector(0, 0);
            for (let repelling_boid of repelling_boids) {
                let repelling_boid_vector = Vector.unitVectorFrom(Vector.subtract(boid.position, repelling_boid.position));
                repelling_vector.add(repelling_boid_vector);
            }
            boid.setTranslationVelocity(repelling_vector);
        }
        else {
            // swarm
            let attracting_vector = new Vector(0, 0);
            for (let attracting_boid of boids) {
                if (attracting_boid != boid) {
                    let displacement_vector = Vector.subtract(attracting_boid.position, boid.position);
                    let phase_difference = attracting_boid.phase - boid.phase;
                    let attracting_boid_vector = Vector.scale(Vector.unitVectorFrom(displacement_vector), 1 + j * Math.cos(phase_difference));
                    attracting_vector.add(attracting_boid_vector);
                }
            }
            attracting_vector.normalize();
            boid.setTranslationVelocity(attracting_vector);
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
    boids = [];

    j = 1;
    k = 1;
    phase_velocity = radians(1);

    if (mobile) {
        boid_radius = 3;
    }
    else {
        boid_radius = 6;
    }

    for (let i = 0; i < num_boids; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let phase = Math.random() * 2 * Math.PI;
        boids.push(new Boid(new Vector(x, y), phase));
    }
}

function getRepellingBoids(boid) {
    let repelling_boids = []

    for (let other_boid of boids) {
        if (other_boid != boid) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < 4 * boid_radius) {
                repelling_boids.push(other_boid);
            }
        }
    }
    return repelling_boids;
}