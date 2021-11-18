"use strict"

let animals = [];
let num_animals;

let grid = [];
let num_rows, num_cols, res;

// velocity of animal
let v_animal;

// max saturation of animal
let max_hunger;

// food seeking params
let trigger_seek, outreach_limit;

// maximum homesickness, and distance at which homesickness is half maximum
let k1, d0;

// size of animal
let spoke_length;

// food related
let init_food_fraction, regen_rate;

let turning_angle;
let dt;

function update() {
    if (Math.random() < regen_rate) {
        addFood();
    }

    for (let animal of animals) {
        animal.update();
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
}

function drawFood() {
    context.fillStyle = "#222222";
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

function updateParams(variable) {

}

function initParams() {
    num_animals = 100;
    res = 20;

    num_rows = Math.ceil(canvas_height / res);
    num_cols = Math.ceil(canvas_width / res);

    max_hunger = 500;

    v_animal = 5;

    trigger_seek = 0.5;
    outreach_limit = 3;

    k1 = 0.01;
    d0 = 175;
    dt = 1;

    init_food_fraction = 0.5;
    regen_rate = 0.1;

    turning_angle = toRadian(120);

    spoke_length = 10;

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