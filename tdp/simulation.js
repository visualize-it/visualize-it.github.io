let grid;

let p, q, n, cell_length

let simulation_speed, num_updates, safety_iter;

function update() {
    let num_occupied = getNumOccupied();
    occupancy_display.innerHTML = `<b>Occupancy:</b> ${(num_occupied / (n * n)).toFixed(6)}`;

    let focal_i, focal_j;
    let neighs, neigh_i, neigh_j;

    let updates = 0;
    let safety = 0;

    while (updates < num_updates) {
        safety++;

        if (num_occupied == 0 || num_occupied == n * n) {
            break;
        }

        if (safety > safety_iter) {
            break;
        }

        focal_i = Math.floor(Math.random() * n);
        focal_j = Math.floor(Math.random() * n);

        if (grid[focal_i][focal_j] == 0) {
            continue;
        }
        else {
            neighs = getRandomNeighbour(focal_i, focal_j);
            neigh_i = neighs[0];
            neigh_j = neighs[1];

            if (grid[neigh_i][neigh_j] == 0) {
                if (Math.random() < p) {
                    grid[neigh_i][neigh_j] = 1;
                    num_occupied++;
                    updates++
                }
                else {
                    grid[focal_i][focal_j] = 0;
                    num_occupied--;
                    updates++;
                }
            }
            else {
                if (Math.random() < q) {
                    neighs = getPairNeighbour(focal_i, focal_j, neigh_i, neigh_j);
                    neigh_i = neighs[0];
                    neigh_j = neighs[1];
                    grid[neigh_i][neigh_j] = 1;
                    num_occupied++;
                    updates++;
                }
                else if (Math.random() < 1 - p) {
                    grid[focal_i][focal_j] = 0;
                    num_occupied--;
                    updates++;
                }
            }
        }
    }
}

function getRandomNeighbour(i, j) {
    let neigh = Math.floor(4 * Math.random());
    let neigh_i, neigh_j;

    if (neigh == 0) {
        // up
        neigh_i = i - 1 < 0 ? n - 1 : i - 1;
        neigh_j = j;
    }
    else if (neigh == 1) {
        //down
        neigh_i = i + 1 > n - 1 ? 0 : i + 1;
        neigh_j = j;
    }
    else if (neigh == 2) {
        //left
        neigh_i = i;
        neigh_j = j - 1 < 0 ? n - 1 : j - 1;
    }
    else {
        //right
        neigh_i = i;
        neigh_j = j + 1 > n - 1 ? 0 : j + 1;
    }
    return [neigh_i, neigh_j]
}

function getPairNeighbour(i1, j1, i2, j2) {
    let neigh = Math.floor(6 * Math.random());

    let i, j;

    if (i1 == i2) {
        // same row
        let j_left = j1 < j2 ? j1 : j2;
        let j_right = j1 > j2 ? j1 : j2;
        
        if (neigh == 0) {
            // above the left cell
            i = i1 - 1 < 0 ? n - 1 : i1 - 1;
            j = j_left;
        }
        else if (neigh == 1) {
            // above the right cell
            i = i1 - 1 < 0 ? n - 1 : i1 - 1;
            j = j_right;
        }
        else if (neigh == 2) {
            // right of right cell
            i = i1;
            j = j_right + 1 > n - 1 ? 0 : j_right + 1;
        }
        else if (neigh == 3) {
            // below right cell
            i = i1 + 1 > n - 1 ? 0 : i1 + 1;
            j = j_right;
        }
        else if (neigh == 4) {
            // below left cell
            i = i1 + 1 > n - 1 ? 0 : i1 + 1;
            j = j_left;
        }
        else {
            // left of left cell
            i = i1;
            j = j_left - 1 < 0 ? n - 1 : j_left - 1;
        }
    }
    else {
        // same column
        let i_top = i1 < i2 ? i1 : i2;
        let i_bottom = i1 > i2 ? i1 : i2;

        if (neigh == 0) {
            // top of top cell
            i = i_top - 1 < 0 ? n - 1 : i_top - 1;
            j = j1;
        }
        else if (neigh == 1) {
            // right of top cell
            i = i_top;
            j = j1 + 1 > n - 1 ? 0 : j1 + 1;
        }
        else if (neigh == 2) {
            // right of bottom cell
            i = i_bottom;
            j = j1 + 1 > n - 1 ? 0 : j1 + 1;
        }
        else if (neigh == 3) {
            // bottom of bottom cell
            i = i_bottom + 1 > n - 1 ? 0 : i_bottom + 1;
            j = j1;
        }
        else if (neigh == 4) {
            // left of bottom cell
            i = i_bottom;
            j = j1 - 1 < 0 ? n - 1 : j1 - 1;
        }
        else {
            // left of top cell
            i = i_top;
            j = j1 - 1 < 0 ? n - 1 : j1 - 1;
        }
    }
    return [i, j];
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawCells();
    drawGrid();
}

function updateParams(variable) {
    if (variable == "p") {
        p = parseFloat(p_input.value);
        p_display.innerHTML = `p = ${p}`;
    }
    if (variable == "q") {
        q = parseFloat(q_input.value);
        q_display.innerHTML = `q = ${q}`;
    }
    if (variable == "speed") {
        simulation_speed = parseFloat(speed_input.value);
        speed_display.innerHTML = `Simulation speed: ${simulation_speed}x`;
        num_updates = Math.floor(n * n * simulation_speed / 100);
        safety_iter = 10 * num_updates;
    }
}

function initParams() {
    if (mobile) {
        n = 30;
    }
    else {
        n = 50;
    }
    cell_length = canvas_width / n;

    newGrid();
    randomGrid();

    updateParams("p");
    updateParams("q");
    updateParams("speed");
}

function newGrid() {
    grid = [];

    for (let i = 0; i < n; i++) {
        new_row = [];
        for (let j = 0; j < n; j++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }
}

function randomGrid() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function drawGrid() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;
    
    for (let i = 0; i < n; i++) {
        context.beginPath();
        context.moveTo(i * cell_length, 0);
        context.lineTo(i * cell_length, canvas_height);
        context.stroke();
    }

    for (let i = 0; i < n; i++) {
        context.beginPath();
        context.moveTo(0, i * cell_length);
        context.lineTo(canvas_width, i * cell_length);
        context.stroke();
    }
}

function drawCells() {
    context.fillStyle = "#00ff00";
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == 1) { 
                context.fillRect(j * cell_length, i * cell_length, cell_length, cell_length);
            }
        }
    }
}

function getNumOccupied() {
    let num_occupied = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                num_occupied++;
            }
        }
    }
    return num_occupied;
}