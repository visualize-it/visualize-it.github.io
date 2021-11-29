"use strict"

// arrays
let animals = [], num_animals;
let predators = [], num_predators;
let murder_locations = [];
let grid = [], num_rows, num_cols, res;

// movement related
let v_animal, v_predator;
let turning_angle, dt;

// homesickness related
let k1, d0;

// sizes
let spoke_length, predator_radius;

// food related
let max_hunger;
let init_food_fraction, regen_rate;
let trigger_seek, outreach_limit;

// counters
let kill_deaths, hunger_deaths, frame;
let total_fitness, mean_h, mean_e;
let mean_h_string, mean_e_string;

function update() {
    if (Math.random() < regen_rate) {
        addFood();
    }

    for (let animal of animals) {
        animal.update();
    }

    for (let predator of predators) {
        predator.update();
    }

    for (let murder_location of murder_locations) {
        murder_location.update();
    }

    let animal_location, predator_location;
    for (let animal of animals) {
        animal_location = animal.getLocation();
        for (let predator of predators) {
            predator_location = predator.getLocation();

            if (!animal.targeting && animal_location.join(",") === predator_location.join(",")) {
                animal.kill();
                naturalSelection(animals, 1);
                updateParams("kill");
                murder_locations.push(new Murder(animal.x + canvas_width / 2, animal.y + canvas_height / 2));
                break;
            }
        }
    }

    if (frame == 0) {
        calcTotalFitness();
    }
    frame++;
    if (frame == fps) {
        frame = 0;
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawFood();
    drawHomeRange();

    for (let animal of animals) {
        animal.render();
    }

    for (let predator of predators) {
        predator.render();
    }

    for (let murder_location of murder_locations) {
        murder_location.render();
    }

    drawGenes();
}

function drawFood() {
    context.fillStyle = "#333333";
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            if (grid[i][j] == 1) {
                context.fillRect(j * res, i * res, res - 1, res - 1);
            }
        }
    }
}

function drawHomeRange() {
    context.strokeStyle = "#0000ff";
    context.beginPath();
    context.arc(canvas_width / 2, canvas_height / 2, d0, 0, 2 * Math.PI, false);
    context.stroke();
}

function drawGenes() {
    let cutoff = Math.floor(mean_h * canvas_width);

    context.fillStyle = "#0000ff";
    context.fillRect(0, 0, cutoff, 10);

    context.fillStyle = "#ff0000";
    context.fillRect(cutoff, 0, canvas_width - cutoff, 10);
}

function updateParams(variable) {
    if (variable == "predator") {
        predator_display.innerHTML = `Number of predators: ${predators.length}`;
    }
    else if (variable == "hunger") {
        hunger_deaths++;
        hunger_display.innerHTML = `Deaths due to hunger: ${hunger_deaths}`;
    }
    else if (variable == "kill") {
        kill_deaths++;
        kill_display.innerHTML = `Deaths due to predation: ${kill_deaths}`;
    }
    else if (variable == "instinct") {
        let diff = Math.abs(mean_h - mean_e);
        if (mean_h > mean_e) {
            instinct_display.innerHTML = `Net instinct: homesickness (+${diff.toFixed(2)})`;
        }
        else {
            instinct_display.innerHTML = `Net instinct: exploration (+${diff.toFixed(2)})`;
        }
    }
    else if (variable == "regen") {
        regen_rate = Number.parseFloat(regen_input.value);
        regen_display.innerHTML = `Food regeneration rate: ${regen_rate.toFixed(2)}`;
    }
    else if (variable == "num") {
        num_animals = Number.parseInt(num_input.value);
    }
}

function initParams() {
    num_input.value = 100;
    updateParams("num");

    res = 20;
    num_rows = Math.ceil(canvas_height / res);
    num_cols = Math.ceil(canvas_width / res);

    max_hunger = 500;
    init_food_fraction = 0.4;
    regen_input.value = 0.8;
    updateParams("regen");
    trigger_seek = 0.5;
    outreach_limit = 5;

    v_animal = 5;
    v_predator = 5;
    turning_angle = toRadian(120);
    dt = 1;

    k1 = 0.001;
    d0 = 175;

    predators = [];
    num_predators = 10;
    addPredator(num_predators);

    spoke_length = 10;
    predator_radius = 10;
    
    frame = 0;
    mean_h_string = "";
    mean_e_string = "";

    makeScene();
}

function makeScene() {
    animals = [];

    let x, y, distance, new_animal;
    for (let i = 0; i < num_animals; i++) {
        // ensure that animal is born within home range
        distance = 2 * canvas_width;
        while (distance > d0) {
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            distance = getDistanceFromCenter(x, y);
        }

        new_animal = new Animal(x - canvas_width / 2, y - canvas_height / 2, new Gene());
        animals.push(new_animal);
    }

    grid = [];
    let new_row;
    for (let i = 0; i < num_rows; i++) {
        new_row = [];
        for (let j = 0; j < num_cols; j++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            if (Math.random() < init_food_fraction) {
                grid[i][j] = 1;
            }
        }
    }

    hunger_deaths = -1;
    kill_deaths = -1;

    updateParams("predator");
    updateParams("hunger");
    updateParams("kill");
}

function calcTotalFitness() {
    mean_e = 0, mean_h = 0;

    for (let animal of animals) {
        mean_e += animal.dna[1];
        mean_h += animal.dna[0];
    }
    mean_e /= num_animals;
    mean_h /= num_animals;
    updateParams("instinct");

    mean_h_string += `${mean_h.toFixed(4)} `;
    mean_e_string += `${mean_e.toFixed(4)} `;
}

function addFood() {
    if (totalFood() < num_rows * num_cols) {
        // ensure that region is not fully packed
        let i, j;
        while (true) {
            i = Math.floor(Math.random() * grid.length);
            j = Math.floor(Math.random() * grid[0].length);
            if (grid[i][j] == 0) {
                grid[i][j] = 1;
                break;
            }
        }
    }
}

function totalFood() {
    let num = 0;

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            num += grid[i][j];
        }
    }
    return num;
}

function pauseToggle() {
    if (paused) {
        paused = false;
    }
    else {
        paused = true;
    }
}

function getMagn(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function getDistanceFromCenter(x, y) {
    return Math.sqrt(Math.pow(x - canvas_width / 2, 2) + Math.pow(y - canvas_height / 2, 2));
}

function toRadian(degrees) {
    return Math.PI * degrees / 180;
}

function restart() {
    num_animals = Number.parseInt(num_input.value)
    makeScene();
}