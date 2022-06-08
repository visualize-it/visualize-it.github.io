function addBoid() {
    let random_x = Math.random() * canvas_width;
    let random_y = Math.random() * canvas_height;
    let random_theta = Math.random() * 2 * Math.PI - Math.PI;
    boids.push(new Boid(random_x, random_y, random_theta));
    num_boids += 1;

    updateParams("num");
}

function removeBoid() {
    if (boids.length > 0) {
        boids.pop();
        num_boids -= 1;
    }

    updateParams("num");
}

function clearBoids() {
    boids = [];
    translated_boids = [];
    num_boids = 0;
    updateParams("num");
}

function getRepellingBoids(boid) {
    let repelling_boids = [];

    for (let other_boid of translated_boids) {
        if (other_boid.position.x != boid.position.x || other_boid.position.y != boid.position.y) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < repulsion_radius * boid_length) {
                repelling_boids.push(other_boid);
            }
        }
    }
    return repelling_boids;
}

function getInteractingBoids(boid) {
    let interacting_boids = [];

    for (let other_boid of translated_boids) {
        if (other_boid.position.x != boid.position.x || other_boid.position.y != boid.position.y) {
            if (Vector.distanceBetween(boid.position, other_boid.position) < interaction_radius * boid_length) {
                interacting_boids.push(other_boid);
            }
        }
    }
    return interacting_boids;
}

function replicateLandscape() {
    if (boundary_interactions) {
        translated_boids = [];

        translateLandscape(-canvas_width, -canvas_height);
        translateLandscape(-canvas_width, 0);
        translateLandscape(-canvas_width, canvas_height);
        translateLandscape(0, -canvas_height);
        translateLandscape(0, 0);
        translateLandscape(0, canvas_height);
        translateLandscape(canvas_width, -canvas_height);
        translateLandscape(canvas_width, 0);
        translateLandscape(canvas_width, canvas_height);
    }
    else {
        translated_boids = boids;
    }
}

function translateLandscape(x, y) {
    for (let boid of boids) {
        let translated_boid = new Boid(boid.position.x + x, boid.position.y + y, boid.theta);
        translated_boids.push(translated_boid);
    }
}

function toDegree(radian) {
    return radian * 180 / Math.PI;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}