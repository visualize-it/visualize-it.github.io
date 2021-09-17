let grid;

let cells_length, square_length;

let prob;
let spawned, killed;
let spawn_location, kill_location;

let num_epochs, num_steps, num_max;

function update() {
    num_steps++;
    if (num_steps == num_max) {
        num_steps = 0;
        num_epochs++;
    }

    spawned = false;
    killed = false;

    let random_row, random_col;
    if (!isExtinct()) {
        do {
            random_row = Math.floor(Math.random() * cells_length);
            random_col = Math.floor(Math.random() * cells_length);
        } while (grid[random_row][random_col] != 1);
        // find an alive cell

        if (Math.random() < prob) {
            // spawn
            let neighbour_cell = Math.floor(Math.random() * 4);

            if (neighbour_cell == 0) {
                // top
                if (random_row == 0) {
                    spawnAt(cells_length - 1, random_col);
                }
                else {
                    spawnAt(random_row - 1, random_col);
                }
            }
            else if (neighbour_cell == 1) {
                // left
                if (random_col == cells_length - 1) {
                    spawnAt(random_row, 0);
                }
                else {
                    spawnAt(random_row, random_col + 1);
                }
            }
            else if (neighbour_cell == 3) {
                // bottom
                if (random_row == cells_length - 1) {
                    spawnAt(0, random_col);
                }
                else {
                    spawnAt(random_row + 1, random_col);
                }
            }
            else if (neighbour_cell == 4) {
                // right
                if (random_col == 0) {
                    spawnAt(random_row, cells_length - 1);
                }
                else {
                    spawnAt(random_row, random_col - 1);
                }
            }
        }
        else {
            // kill
            grid[random_row][random_col] = 0;
            killed = true;
            kill_location = {
                row: random_row,
                col: random_col,
            };
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    // horizontal lines
    for (let i = 1; i < cells_length; i++) {
        context.beginPath();
        context.moveTo(0, i * square_length);
        context.lineTo(canvas_width, i * square_length);
        context.stroke();
    }

    // vertical lines
    for (let j = 1; j < cells_length; j++) {
        context.beginPath();
        context.moveTo(j * square_length, 0);
        context.lineTo(j * square_length, canvas_height);
        context.stroke();
    }

    context.fillStyle = "#999999";
    for (let i = 0; i < cells_length; i++) {
        for (let j = 0; j < cells_length; j++) {
            if (grid[i][j] == 1) {
                context.fillRect(j * square_length, i * square_length, square_length, square_length);
            }
        }
    }

    if(spawned) {
        context.fillStyle = "#0000ff";
        context.fillRect(spawn_location.col * square_length, spawn_location.row * square_length, square_length, square_length);
    }

    if(killed) {
        context.fillStyle = "#ffff00";
        context.fillRect(kill_location.col * square_length, kill_location.row * square_length, square_length, square_length);
    }
}

function updateParams(variable) {
    if(variable == "prob") {
        prob = prob_input.value;
        prob_display.innerHTML = `Probability of birth: ${prob}`;
    }
    if(variable == "num") {
        cells_length = num_input.value;
        num_display.innerHTML = `Grid size: ${cells_length} x ${cells_length}`;
        initialize();
    }
}

function initialize() {
    square_length = canvas_width / cells_length;
    grid = new2dArray(cells_length, cells_length);

    num_epochs = 0;
    num_steps = 0;
    num_max = cells_length * cells_length;
}

function initParams() {
    num_input.value = 10;
    updateParams("num");
    prob_input.value = 0.8;
    updateParams("prob");

    initialize();
}

function pauseToggle() {
    if(!paused) {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
    else {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
}

function clearGrid() {
    for (let i = 0; i < cells_length; i++) {
        for (let j = 0; j < cells_length; j++) {
            grid[i][j] = 0;
        }
    }
    spawned = false;
    killed = false;
}

function isExtinct() {
    for (let i = 0; i < cells_length; i++) {
        for (let j = 0; j < cells_length; j++) {
            if (grid[i][j] == 1) {
                return false;
            }
        }
    }
    return true;
}

function spawnAt(row, col) {
    if(grid[row][col] == 0) {
        grid[row][col] = 1;
        spawned = true;
        spawn_location = {
            row: row,
            col: col
        }
    }
}