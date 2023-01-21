let cell_length, num_cells, dt;

let density, vel_x, vel_y;
let source, force_x, force_y;
let pressure;

let focal_i, focal_j;

let diffusion, viscosity;
let density_relaxation, velocity_relaxation;
let evaporation_rate;

let show_vel, show_density, source_on;

function update() {
    if (source_on) {
        source[Math.floor(num_cells / 2)][Math.floor(num_cells / 2)] = 100 + 100 * Math.random();
    }
    else {
        source[Math.floor(num_cells / 2)][Math.floor(num_cells / 2)] = 0;
    }

    velocityUpdate();
    densityUpdate();
}

function updateParams(variable) {
    if (variable == "fx") {
        let value = fx_input.value;
        fx_display.innerHTML = `F<sub>x</sub>: ${value}`;
        for (let i = 0; i < num_cells; i++) {
            for (let j = 0; j < num_cells; j++) {
                force_x[i][j] = value;
            }
        }
    }
    if (variable == "fy") {
        let value = fy_input.value;
        fy_display.innerHTML = `F<sub>y</sub>: ${value}`;
        for (let i = 0; i < num_cells; i++) {
            for (let j = 0; j < num_cells; j++) {
                force_y[i][j] = value;
            }
        }
    }
}

function initParams() {
    dt = 0.01;

    if (!mobile) {
        cell_length = 10;
    }
    else {
        cell_length = 8;
    }

    num_cells = Math.ceil(canvas_height / cell_length);

    density = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_x = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_y = make2DArray(num_cells + 2, num_cells + 2, 0);

    source = make2DArray(num_cells, num_cells, 0);

    force_x = make2DArray(num_cells, num_cells, 0);
    updateParams("fx");

    force_y = make2DArray(num_cells, num_cells, 0);
    updateParams("fy");

    diffusion = 0.001;
    viscosity = 0.1;
    evaporation_rate = 0;

    density_relaxation = 10;
    velocity_relaxation = 10;
    pressure_relaxation = 10;

    show_vel = true;
    show_density = true;
    source_on = true;
}

function copyArray(source, destination) {
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[i].length; j++) {
            destination[i][j] = source[i][j];
        }
    }
}

function clearScreen() {
    density = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_x = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_y = make2DArray(num_cells + 2, num_cells + 2, 0);
    source = make2DArray(num_cells, num_cells, 0);
}

function make2DArray(rows, cols, value) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        let new_row = [];
        for (let j = 0; j < cols; j++) {
            new_row.push(value);
        }
        arr.push(new_row);
    }
    return arr;
}

function getMax(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] > max) {
                max = arr[i][j];
            }
        }
    }
    return max;
}

function getMin(arr) {
    let min = Infinity;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] < min) {
                min = arr[i][j];
            }
        }
    }
    return min;
}