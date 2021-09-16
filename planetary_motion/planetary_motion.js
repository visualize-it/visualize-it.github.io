// Initial params
let init_num_entities = 2;
let init_star_mass = 1000;
let init_star_x = 0, init_star_y = 0;
let init_star_vx = 0, init_star_vy = 0;

let init_planet_mass = 10;
let init_planet_x = 5, init_planet_y = 0;
let init_planet_vx = 0, init_planet_vy = 10;

let bodies = [];

// Simulation params
let num_entities
let scale, max_distance;
let params = [];
let paused = false;
let G = 1, prec = 0.01;
let radius = 5;

// Transitive elements
let m_element, x_element, y_element, vx_element, vy_element;
let ax, ay;
let m, x, y, vx, vy;

// trail
let trails = [];
let trails_limit = 10;

function calcScale() {
    scale = canvas_width / (3 * getFarthestDistance());
    scale_display.innerHTML = `Scale: ${scale.toFixed(0)} pixels = ${(3 * getFarthestDistance()).toFixed(2)} length units`;
}

function update() {
    for (let i = 0; i < params.length; i++) {
        ax = 0;
        ay = 0;

        for (let j = 0; j < params.length; j++) {
            if (i != j) {
                ax += (- G * params[j].m * (params[i].x - params[j].x) / Math.pow(distance(params[i].x, params[i].y, params[j].x, params[j].y), 3));
                ay += (- G * params[j].m * (params[i].y - params[j].y) / Math.pow(distance(params[i].x, params[i].y, params[j].x, params[j].y), 3));
            }
        }

        params[i].vx += (ax * prec);
        params[i].vy += (ay * prec);

        params[i].x += (params[i].vx * prec);
        params[i].y += (params[i].vy * prec);
    }

    while(trails.length > trails_limit * num_entities) {
        trails.pop();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.fillStyle = "#ffffff";
    for (let body of params) {
        context.beginPath();
        context.arc(transformX(body.x * scale) - radius, transformY(body.y * scale) - radius, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        trails.unshift({
            x: transformX(body.x * scale) - radius,
            y: transformY(body.y * scale) - radius,
        });
    }

    context.fillStyle = "#ffffff";
    for(let trail of trails) {
        context.fillRect(trail.x, trail.y, 2, 2);
    }
}

function startSimulation() {
    paused = false;
    pause_button.innerHTML = "Pause";

    updateParams();
    calcScale();

    params = [];
    trails = [];
    for(let i = 0; i < bodies.length; i++) {
        params.push({
            m: bodies[i].m,
            x: bodies[i].x,
            y: bodies[i].y,
            vx: bodies[i].vx,
            vy: bodies[i].vy,
        });
    }
}

function pause() {
    if (paused) {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
    else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}

function getFarthestDistance() {
    let dist;
    let greatest_distance = -Infinity;

    for(let i = 0; i < bodies.length; i++) {
        dist = distance(bodies[i].x, bodies[i].y, 0, 0);
        if(dist > greatest_distance) {
            greatest_distance = dist;
        }
    }
    return greatest_distance;
}

function restart() {
    startSimulation();
}

function zoomIn() {
    scale *= 2;
    trails = [];
    scale_display.innerHTML = `Scale: ${scale.toFixed(0)} pixels = ${(3 * getFarthestDistance()).toFixed(2)} length units`;
}

function zoomOut() {
    scale /= 2;
    trails = [];
    scale_display.innerHTML = `Scale: ${scale.toFixed(0)} pixels = ${(3 * getFarthestDistance()).toFixed(2)} length units`;
}

function createEntities(number) {
    if(num_entities > number) {
        while(num_entities != number) {
            removeBody();
        }
    }
    else if(num_entities < number) {
        while(num_entities != number) {
            newBody();
        }
    }
}

function phenomena(number) {
    if(number == 1) {
        createEntities(2);
        bodies = [];
        bodies.push(
            {
                m: 1000,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
            },
            {
                m: 100,
                x: 5,
                y: 0,
                vx: 0,
                vy: 10,
            }
        )
        substituteParams();
        window.scrollTo(0,100);
        startSimulation();
    }
    else if(number == 2) {
        createEntities(3);
        bodies = [];
        bodies.push(
            {
                m: 100,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
            },
            {
                m: 1,
                x: -5,
                y: -5,
                vx: -3,
                vy: 3,
            },
            {
                m: 1,
                x: 0,
                y: 5,
                vx: 4.5,
                vy: 0,
            }
        )
        substituteParams();
        window.scrollTo(0,100);
        startSimulation();
    }
    else if(number == 3) {
        createEntities(2);
        bodies = [];
        bodies.push(
            {
                m: 500,
                x: -5,
                y: 0,
                vx: 0,
                vy: -5,
            },
            {
                m: 500,
                x: 5,
                y: 0,
                vx: 0,
                vy: 5,
            }
        )
        substituteParams();
        window.scrollTo(0,100);
        startSimulation();
    }
    else if(number == 4) {
        createEntities(3);
        bodies = [];
        bodies.push(
            {
                m: 100,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
            },
            {
                m: 1,
                x: 5,
                y: 0,
                vx: 0,
                vy: 5,
            },
            {
                m: 1,
                x: 8,
                y: 0,
                vx: 0,
                vy: 3,
            }
        )
        substituteParams();
        window.scrollTo(0,100);
        startSimulation();
    }
    else if(number == 5) {
        createEntities(3);
        bodies = [];
        bodies.push(
            {
                m: 1000,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
            },
            {
                m: 10,
                x: 5,
                y: 0,
                vx: 0,
                vy: 10,
            },
            {
                m: 10,
                x: -5,
                y: 0,
                vx: 0,
                vy: -10,
            }
        )
        substituteParams();
        window.scrollTo(0,350);
        startSimulation();
    }
}

