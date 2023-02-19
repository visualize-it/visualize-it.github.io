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
        updateTextFields();
    }
    if (variable == "t2_1") {
        t2_1 = t2_1_input.value * Math.PI / 180;
        t2_1_display.innerHTML = `&theta;<sub>2</sub>: ${t2_1_input.value}&deg;`;
        updateTextFields();
    }
    if (variable == "t1_2") {
        t1_2 = t1_2_input.value * Math.PI / 180;
        t1_2_display.innerHTML = `&theta;<sub>1</sub>: ${t1_2_input.value}&deg;`;
        updateTextFields();
    }
    if (variable == "t2_2") {
        t2_2 = t2_2_input.value * Math.PI / 180;
        t2_2_display.innerHTML = `&theta;<sub>2</sub>: ${t2_2_input.value}&deg;`;
        updateTextFields();
    }

    if (variable == "t1_1_text") {
        let value = parseFloat(t1_1_text.value);
        console.log(value);
        if (!Number.isNaN(value)) {
            t1_1 = value * Math.PI / 180;
            updateSliders();
        }
    }
    if (variable == "t2_1_text") {
        let value = parseFloat(t2_1_text.value);
        if (!Number.isNaN(value)) {
            t2_1 = value * Math.PI / 180;
            updateSliders();
        }
    }
    if (variable == "t1_2_text") {
        let value = parseFloat(t1_2_text.value);
        if (!Number.isNaN(value)) {
            t1_2 = value * Math.PI / 180;
            updateSliders();
        }
    }
    if (variable == "t2_2_text") {
        let value = parseFloat(t2_2_text.value);
        if (!Number.isNaN(value)) {
            t2_2 = value * Math.PI / 180;
            updateSliders();
        }
    }

    console.log(`t1_1: ${t1_1}, t2_1: ${t2_1}, t1_2: ${t1_2}, t2_2: ${t2_2}`);

    if (!paused) {
        pauseToggle();
    }

    pendulum_1 = new Pendulum(t1_1, t2_1, "#0000ff");
    pendulum_2 = new Pendulum(t1_2, t2_2, "#ff0000");
}

function initParams() {
    pendulum_1 = new Pendulum(t1_1, t2_1, "#0000ff");
    pendulum_2 = new Pendulum(t1_2, t2_2, "#ff0000");

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

function updateTextFields() {
    t1_1_text.value = (t1_1 * 180 / Math.PI).toFixed(6);
    t2_1_text.value = (t2_1 * 180 / Math.PI).toFixed(6);
    t1_2_text.value = (t1_2 * 180 / Math.PI).toFixed(6);
    t2_2_text.value = (t2_2 * 180 / Math.PI).toFixed(6);
}

function updateSliders() {
    t1_1_input.value = (t1_1 * 180 / Math.PI).toFixed(0);
    t1_1_display.innerHTML = `&theta;<sub>1</sub>: ${t1_1_input.value}&deg;`;

    t2_1_input.value = (t2_1 * 180 / Math.PI).toFixed(0);
    t2_1_display.innerHTML = `&theta;<sub>2</sub>: ${t2_1_input.value}&deg;`;

    t1_2_input.value = (t1_2 * 180 / Math.PI).toFixed(0);
    t1_2_display.innerHTML = `&theta;<sub>1</sub>: ${t1_2_input.value}&deg;`;

    t2_2_input.value = (t2_2 * 180 / Math.PI).toFixed(0);
    t2_2_display.innerHTML = `&theta;<sub>2</sub>: ${t2_2_input.value}&deg;`;
}