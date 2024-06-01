let num_cells, cell_length;
let grid = [];
let next_cells = [];

let porosity;

function update() {
    let current_cells = [];
    let i, j;

    for (let next_cell of next_cells) {
        i = next_cell[0];
        j = next_cell[1];
        if (grid[i][j] != 2) {
            grid[i][j] = 2;
            current_cells.push([i, j]);
        }
    }
    next_cells = getNeighCells(current_cells);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawGrid();
}

function updateParams(variable) {
    if (variable == 'prob') {
        porosity = prob_input.value;
        prob_display.innerHTML = `Porosity: ${porosity}`;
        makeGrid();
        populateGrid();
        initFill();
    }
}

function initParams() {
    if (mobile) {
        num_cells = 100;
    }
    else {
        num_cells = 130;
    }

    cell_length = Math.ceil(canvas_width / num_cells);

    updateParams('prob');
}

function getNeighCells(current_cells) {
    let neigh_cells = [];
    let i, j;
    for (let current_cell of current_cells) {
        i = current_cell[0];
        j = current_cell[1];
        if (i - 1 > -1 && grid[i - 1][j] == 0) {
            neigh_cells.push([i - 1, j]);
        }
        if (i + 1 < num_cells && grid[i + 1][j] == 0) {
            neigh_cells.push([i + 1, j]);
        }
        if (j - 1 > -1 && grid[i][j - 1] == 0) {
            neigh_cells.push([i, j - 1]);
        }
        if (j + 1 < num_cells && grid[i][j + 1] == 0) {
            neigh_cells.push([i, j + 1]);
        }
    }
    return neigh_cells;
}

function refill() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] == 2) {
                grid[i][j] = 0;
            }
        }
    }
    initFill();
}

function initFill() {
    let current_cells = []
    for (let i = 0; i < num_cells; i++) {
        if (grid[i][0] == 0) {
            grid[i][0] = 2;
            current_cells.push([i, 0]);
        }
    }
    next_cells = getNeighCells(current_cells);
}

function populateGrid() {
    let num_populated = 0;
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (Math.random() > porosity) {
                grid[i][j] = 1;
                num_populated++;
            }
        }
    }
    let num_required = Math.floor(num_cells * num_cells * (1 - porosity));
    if (num_populated < num_required) {
        let i, j;
        while (num_populated < num_required) {
            i = Math.floor(Math.random() * num_cells);
            j = Math.floor(Math.random() * num_cells);
            if (grid[i][j] == 0) {
                grid[i][j] = 1;
                num_populated++;
            }
        }
    }
    else if (num_populated > num_required) {
        let i, j;
        while (num_populated > num_required) {
            i = Math.floor(Math.random() * num_cells);
            j = Math.floor(Math.random() * num_cells);
            if (grid[i][j] == 1) {
                grid[i][j] = 0;
                num_populated--;
            }
        }
    }
}

function makeGrid() {
    grid = []

    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }
}

function drawGrid() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] == 1) {
                context.fillStyle = "#964b00";
                context.fillRect(i * cell_length, j * cell_length, cell_length, cell_length);
            }
            else if (grid[i][j] == 2) {
                context.fillStyle = "#2989da";
                context.fillRect(i * cell_length, j * cell_length, cell_length - 2, cell_length - 2);
            }
        }
    }
}