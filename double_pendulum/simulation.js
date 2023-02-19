let pendulum_1, pendulum_2;

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

}

function initParams() {
    pendulum_1 = new Pendulum(Math.random() * Math.PI, Math.random() * Math.PI, "#0000ff");
    pendulum_2 = new Pendulum(Math.random() * Math.PI, Math.random() * Math.PI, "#ff0000");

    dt = 0.1;

    length = 0.2 * canvas_width;
    radius = 0.01 * canvas_width;
    mass = 1;

    prefactor_t = 6 / (mass * length * length);
    prefactor_p = mass * length * length / 2;
    constant = 9.81 / length;
    trail_length = 200;
}