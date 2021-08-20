let DFS = {
    grid: [],
    stack: [],
    current_cell: {
        i: -1,
        j: -1
    }
}

function updateDFS() {
    if (DFS.stack.length > 0) {
        let current_cell = DFS.stack.pop();
        current_cell.inStack = false;
        let i = current_cell.i, j = current_cell.j;
        DFS.current_cell.i = i, DFS.current_cell.j = j;

        let emptyNeighbours = [];
        if (i - 1 > -1 && !DFS.grid[i - 1][j].visited) {
            emptyNeighbours.push(DFS.grid[i - 1][j]);
        }
        if (j + 1 < num_cols && !DFS.grid[i][j + 1].visited) {
            emptyNeighbours.push(DFS.grid[i][j + 1]);
        }
        if (i + 1 < num_rows && !DFS.grid[i + 1][j].visited) {
            emptyNeighbours.push(DFS.grid[i + 1][j]);
        }
        if (j - 1 > -1 && !DFS.grid[i][j - 1].visited) {
            emptyNeighbours.push(DFS.grid[i][j - 1]);
        }

        if (emptyNeighbours.length > 0) {
            current_cell.inStack = true;
            DFS.stack.push(current_cell);
            let chosen_cell = randomCell(emptyNeighbours);
            let i_new = chosen_cell.i, j_new = chosen_cell.j;
            if (i == i_new) {
                if (j < j_new) {
                    DFS.grid[i][j].walls[1] = false;
                    chosen_cell.walls[3] = false;
                }
                else {
                    DFS.grid[i][j].walls[3] = false;
                    chosen_cell.walls[1] = false;
                }
            }
            else {
                if (i < i_new) {
                    DFS.grid[i][j].walls[2] = false;
                    chosen_cell.walls[0] = false;
                }
                else {
                    DFS.grid[i][j].walls[0] = false;
                    chosen_cell.walls[2] = false;
                }
            }

            chosen_cell.visited = true;
            chosen_cell.inStack = true;
            DFS.stack.push(chosen_cell);
        }
    }
    else {
        DFS.current_cell.i = -1;
        DFS.current_cell.j = -1;
    }
}

function renderDFS() {
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            DFS.grid[i][j].render();
        }
    }

    context.fillStyle = "#39ff14";
    context.fillRect(DFS.current_cell.j * length, DFS.current_cell.i * length, length, length);
}

function initDFS() {
    clearDFS();
    DFS.grid = get2Darray(num_rows, num_cols);

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            DFS.grid[i][j] = new Cell(i, j);
        }
    }

    let initial_cell = DFS.grid[randInt(0, num_rows)][randInt(0, num_cols)];
    initial_cell.visited = true;
    initial_cell.inStack = true;
    DFS.stack.push(initial_cell);
}

function clearDFS() {
    DFS.grid = [];
    DFS.stack = [];
    DFS.current_cell.x = -1;
    DFS.current_cell.y = -1;
}