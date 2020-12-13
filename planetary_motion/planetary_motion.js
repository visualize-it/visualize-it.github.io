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

function calcScale() {
    let heaviest_body = bodies[getHeaviestBody()];
    let lightest_body = bodies[getLightestBody()];

    let initial_energy = (- G * heaviest_body.m * lightest_body.m / distance(heaviest_body.x, heaviest_body.y, lightest_body.x, lightest_body.y));
    initial_energy += 0.5 * lightest_body.m * (Math.pow(lightest_body.vx, 2) + Math.pow(lightest_body.vy, 2));
    let maximum_displacement = (- G * heaviest_body.m * lightest_body.m / initial_energy);
    scale = canvas_width / (2 * maximum_displacement);
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
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    for (let body of params) {
        context.beginPath();
        context.arc(transformX(body.x * scale) - radius, transformY(body.y * scale) - radius, radius, 0, 2 * Math.PI);
        context.stroke();
    }
}

function startSimulation() {
    console.log(bodies);

    updateParams();
    calcScale();
    params = [];
    for (let body of bodies) {
        params.push(body);
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

function restart() {

}

function getLightestBody() {
    let index = 0;
    let lowest_mass = Infinity;

    for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].m < lowest_mass) {
            lowest_mass = bodies[i].m;
            index = i;
        }
    }
    return index;
}

function getHeaviestBody() {
    let index = 0;
    let highest_mass = -Infinity;

    for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].m > highest_mass) {
            highest_mass = bodies[i].m;
            index = i;
        }
    }
    return index;
}



