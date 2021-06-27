let boids = [];

let repulsion_zone = 20;
let social_zone = 50;

let click_x, click_y;
let click_zone = 15;

let click_circle = false;

function update() {
    for (let boid of boids) {
        if (boid.isAlive) {
            let repulsionPresent = false;
            let away_direction = {
                x: 0,
                y: 0,
            }

            for (let other_boid of boids) {
                if (other_boid.isAlive && other_boid.index != boid.index) {
                    if (distanceBetween(boid, other_boid) < repulsion_zone) {
                        repulsionPresent = true;

                        away_direction.x -= normalisedX(boid, other_boid);
                        away_direction.y -= normalisedY(boid, other_boid);
                    }
                }
            }

            if (repulsionPresent) {
                boid.orient(getAngle(away_direction));
            }
            else {
                let neighboursPresent = false;

                let own_direction = {
                    x: Math.cos(toRadian(boid.angle)),
                    y: Math.sin(toRadian(boid.angle)),
                }

                let attraction_direction = {
                    x: 0,
                    y: 0,
                }

                let orientation_direction = {
                    x: 0,
                    y: 0,
                }

                for (let other_boid of boids) {
                    if (other_boid.isAlive && other_boid.index != boid.index) {
                        if (distanceBetween(boid, other_boid) < social_zone) {
                            neighboursPresent = true;

                            attraction_direction.x += normalisedX(boid, other_boid);
                            attraction_direction.y += normalisedY(boid, other_boid);

                            orientation_direction.x += Math.cos(toRadian(other_boid.angle));
                            orientation_direction.y += Math.sin(toRadian(other_boid.angle));
                        }
                    }
                }

                if (neighboursPresent) {
                    let weighted_direction = {
                        x: boid.attraction * attraction_direction.x + boid.orientation * orientation_direction.x + boid.persistence * own_direction.x,
                        y: boid.attraction * attraction_direction.y + boid.orientation * orientation_direction.y + boid.persistence * own_direction.y,
                    }
                    boid.orient(getAngle(weighted_direction));
                }
            }
        }
    }

    for (let boid of boids) {
        boid.move();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let boid of boids) {
        boid.render();
    }

    if (click_circle) {
        context.fillStyle = "#aaaaaa";
        context.beginPath();
        context.arc(click_x, click_y, click_zone, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fill();

        click_circle = false;
    }
}

function manageClick() {
    let entries = [];

    click_circle = true;

    for (let boid of boids) {
        let distance_from_click = distanceFromClick(boid, click_x, click_y);

        if (distance_from_click < click_zone) {
            entries.push({ index: boid.index, distance: distance_from_click });
        }
    }

    if (entries.length > 0) {
        let min_distance = Infinity, boid_index = -1;

        for (let entry of entries) {
            if (entry.distance < min_distance) {
                min_distance = entry.distance;
                boid_index = entry.index;
            }
        }

        if (boid_index != -1) {
            boids[boid_index].click_kill();
        }
    }
}

function updateParams(variable) {

}

function initParams() {
    boids.push(new Boid({ x: canvas_width / 2, y: canvas_height / 4, angle: 270 }));
    boids.push(new Boid({ x: canvas_width / 2, y: 3 * canvas_height / 4, angle: 90 }));
    addBoids(30);
    console.log(boids);
}
