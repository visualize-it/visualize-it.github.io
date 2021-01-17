let boids = [];
let speed = 2;
let sep_radius = 15, align_radius = 30, coh_radius = 20;
let is_paused = false;
let is_highlighted = true, highlight_index;
let seek_x, seek_y, seek_angle;

function update() {
    for (let i = 0; i < boids.length; i++) {
        let sep_dirn = undefined, align_dirn = undefined, coh_dirn = undefined;

        // Prevent collisions
        if (separation_toggle.checked) {
            let approach_dirns = [];
            for (let j = 0; j < boids.length; j++) {
                if (i != j) {
                    if (inCircle(boids[i], boids[j], sep_radius)) {
                        approach_dirns.push(getApproachDirn(boids[i], boids[j]));
                    }
                }
            }
            if (approach_dirns.length) {
                sep_dirn = getAvg(approach_dirns) + 180;
            }
        }

        // Move along with nearby boids
        if (alignment_toggle.checked) {
            let neigh_dirns = [];
            for (let j = 0; j < boids.length; j++) {
                if (i != j) {
                    if (inCircle(boids[i], boids[j], align_radius)) {
                        neigh_dirns.push(boids[j].dirn);
                    }
                }
            }
            if (neigh_dirns.length) {
                align_dirn = getAvg(neigh_dirns);
                if (i == highlight_index) {
                    seek_angle = align_dirn;
                }
            }
        }

        // Form clusters
        if (cohesion_toggle.checked) {
            let neigh_x = [];
            let neigh_y = [];
            for (let j = 0; j < boids.length; j++) {
                if (i != j) {
                    if (inCircle(boids[i], boids[j], coh_radius)) {
                        neigh_x.push(boids[j].x);
                        neigh_y.push(boids[j].y);
                    }
                }
            }

            if (neigh_x.length) {
                coh_dirn = seekDirn(boids[i], getAvg(neigh_x), getAvg(neigh_y));
                if (i == highlight_index) {
                    seek_x = getAvg(neigh_x);
                    seek_y = getAvg(neigh_y);
                }
            }
        }

        // combine rules
        if (sep_dirn !== undefined) {
            if (coh_dirn === undefined) {
                boids[i].dirn = sep_dirn;
            }
        }
        else if (align_dirn !== undefined && coh_dirn !== undefined) {
            boids[i].dirn = 0.7 * align_dirn + 0.3 * coh_dirn;
        }
        else if (align_dirn !== undefined) {
            boids[i].dirn = align_dirn;
        }
        else if (coh_dirn !== undefined) {
            boids[i].dirn = coh_dirn;
        }
    }

    for (let boid of boids) {
        boid.x += speed * Math.cos(radian(boid.dirn));
        boid.y -= speed * Math.sin(radian(boid.dirn));

        if (boid.x > canvas_width) {
            boid.x = 0;
            seek_x = seek_y = seek_angle = undefined;
        }
        else if (boid.x < 0) {
            boid.x = canvas_width;
            seek_x = seek_y = seek_angle = undefined;
        }
        if (boid.y > canvas_height) {
            boid.y = 0;
            seek_x = seek_y = seek_angle = undefined;
        }
        else if (boid.y < 0) {
            boid.y = canvas_height;
            seek_x = seek_y = seek_angle = undefined;
        }

        while (boid.dirn > 360) {
            boid.dirn -= 360;
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    if (is_highlighted) {
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.arc(boids[highlight_index].x, boids[highlight_index].y, align_radius, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = "#00ff00";
        context.beginPath();
        context.arc(boids[highlight_index].x, boids[highlight_index].y, coh_radius, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = "#0000ff";
        context.beginPath();
        context.arc(boids[highlight_index].x, boids[highlight_index].y, sep_radius, 0, 2 * Math.PI);
        context.fill();

        if (seek_x !== undefined) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.moveTo(boids[highlight_index].x, boids[highlight_index].y);
            context.lineTo(seek_x, seek_y);
            context.stroke();
        }

        if(seek_angle !== undefined) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.moveTo(boids[highlight_index].x, boids[highlight_index].y);
            context.lineTo(boids[highlight_index].x + 50 * Math.cos(radian(seek_angle)), boids[highlight_index].y - 50 * Math.sin(radian(seek_angle)));
            context.stroke();
        }
    }

    context.fillStyle = "#ffffff";
    for (let boid of boids) {
        context.fillRect(boid.x, boid.y, 3, 3);
    }
}

function getApproachDirn(boid1, boid2) {
    return degree(Math.atan((boid2.x - boid1.x) / boid1.y - boid2.y));
}

function seekDirn(boid, target_x, target_y) {
    if (boid.x - target_x > 0) {
        return degree(Math.atan((target_y - boid.y) / (boid.x - target_x))) + 180;
    }
    else {
        return degree(Math.atan((target_y - boid.y) / (boid.x - target_x)));
    }
}

function inCircle(boid1, boid2, radius) {
    return (Math.sqrt(Math.pow(boid1.x - boid2.x, 2) + Math.pow(boid1.y - boid2.y, 2)) <= radius)
}

function getAvg(list) {
    if (list.length != 0) {
        let sum = 0;
        for (let item of list) {
            sum += item
        }
        return (sum / list.length);
    }
    else {
        return 0;
    }
}

function radian(degree) {
    return (degree * Math.PI / 180);
}

function degree(radian) {
    return (radian * 180 / Math.PI);
}

