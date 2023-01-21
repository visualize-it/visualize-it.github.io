let cell_length, num_cells;
let dt;

let density, vel_x, vel_y;
let source, force_x, force_y;

let focal_i, focal_j;

let diffusion, viscosity;
let density_relaxation, velocity_relaxation;
let evaporation_rate;

function update() {
    checkUserInput();
    velocityUpdate();
    densityUpdate();
    evaporationUpdate();
}

function updateParams(variable) {

}

function initParams() {
    dt = 0.01;
    cell_length = 10;
    num_cells = Math.ceil(canvas_height / cell_length);

    density = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_x = make2DArray(num_cells + 2, num_cells + 2, 0);
    vel_y = make2DArray(num_cells + 2, num_cells + 2, 0);

    source = make2DArray(num_cells, num_cells, 0);
    force_x = make2DArray(num_cells, num_cells, 1);
    force_y = make2DArray(num_cells, num_cells, 0);

    diffusion = 0.01;
    density_relaxation = 20;
    viscosity = 0.0001;
    velocity_relaxation = 10;
    pressure_relaxation = 10;
    evaporation_rate = 0.01;
}

function copyArray(source, destination) {
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[i].length; j++) {
            destination[i][j] = source[i][j];
        }
    }
}

function make2DArray(rows, cols, value) {
    let arr = []
    for (let i = 0; i < rows; i++) {
        let new_row = [];
        for (let j = 0; j < cols; j++) {
            new_row.push(value);
        }
        arr.push(new_row);
    }
    return arr;
}