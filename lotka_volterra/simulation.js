let grid = [];

let pixel_size, length;

let initial_occupancy;

let prey_reproduction, predator_reproduction, prey_death, predator_death;
let pred_requirement;

function update() {
    let new_grid = newGrid();

    // predator loop
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (grid[i][j] == 1) {
                let num_predators = getNumPredators(i, j);
                if (num_predators >= pred_requirement && Math.random() < predator_reproduction) {
                    // reproduction
                    grid[i][j] = 0;
                    new_grid[i][j] = 2;
                }
                else {
                }
            }

            if (grid[i][j] == 2) {
                if (Math.random() < predator_death) {
                    // death
                    new_grid[i][j] = 0;
                }
                else {
                    // sustenance
                    new_grid[i][j] = 2;
                }
            }
        }
    }

    // prey loop
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (grid[i][j] == 1) {
                if (Math.random() < prey_reproduction) {
                    // reproduction
                    let neigh_coords = getRandomEmptyNeighbour(i, j);
                    if (neigh_coords !== undefined) {
                        new_grid[neigh_coords[0]][neigh_coords[1]] = 1;
                    }
                }

                if (Math.random() < prey_death) {
                    // death
                    new_grid[i][j] = 0;
                }
                else {
                    // sustenance
                    new_grid[i][j] = 1;
                }
            }
        }
    }

    // update grid
    grid = new_grid;

    // count
    let num_pred = 0, num_prey = 0;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (grid[i][j] == 1) {
                num_prey++;
            }
            else if (grid[i][j] == 2) {
                num_pred++;
            }
        }
    }

    prey_num_display.innerHTML = `Prey population: ${num_prey}`;
    pred_num_display.innerHTML = `Predator population: ${num_pred}`;
}

function getNumPredators(i, j) {
    let num = 0;
    let neighbours = getAllNeighbours(i, j);

    for (let neighbour of neighbours) {
        if (grid[neighbour[0]][neighbour[1]] == 2) {
            num++;
        }
    }

    return num;
}

function getRandomEmptyNeighbour(i, j) {
    let neighbours = getVNNeighbours(i, j);
    let empty_neighbours = [];

    for (let neighbour of neighbours) {
        if (grid[neighbour[0]][neighbour[1]] == 0) {
            empty_neighbours.push(neighbour);
        }
    }

    return empty_neighbours[Math.floor(Math.random() * empty_neighbours.length)];
}

function getVNNeighbours(i, j) {
    let neighbours = [];
    neighbours.push([(i + 1) % length, j]);
    neighbours.push([(i - 1 + length) % length, j]);
    neighbours.push([i, (j + 1) % length]);
    neighbours.push([i, (j - 1 + length) % length]);
    return neighbours;
}

function getAllNeighbours(i, j) {
    let neighbours = [];
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            if (k != 0 || l != 0) {
                neighbours.push([(i + k + length) % length, (j + l + length) % length]);
            }
        }
    }
    return neighbours;
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderGrid();
}

function updateParams(variable) {
    if (variable == "prey-rep") {
        prey_reproduction = parseFloat(prey_rep_input.value);
        prey_rep_display.innerHTML = `Prey reproduction rate: ${prey_reproduction}`;
    }
    if (variable == "prey-ded") {
        prey_death = parseFloat(prey_ded_input.value);
        prey_ded_display.innerHTML = `Prey death rate: ${prey_death}`;
    }
    if (variable == "pred-rep") {
        predator_reproduction = parseFloat(pred_rep_input.value);
        pred_rep_display.innerHTML = `Predator reproduction rate: ${predator_reproduction}`;
    }
    if (variable == "pred-ded") {
        predator_death = parseFloat(pred_ded_input.value);
        pred_ded_display.innerHTML = `Predator death rate: ${predator_death}`;
    }
    if (variable == "pred-req") {
        pred_requirement = parseFloat(pred_req_input.value);
        pred_req_display.innerHTML = `Predation: ${pred_requirement} predator(s) consume 1 prey`;
    }
}

function renderGrid() {
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (grid[i][j] == 1) {
                context.fillStyle = "#0000ff";
            }
            else if (grid[i][j] == 2) {
                context.fillStyle = "#ff0000";
            }
            else {
                context.fillStyle = "#000000";
            }
            context.fillRect(i * pixel_size, j * pixel_size, pixel_size, pixel_size);
        }
    }
}

function populateGrid() {
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            random_num = Math.random();
            if (random_num < initial_occupancy / 2) {
                grid[i][j] = 1;
            }
            else if (random_num > 1 - initial_occupancy) {
                grid[i][j] = 2;
            }
        }
    }
}

function newGrid() {
    let new_grid = [];

    for (let i = 0; i < length; i++) {
        new_row = []
        for (let j = 0; j < length; j++) {
            new_row.push(0);
        }
        new_grid.push(new_row);
    }

    return new_grid;
}

function initParams() {
    if (mobile) {
        pixel_size = 2;
    }
    else {
        pixel_size = 3;
    }
    
    length = Math.floor(canvas_width / pixel_size);
    initial_occupancy = 0.05;

    updateParams("prey-rep");
    updateParams("prey-ded");
    updateParams("pred-rep");
    updateParams("pred-ded");
    updateParams("pred-req");

    grid = newGrid();
    populateGrid();

    if (paused) {
        pauseToggle();
    }
}