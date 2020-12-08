// initial params
let init_position = 50;
let init_velocity = -100;

// constants
let spring_const = 10;
let mass = 5;
let damping = 0.1

// spring params
let position = 0;
let velocity = 0;
let accn = 0;

// spring threads
let threads = [];
let num_threads = 20;

// simulation params
let precision = 0.01;
let origin = canvas_width / 2;
let scaling_factor = 1;
let max_displacement = position;

function prepare() {
    position = init_position;
    velocity = init_velocity
    accn_factor = spring_const / mass;

    calcScaling();
    calcThreads();
}

function calcScaling() {
    max_displacement = Math.sqrt(Math.pow(position, 2) + (mass * Math.pow(velocity, 2) / spring_const));
    scaling_factor = canvas_width / (2 * max_displacement);
}

function calcThreads() {
    threads = [];
    for (let i = 0; i <= num_threads; i++) {
        threads.push(i * position / num_threads);
    }
}

function update() {
    accn = - (accn_factor * position) - (damping * velocity);
    velocity = velocity + (accn * precision);
    position = position + (velocity * precision);
    calcThreads();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.fillStyle = "#ffffff";
    context.fillRect(origin + (position * scaling_factor), 10, 5, 50);

    context.strokeStyle = "#ffffff";
    for (let i = 0; i < num_threads; i++) {

        if (i % 2 == 0) {
            context.beginPath();
            context.moveTo(origin + (threads[i] * scaling_factor), 30);
            context.lineTo(origin + (threads[i + 1] * scaling_factor), 40);
            context.stroke();
        }
        else {
            context.beginPath();
            context.moveTo(origin + (threads[i] * scaling_factor), 40);
            context.lineTo(origin + (threads[i + 1] * scaling_factor), 30);
            context.stroke();
        }
    }
}

window.onload = function () {
    prepare();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
};