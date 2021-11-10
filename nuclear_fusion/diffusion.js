function diffuseCenter() {
    let laplacian, diagonals, adjacents;

    for (let row = 1; row < num_rows - 1; row++) {
        for (let col = 1; col < num_cols - 1; col++) {
            diagonals = diagonal_weight * (temp_grid[row - 1][col - 1] + temp_grid[row - 1][col + 1] + temp_grid[row + 1][col + 1] + temp_grid[row + 1][col - 1]);
            adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col + 1] + temp_grid[row + 1][col] + temp_grid[row][col - 1]);
            laplacian = diagonals + adjacents - grid[row][col]
            grid[row][col] += (diffusion_constant * laplacian) * dt;
        }
    }
}

function diffuseEdges() {
    let laplacian, diagonals, adjacents, row, col;

    // top edge
    row = 0;
    for (let col = 1; col < num_cols - 1; col++) {
        diagonals = diagonal_weight * (temp_grid[row + 1][col + 1] + temp_grid[row + 1][col - 1]);
        adjacents = adjacent_weight * (temp_grid[row][col + 1] + temp_grid[row + 1][col] + temp_grid[row][col - 1]);
        laplacian = diagonals + adjacents - grid[row][col]
        grid[row][col] += (diffusion_constant * laplacian) * dt;
    }

    // bottom edge
    row = num_rows - 1;
    for (let col = 1; col < num_cols - 1; col++) {
        diagonals = diagonal_weight * (temp_grid[row - 1][col - 1] + temp_grid[row - 1][col + 1]);
        adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col + 1] + temp_grid[row][col - 1]);
        laplacian = diagonals + adjacents - grid[row][col]
        grid[row][col] += (diffusion_constant * laplacian) * dt;
    }

    // left edge
    col = 0;
    for (let row = 1; row < num_rows - 1; row++) {
        diagonals = diagonal_weight * (temp_grid[row + 1][col + 1] + temp_grid[row - 1][col + 1]);
        adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col + 1] + temp_grid[row + 1][col]);
        laplacian = diagonals + adjacents - grid[row][col]
        grid[row][col] += (diffusion_constant * laplacian) * dt;
    }

    // right edge
    col = num_cols - 1;
    for (let row = 1; row < num_rows - 1; row++) {
        diagonals = diagonal_weight * (temp_grid[row + 1][col - 1] + temp_grid[row - 1][col - 1]);
        adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col - 1] + temp_grid[row + 1][col]);
        laplacian = diagonals + adjacents - grid[row][col]
        grid[row][col] += (diffusion_constant * laplacian) * dt;
    }
}

function diffuseCorners() {
    let laplacian, diagonals, adjacents, row, col;

    // top left
    row = 0;
    col = 0;
    diagonals = diagonal_weight * (temp_grid[row + 1][col + 1]);
    adjacents = adjacent_weight * (temp_grid[row][col + 1] + temp_grid[row + 1][col]);
    laplacian = diagonals + adjacents - grid[row][col]
    grid[row][col] += (diffusion_constant * laplacian) * dt;

    // top right
    row = 0;
    col = num_cols - 1;
    diagonals = diagonal_weight * (temp_grid[row + 1][col - 1]);
    adjacents = adjacent_weight * (temp_grid[row + 1][col] + temp_grid[row][col - 1]);
    laplacian = diagonals + adjacents - grid[row][col]
    grid[row][col] += (diffusion_constant * laplacian) * dt;

    // bottom left
    row = num_rows - 1;
    col = 0;
    diagonals = diagonal_weight * (temp_grid[row - 1][col + 1]);
    adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col + 1]);
    laplacian = diagonals + adjacents - grid[row][col]
    grid[row][col] += (diffusion_constant * laplacian) * dt;

    // bottom right
    row = num_rows - 1;
    col = num_cols - 1;
    diagonals = diagonal_weight * (temp_grid[row - 1][col - 1]);
    adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col - 1]);
    laplacian = diagonals + adjacents - grid[row][col]
    grid[row][col] += (diffusion_constant * laplacian) * dt;
}

function heatUp() {
    let row = Math.floor(click_y / cell_length);
    let col = Math.floor(click_x / cell_length);
    grid[row][col] = 1;
}

function heatIC() {
    let cols = [0, 1, num_cols - 2, num_cols - 1];
    for(let col of cols) {
        for(let row = 0; row < num_rows; row++) {
            grid[row][col] = ic_heat;
        }
    }
    let rows = [0, 1, num_rows - 2, num_rows - 1];
    for(let row of rows) {
        for(let col = 0; col < num_cols; col++) {
            grid[row][col] = ic_heat;
        }
    }
}

function cooldown() {
    for (let row = 0; row < num_rows; row++) {
        for (let col = 0; col < num_cols; col++) {
            if (grid[row][col] > 0) {
                grid[row][col] -= cooldown_rate * dt;
            }
            if (grid[row][col] < 0) {
                grid[row][col] = 0;
            }
        }
    }
}

function syncGrids() {
    temp_grid = [];
    for (let row = 0; row < num_rows; row++) {
        new_row = [];
        for (let col = 0; col < num_cols; col++) {
            new_row.push(grid[row][col]);
        }
        temp_grid.push(new_row);
    }
}