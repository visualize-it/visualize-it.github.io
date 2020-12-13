let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("planet-canvas");
let context = canvas.getContext("2d");

let car = document.getElementById("car");
let remove_button = document.getElementById("remove-button");

let pause_button = document.getElementById("pause-button");
let resume_button = document.getElementById("resume-button");

let scale_display = document.getElementById("scale");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.4 * screen_width;
}
canvas_height = canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

originX = canvas_width / 2;
originY = canvas_height / 2;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function() {
    initialParams();
    substituteParams();
    startSimulation();
    animate(step);
}

function step() {
    if(!paused) {
        update();
    }
    render();
    animate(step);
}

function newBody() {
    num_entities += 1;
    car.innerHTML += `
    <div class="col s6">
    <p id="body-${num_entities}" class="center-align">Planet ${num_entities - 1}</p>
    <input id="m-${num_entities}" placeholder="Mass" type="number" onchange="updateParams()">
    <input id="x-${num_entities}" placeholder="X-coordinate" type="number" onchange="updateParams()">
    <input id="y-${num_entities}" placeholder="Y-coordinate" type="number" onchange="updateParams()">
    <input id="vx-${num_entities}" placeholder="Horizontal velocity" type="number" onchange="updateParams()">
    <input id="vy-${num_entities}" placeholder="Vertical velocity" type="number" onchange="updateParams()">
</div>
    `;

    if(num_entities > 2) {
        remove_button.style.display = "block";
    }
    substituteParams();
}

function removeBody() {
    if (num_entities > 2) {

        num_entities -= 1;
        while(bodies.length > num_entities) {
            bodies.pop();
        }

        car.innerHTML = `
        <div class="col s6">
        <p id="body-1" class="center-align">Star</p>
        <input id="m-1" placeholder="Mass" type="number">
        <input id="x-1" placeholder="X-coordinate" type="number">
        <input id="y-1"  placeholder="Y-coordinate" type="number">
        <input id="vx-1" placeholder="Horizontal velocity" type="number">
        <input id="vy-1" placeholder="Vertical velocity" type="number">
    </div>
        `
        for(let entity = 2; entity <= num_entities; entity++) {
            car.innerHTML += `
            <div class="col s6">
            <p id="body-${entity}" class="center-align">Planet ${entity - 1}</p>
            <input id="m-${entity}" placeholder="Mass" type="number" onchange="updateParams()">
            <input id="x-${entity}" placeholder="X-coordinate" type="number" onchange="updateParams()">
            <input id="y-${entity}" placeholder="Y-coordinate" type="number" onchange="updateParams()">
            <input id="vx-${entity}" placeholder="Horizontal velocity" type="number" onchange="updateParams()">
            <input id="vy-${entity}" placeholder="Vertical velocity" type="number" onchange="updateParams()">
        </div>
            `
        }
    }

    if(num_entities == 2) {
        remove_button.style.display = "none";
    }
    substituteParams();
}

function initialParams() {
    paused = false;
    num_entities = init_num_entities;

    bodies.push(
        {
            m: init_star_mass,
            x: init_star_x,
            y: init_star_y,
            vx: init_star_vx,
            vy: init_star_vy,
        }
    )
    bodies.push(
        {
            m: init_planet_mass,
            x: init_planet_x,
            y: init_planet_y,
            vx: init_planet_vx,
            vy: init_planet_vy,
        }
    )

    if (num_entities > 2) {
        remove_button.style.display = "block";
    }
    else {
        remove_button.style.display = "none";
    }
}

function substituteParams() {
    for (let entity = 1; entity <= num_entities; entity++) {
        if (bodies[entity - 1] !== undefined) {
            m_element = document.getElementById(`m-${entity}`);
            m_element.value = `${bodies[entity - 1].m}`;

            x_element = document.getElementById(`x-${entity}`);
            x_element.value = `${bodies[entity - 1].x}`;

            y_element = document.getElementById(`y-${entity}`);
            y_element.value = `${bodies[entity - 1].y}`;

            vx_element = document.getElementById(`vx-${entity}`);
            vx_element.value = `${bodies[entity - 1].vx}`;

            vy_element = document.getElementById(`vy-${entity}`);
            vy_element.value = `${bodies[entity - 1].vy}`;
        }
    }
}

function updateParams() {
    bodies = [];

    for (let entity = 1; entity <= num_entities; entity++) {
        m_element = document.getElementById(`m-${entity}`);
        m = parseFloat(m_element.value);

        x_element = document.getElementById(`x-${entity}`);
        x = parseFloat(x_element.value);

        y_element = document.getElementById(`y-${entity}`);
        y = parseFloat(y_element.value);

        vx_element = document.getElementById(`vx-${entity}`);
        vx = parseFloat(vx_element.value);

        vy_element = document.getElementById(`vy-${entity}`);
        vy = parseFloat(vy_element.value);

        bodies.push(
            {
                m: m,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
            }
        )
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2))
}

function transformX(x) {
    return (originX + x);
}

function transformY(y) {
    return (originY - y);
}