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
let precision_factor = 2;
let precision = 0.01;
let origin = canvas_width / 2;
let scaling_factor = 1;
let max_displacement = position;
let paused = false;

function prepare() {
    position = init_position;
    velocity = init_velocity
    accn_factor = spring_const / mass;
    precision = Math.pow(10, -precision_factor);

    calcScaling();
}

function calcScaling() {
    max_displacement = Math.sqrt(Math.pow(position, 2) + (mass * Math.pow(velocity, 2) / spring_const));
    scaling_factor = canvas_width / (2 * max_displacement);
    scale_display.innerHTML = `Scale: ${(canvas_width/2).toFixed(0)} pixels = ${max_displacement.toFixed(2)} length units`;
}

function calcThreads() {
    threads = [];
    for (let i = 0; i <= num_threads; i++) {
        threads.push(i * position / num_threads);
    }
}

function button(button) {
    if (button == 'pause') {
        if (paused) {
            paused = false;
            pause_button.innerHTML = "Pause";
        }
        else {
            paused = true;
            pause_button.innerHTML = "Resume";
        }
    }
    else if (button == 'restart') {
        position = init_position;
        velocity = init_velocity
        accn_factor = spring_const / mass;

        paused = false;
        pause_button.innerHTML = "Pause";
    }
    else if(button == 'simulate') {
        init_position = parseFloat(position_input.value);
        init_velocity = parseFloat(velocity_input.value);
        spring_const = parseFloat(spring_constant_input.value);
        mass = parseFloat(spring_mass_input.value);
        damping = parseFloat(damping_input.value);
        precision_factor = parseFloat(precision_input.value);

        paused = false;
        pause_button.innerHTML = "Pause";
        prepare();
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

function initialParams() {
    position_input.value = `${init_position}`;
    velocity_input.value = `${init_velocity}`;
    spring_constant_input.value = `${spring_const}`;
    spring_mass_input.value = `${mass}`;
    damping_input.value = `${damping}`;
    precision_input.value = `${precision_factor}`;
}

function displayParams() {
    position_display.innerHTML = `Position: ${position.toFixed(4)} units`;
    velocity_display.innerHTML = `Velocity: ${velocity.toFixed(4)} units`;
    acceleration_display.innerHTML = `Acceleration: ${accn.toFixed(4)} units`;
}

window.onload = function () {
    initialParams();
    prepare();
    animate(step);
}

function step() {
    if (!paused) {
        update();
    }
    displayParams();
    render();
    animate(step);
};