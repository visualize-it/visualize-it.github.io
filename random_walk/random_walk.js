// animals
let animals = [];

// simulation params
let num_steps, num_animals;
let current_step;

// graphical params
let interval_length;
let separation_multiplier;

// math params
let positions = [];
let mean, sd, msd, normaliser;

function update() {
    while (current_step < num_steps) {
        for (let animal of animals) {
            animal.walk();
        }
        current_step++;
    }
    if (current_step == num_steps) {
        drawGraph();
        calcParams();
        drawCurve();
    }
}

function calcParams() {
    let displacement_sum = 0, displacement_squared_sum = 0;
    for (let position of positions) {
        displacement_sum += position;
        displacement_squared_sum += position * position;
    }

    mean = displacement_sum / num_animals;
    msd = displacement_squared_sum / num_animals;

    let squared_distance_from_mean = 0;
    for (let position of positions) {
        squared_distance_from_mean += Math.pow(position - mean, 2);
    }
    sd = Math.sqrt(squared_distance_from_mean / num_animals);

    normaliser = sd * Math.sqrt(2 * Math.PI);

    console.log(mean, sd, normaliser);
    params_display.innerHTML = `Mean: ${mean.toFixed(6)} <br> Standard Deviation: ${sd.toFixed(6)} <br> Mean Squared Displacement: ${msd.toFixed(6)}`;
}

function render() {
    if (current_step == num_steps) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas_width, canvas_height);

        context.lineWidth = 2;
        for (let animal of animals) {
            animal.render();
        }
        current_step++;
    }
}

function updateParams(variable) {

}

function initialize() {
    num_animals = Number.parseInt(animals_input.value);
    num_steps = Number.parseInt(steps_input.value);

    animals = [];
    positions = [];
    current_step = 0;

    interval_length = 6;
    separation_multiplier = 2;

    for (let i = 0; i < num_animals; i++) {
        animals.push(new Animal());
    }
    resizeCanvas();
}

function initParams() {
    animals_input.value = 3000;
    steps_input.value = 500;

    initialize();
}

