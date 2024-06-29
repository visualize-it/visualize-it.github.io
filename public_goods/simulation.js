let grid = [], fitness = [];
let grid_size, cell_length;
let neigh;

let sigma, r;

function update() {
    calcFitness();

    new_grid = [];
    for (let row = 0; row < grid_size; row++) {
        new_row = [];
        for (let col = 0; col < grid_size; col++) {
            new_row.push(0);
        }
        new_grid.push(new_row);
    }

    let best_fitness, best_fitness_strategy;
    let neigh_row, neigh_col;

    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            best_fitness = -1;
            best_fitness_strategy = -1;
            for (let i = -neigh; i < neigh + 1; i++) {
                for (let j = -neigh; j < neigh + 1; j++) {
                    neigh_row = (row + i + grid_size) % grid_size;
                    neigh_col = (col + j + grid_size) % grid_size;
                    if (fitness[neigh_row][neigh_col] > best_fitness) {
                        best_fitness = fitness[neigh_row][neigh_col];
                        best_fitness_strategy = grid[neigh_row][neigh_col];
                    } 
                }
            }

            new_grid[row][col] = best_fitness_strategy;
        }
    }

    grid = new_grid;

    let num_l = 0, num_c = 0, num_d = 0;
    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            if (grid[row][col] == 0) {
                num_l++;
            }
            else if (grid[row][col] == 1) {
                num_c++;
            }
            else if (grid[row][col] == 2) {
                num_d++;
            }
        }
    }
    disp_params.innerHTML = `Loners: ${num_l} <br> Cooperators: ${num_c} <br> Defectors: ${num_d}`;
}

function calcFitness() {
    let num_participating, num_cooperating;
    let neigh_row, neigh_col;

    for (let row = 0; row < grid_size; row++) {
        for (let col = 0; col < grid_size; col++) {
            if (grid[row][col] == 0) {
                fitness[row][col] = sigma;
                continue;
            }

            num_participating = 0;
            num_cooperating = 0;
            for (let i = -neigh; i < neigh + 1; i++) {
                for (let j = -neigh; j < neigh + 1; j++) {
                    // if (i == 0 && j == 0) {
                    //     continue;
                    // }

                    neigh_row = (row + i + grid_size) % grid_size;
                    neigh_col = (col + j + grid_size) % grid_size;
                    if (grid[neigh_row][neigh_col] == 1) {
                        num_cooperating++;
                    }
                    if (grid[neigh_row][neigh_col] > 0) {
                        num_participating++;
                    }
                }
            }

            if (num_participating <= 1) {
                // essentially a loner
                fitness[row][col] = sigma;
                continue;
            }
            
            if (grid[row][col] == 1) {
                // cooperator
                fitness[row][col] = (r * num_cooperating / num_participating) - 1;
            }
            else if (grid[row][col] == 2) {
                // defector
                fitness[row][col] = (r * num_cooperating / num_participating);
            }
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == 0) {
                // loner
                context.fillStyle = "#00ff00";
            }
            else if (grid[row][col] == 1) {
                // cooperator
                context.fillStyle = "#0000ff";
            }
            else {
                // defector
                context.fillStyle = "#ff0000";
            }
            context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        }
    }
}

function updateParams(variable) {
    if (variable == "r") {
        r = r_input.value;
        r_display.innerHTML = `r: ${r}`;
    }
    if (variable == "sigma") {
        sigma = sigma_input.value;
        sigma_display.innerHTML = `&sigma;: ${sigma}`;
    }
}

function initParams() {
    updateParams("r");
    updateParams("sigma");

    grid = [];
    neigh = 1;

    if (mobile) {
        grid_size = 100;
    }
    else {
        grid_size = 150;
    }

    cell_length = canvas_width / grid_size;

    let new_row;
    for (let row = 0; row < grid_size; row++) {
        new_row = [];
        for (let col = 0; col < grid_size; col++) {
            new_row.push(Math.floor(Math.random() * 3));
        }
        grid.push(new_row);
    }

    for (let row = 0; row < grid_size; row++) {
        new_row = [];
        for (let col = 0; col < grid_size; col++) {
            new_row.push(0);
        }
        fitness.push(new_row);
    }
}