let num_rows, num_cols;
let cell_length;
let grid = [];

function update() {
    let random_row = Math.floor(Math.random() * num_rows);
    let random_col = Math.floor(Math.random() * num_cols);

    grid[random_row][random_col] += 1;
    // renderSand(random_row, random_col);

    let unstable_point, row, col;
    while (true) {
        let unstable_points = getUnstablePoints();

        if (unstable_points.length == 0) {
            break;
        }

        unstable_point = unstable_points.pop(Math.floor(Math.random() * unstable_points.length));
        row = unstable_point[0];
        col = unstable_point[1];
        grid[row][col] -= 4;
        // renderSand(row, col);

        if (row - 1 >= 0) {
            grid[row - 1][col] += 1;
            // renderSand(row - 1, col);
        }
        if (row + 1 < num_rows) {
            grid[row + 1][col] += 1;
            // renderSand(row + 1, col);
        }
        if (col - 1 >= 0) {
            grid[row][col - 1] += 1;
            // renderSand(row, col - 1);
        }
        if (col + 1 < num_cols) {
            grid[row][col + 1] += 1;
            // renderSand(row, col + 1);
        }

        render();
    }
}

function getUnstablePoints() {
    let unstable_points = [];
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            if (grid[i][j] >= 4) {
                unstable_points.push([i, j]);
            }
        }
    }
    return unstable_points;
}

function render() {
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            renderSand(i, j)
        }
    }
}

function renderSand(row, col) {
    if (grid[row][col] == 0) {
        context.fillStyle = "#000000";
    }
    else if (grid[row][col] == 1) {
        context.fillStyle = "#0000ff";
    }
    else if (grid[row][col] == 2) {
        context.fillStyle = "#00ff00";
    }
    else if (grid[row][col] == 3) {
        context.fillStyle = "#ff0000";
    }
    else {
        context.fillStyle = "#ffffff";
    }
    context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
}

function updateParams(variable) {
    
}

function initParams() {
    cell_length = 10;
    num_cols = Math.floor(canvas.width / cell_length);
    num_rows = Math.floor(canvas.height / cell_length);

    let new_row;
    for (let i = 0; i < num_rows; i++) {
        new_row = [];
        for (let j = 0; j < num_cols; j++) {
            if (Math.random() < 0.1) {
                new_row.push(3);
            }
            else {
                new_row.push(2);
            }
        }
        grid.push(new_row);
    }

    render();
}