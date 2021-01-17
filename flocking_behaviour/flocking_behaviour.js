let boids = [];
let speed = 2;
let radius = 20, radius_square;
let is_paused = false;

function addBoids(number = 1) {
    while (number) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let dirn = Math.random() * 360;

        boids.push(
            {
                x: x,
                y: y,
                dirn: dirn,
            }
        );
        number--;
    }

    boids.push(
        {
            x: 0,
            y: canvas_height / 2,
            dirn: 0,
        });

    boids.push({
        x: canvas_width,
        y: canvas_height / 2,
        dirn: 180,
    }
    )
}

function removeBoids(number = 1) {

}

function update() {
    for (let i = 0; i < boids.length; i++) {
        let new_dirns = [];

        // Prevent colliding with other boids
        if (separation_toggle.checked) {
            let approach_dirns = [];
            for (let j = 0; j < boids.length; j++) {
                if (i != j) {
                    if (inCircle(boids[i], boids[j])) {
                        approach_dirns.push(getApproachDirn(boids[i], boids[j]));
                    }
                }
            }
            if (approach_dirns.length != 0) {
                new_dirns.push(getAvg(approach_dirns) - 180);
            }
        }

        if (alignment_toggle.checked) {

        }

        if (cohesion_toggle.checked) {

        }

        if (new_dirns.length != 0) {
            boids[i].dirn = Math.random() * getAvg(new_dirns);
        } 
    }

    for(let boid of boids) {
        boid.x += speed * Math.cos(radian(boid.dirn));
        boid.y -= speed * Math.sin(radian(boid.dirn));

        if (boid.x > canvas_width) {
            boid.x = 0;
        }
        else if (boid.x < 0) {
            boid.x = canvas_width;
        }
        if (boid.y > canvas_height) {
            boid.y = 0;
        }
        else if (boid.y < 0) {
            boid.y = canvas_height;
        }
    }
    console.log(boids);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.fillStyle = "#ffffff";
    for (let boid of boids) {
        context.fillRect(boid.x, boid.y, 3, 3);
    }
}

function step() {
    if(!is_paused) {
        update();
    }
    render();
    animate(step);
}

function initialize() {
    separation_toggle.checked = true;
    alignment_toggle.checked = true;
    cohesion_toggle.checked = true;

    let radius_square = radius * radius;
}

function getApproachDirn(boid1, boid2) {
    let horizontal = boid2.x - boid1.x;
    let vertical = boid2.y - boid1.y;
    return degree(Math.atan(vertical / horizontal));
}

function inCircle(boid1, boid2) {
    if (Math.sqrt(Math.pow(boid1.x - boid2.x, 2) + Math.pow(boid1.y - boid2.y, 2)) <= radius) {
        return true;
    }
    else return false;
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

function pause() {
    if(!is_paused) {
        is_paused = true;
        pause_button.innerHTML = "Resume";
    }
    else {
        is_paused = false;
        pause_button.innerHTML = "Pause";
    }
}