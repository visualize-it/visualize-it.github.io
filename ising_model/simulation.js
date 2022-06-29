
// main grid
let grid, grid_size;

// dimensions
let cell_length;

// simulation params
let j, kB, temperature;
let mc_steps;


function getEnergy(grid) {
    let energy = 0;

    // row-wise calculations
    for (let i = 1; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            energy += grid[i - 1][j] * grid[i][j];
        }
    }

    // column-wise calculations
    for (let j = 1; j < grid_size; j++) {
        for (let i = 0; i < grid_size; i++) {
            energy += grid[i][j - 1] * grid[i][j];
        }
    }

    // vertical border
    for (let i = 0; i < grid_size; i++) {
        energy += grid[i][grid_size - 1] * grid[i][0];
    }

    // horizontal border
    for (let j = 0; j < grid_size; j++) {
        energy += grid[grid_size - 1][j] * grid[0][j];
    }

    return -j * energy;
}

function getSpin(grid) {
    let total_spin = 0;

    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            total_spin += grid[i][j];
        }
    }
    return total_spin;
}

function update() {
    for (let i = 0; i < mc_steps; i++) {
        let initial_energy = getEnergy(grid);

        // select random cell and flip it
        let x = Math.floor(Math.random() * grid_size);
        let y = Math.floor(Math.random() * grid_size);
        grid[x][y] *= -1;
        let final_energy = getEnergy(grid);

        let dE = final_energy - initial_energy;

        if (final_energy < initial_energy) {
            continue;
        }
        else {
            if (Math.random() < Math.exp(-dE / (kB * temperature))) {
                continue;
            }
            else {
                grid[x][y] *= -1;
            }
        }
    }

    spin_display.innerHTML = `Resultant spin: ${getSpin(grid)}`;
    energy_display.innerHTML = `Total energy: ${getEnergy(grid)}`;
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            if (grid[i][j] == 1) {
                context.fillStyle = "#fedd2b";
            }
            else {
                context.fillStyle = "#4c135c";
            }
            context.fillRect(i * cell_length, j * cell_length, cell_length, cell_length);
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
        rate_display.innerHTML = `MC steps per update: ${mc_steps} (${rate_input.value}%)`;
    }
    if (variable == "temp") {
        temperature = temp_input.value;
        temp_display.innerHTML = `Temperature: ${temperature}`;
    }
    if (variable == "j") {
        j = j_input.value;
        j_display.innerHTML = `Interaction strength: ${j}`;
    }
}

function initGrid() {
    grid = [];
    cell_length = canvas_width / grid_size;

    for (let i = 0; i < grid_size; i++) {
        let row = [];
        for (let j = 0; j < grid_size; j++) {
            if (Math.random() < 0.5) {
                row.push(1);
            }
            else {
                row.push(-1);
            }
        }
        grid.push(row);
    }
    updateParams("rate");
}

function initParams() {
    updateParams("size");
    updateParams("rate");
    updateParams("temp");
    updateParams("j");

    j = 1;
    kB = 1;
    temperature = 1;

    mc_steps = 0.01 * grid_size * grid_size;
    
    if (paused) {
        pauseToggle();
    }
}