let pendulum_1, pendulum_2;

let t1_1, t2_1;
let t1_2, t2_2;

let dt;
let length, radius, mass;
let prefactor_t, prefactor_p, constant;

let trail_length;

function update() {
    pendulum_1.update();
    pendulum_2.update();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    pendulum_1.render();
    pendulum_2.render();
}

function updateParams(variable) {
    if (variable == "t1_1") {
        t1_1 = t1_1_input.value * Math.PI / 180;
        t1_1_display.innerHTML = `&theta;<sub>1</sub>: ${t1_1_input.value}&deg;`;
    }
    if (variable == "t2_1") {
        t2_1 = t2_1_input.value * Math.PI / 180;
        t2_1_display.innerHTML = `&theta;<sub>2</sub>: ${t2_1_input.value}&deg;`;
    }
    if (variable == "t1_2") {
        t1_2 = t1_2_input.value * Math.PI / 180;
        t1_2_display.innerHTML = `&theta;<sub>1</sub>: ${t1_2_input.value}&deg;`;
    }
    if (variable == "t2_2") {
        t2_2 = t2_2_input.value * Math.PI / 180;
        t2_2_display.innerHTML = `&theta;<sub>2</sub>: ${t2_2_input.value}&deg;`;
    }

    pendulum_1 = new Pendulum(t1_1, t2_1, "#0000ff");
    pendulum_2 = new Pendulum(t1_2, t2_2, "#ff0000");

    if (!paused) {
        pauseToggle();
    }
}

function initParams() {
    updateParams("t1_1");
    updateParams("t2_1");
    updateParams("t1_2");
    updateParams("t2_2");

    pauseToggle();

    dt = 0.1;

    length = 0.2 * canvas_width;
    radius = 0.015 * canvas_width;
    mass = 1;

    prefactor_t = 6 / (mass * length * length);
    prefactor_p = mass * length * length / 2;
    constant = 9.81 / length;
    trail_length = 200;
}