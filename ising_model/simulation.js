// main grid
let grid, grid_size;

// dimensions
let cell_length;

// simulation params
let j_in, kB, temperature;
let mc_steps;
let total_energy;


function getEnergy(grid) {
    let energy = 0;

    let top_row, bottom_row, left_col, right_col;
    let top, bottom, left, right
    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            if (row == 0) {
                top_row = grid_size - 1;
            }
            else {
                top_row = row - 1;
            }

            if (row == grid_size - 1) {
                bottom_row = 0;
            }
            else {
                bottom_row = row + 1;
            }

            if (col == 0) {
                left_col = grid_size - 1;
            }
            else {
                left_col = col - 1;
            }

            if (col == grid_size - 1) {
                right_col = 0;
            }
            else {
                right_col = col + 1;
            }

            top = grid[top_row][col];
            bottom = grid[bottom_row][col];
            left = grid[row][left_col];
            right = grid[row][right_col];
            energy += grid[row][col] * (top + bottom + left + right);
        }
    }

    energy /= 2;

    return -j_in * energy;
}

function getEnergyDiff(grid, row, col) {
    let top_row, bottom_row, left_col, right_col;

    if (row == 0) {
        top_row = grid_size - 1;
    }
    else {
        top_row = row - 1;
    }

    if (row == grid_size - 1) {
        bottom_row = 0;
    }
    else {
        bottom_row = row + 1;
    }

    if (col == 0) {
        left_col = grid_size - 1;
    }
    else {
        left_col = col - 1;
    }

    if (col == grid_size - 1) {
        right_col = 0;
    }
    else {
        right_col = col + 1;
    }

    let top = grid[top_row][col];
    let bottom = grid[bottom_row][col];
    let left = grid[row][left_col];
    let right = grid[row][right_col];
    let current = grid[row][col];

    return 2 * j_in * current * (top + bottom + left + right);
}

function getSpin(grid) {
    let total_spin = 0;

    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            total_spin += grid[row][col];
        }
    }
    return total_spin;
}

function updateColor(row, col) {
    if (grid[row][col] == 1) {
        context.fillStyle = "#fedd2b";
    }
    else {
        context.fillStyle = "#4c135c";
    }
    context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
}

function update() {
    // mc_steps = 1;
    let row, col, dE;
    for (let step = 0; step < mc_steps; step++) {
        // select random cell and flip it
        row = Math.floor(Math.random() * grid_size);
        col = Math.floor(Math.random() * grid_size);
        dE = getEnergyDiff(grid, row, col);

        // init_energy = getEnergy(grid);
        // grid[row][col] *= -1;
        // final_energy = getEnergy(grid);
        // dE = final_energy - init_energy;
        // grid[row][col] *= -1;
        
        if (dE < 0) {
            grid[row][col] *= -1
            updateColor(row, col);
        }
        else {
            if (Math.random() < Math.exp(-dE / (kB * temperature))) {
                grid[row][col] *= -1
                updateColor(row, col);
            }
            else {
                continue;
            }
        }
    }

    spin_display.innerHTML = `Resultant spin: ${getSpin(grid)}`;
    energy_display.innerHTML = `Total energy: ${getEnergy(grid)}`;
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            if (grid[row][col] == 1) {
                context.fillStyle = "#fedd2b";
            }
            else {
                context.fillStyle = "#4c135c";
            }
            context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        }
    }
}

function updateParams(variable) {
    if (variable == "size") {
        grid_size = size_input.value;
        size_display.innerHTML = `Grid size: ${grid_size} x ${grid_size}`;
        initGrid();
    }
    if (variable == "rate") {
        mc_steps = ((rate_input.value / 100) * grid_size * grid_size).toFixed(0);
        rate_display.innerHTML = `Updates per iteration: ${mc_steps} (${rate_input.value}%)`;
    }
    if (variable == "temp") {
        temperature = temp_input.value;
        temp_display.innerHTML = `Temperature: ${temperature}`;
    }
    if (variable == "j") {
        j_in = j_input.value;
        j_display.innerHTML = `Interaction strength: ${j_in}`;
    }
}

function initGrid() {
    grid = [];
    cell_length = canvas_width / grid_size;

    for (let row = 0; row < grid_size; row++) {
        let new_row = [];
        for (let col = 0; col < grid_size; col++) {
            if (Math.random() < 0.5) {
                new_row.push(1);
            }
            else {
                new_row.push(-1);
            }
        }
        grid.push(new_row);
    }
    updateParams("rate");
    updateParams("temp");
    updateParams("j");
    render();
    
    total_energy = getEnergy(grid);
}

function initParams() {
    updateParams("size");
    updateParams("rate");
    updateParams("temp");
    updateParams("j");

    kB = 1;

    mc_steps = 0.01 * grid_size * grid_size;
    
    if (paused) {
        pauseToggle();
    }
}