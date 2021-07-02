let boids = [];

let repulsion_zone = 25;
let social_zone = 50;

let click_x, click_y;
let click_zone = 15;
let click_circle = false;

let isPaused = false;
let debug = false;

let cooldown = 0, cooldown_max = 120;
let tortuosity_step = 0, tortuosity_max = 180;

let density;

function update() {
    if (cooldown > 0) {
        cooldown--;
    }

    if(tortuosity_step == 0) {
        for (let boid of boids) {
            boid.storePosition();
        }
    }

    else if(tortuosity_step == tortuosity_max) {
        tortuosity_step = -1;
        for(let boid of boids) {
            boid.calculateTortuosity();
        }
        drawTortuosityHistogram();
    }
    tortuosity_step++;

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
                boid.orient(getAngle(away_direction), "repulsion");

                if (debug) {
                    console.log("Away direction:", away_direction.x, away_direction.y);
                }
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
                    boid.orient(getAngle(weighted_direction), "social interaction");

                    if (debug) {
                        console.log("Attraction:", attraction_direction.x, attraction_direction.y, "Orientation:", orientation_direction.x, orientation_direction.y, "Persistence:", own_direction.x, own_direction.y, "Weighted:", weighted_direction.x, weighted_direction.y);
                    }
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
        context.arc(click_x, canvas_height - click_y, click_zone, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fill();

        click_circle = false;
    }

    if (cooldown > 0) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, cooldown * canvas_width / cooldown_max, 2);
    }
}

function manageClick() {
    if (cooldown == 0) {
        let entries = [];

        click_circle = true;
        click_y = canvas_height - click_y;

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
                cooldown = cooldown_max;
                reproduceBoid();
            }
        }
    }
    else {
        error.play();
    }
}

function updateParams(variable) {
    if(variable == "number") {
        number_display.textContent = `Number of boids: ${boids.length}`;
    }
    if(variable == "density") {
        density = density_slider.value;
        density_display.textContent = `Density per 100 x 100 square units: ${density}`;
    }
}

function initParams() {
    density_slider.value = 0.5;
    updateParams("density");

    addBoids(density * canvas_width * canvas_height / 10000);
    console.log(boids);
}
