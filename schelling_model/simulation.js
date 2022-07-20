let num_cells, cell_length, boid_radius;

let num_species = 4;

let occupancy = 0.5, tolerance = 0.33;

let boids, grid;

function update() {
    let num_unhappy_boids = getNumUnhappyBoids();

    unhappy_display.innerHTML = `Unhappiness: ${(num_unhappy_boids / getNumBoids() * 100).toFixed(2)}%`;

    if (num_unhappy_boids > 0) {
        while (true) {
            let i = Math.floor(Math.random() * num_cells);
            let j = Math.floor(Math.random() * num_cells);

            if (grid[i][j] > 0) {
                let fraction = getFraction(i, j, grid[i][j]);

                if (fraction > tolerance) {
                    getHappySpotFor(i, j);
                    break;
                }
                else {
                    continue;
                }
            }
        }
    }

    for (let boid of boids) {
        boid.update();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawUnhappySquares();

    for (let boid of boids) {
        boid.render();
    }
}

function drawUnhappySquares() {
    context.strokeStyle = "#ffffff";

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] > 0) {
                let fraction = getFraction(i, j, grid[i][j]);

                if (fraction > tolerance) {
                    context.beginPath()
                    context.rect(j * cell_length, i * cell_length, cell_length, cell_length);
                    context.stroke();
                }
            }
        }
    }
}

function updateParams(variable) {
    if (variable == "tol") {
        tolerance = tol_input.value;
        tol_display.innerHTML = `Tolerance: ${tolerance}`;
    }
}

function initObjs() {
    for (let i = 0; i < num_cells; i++) {
        new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }

    let num_boids = Math.floor(num_cells * num_cells * occupancy);

    for (let i = 0; i < num_boids; i++) {
        let type = Math.floor(Math.random() * num_species) + 1;

        while (true) {
            let i = Math.floor(Math.random() * num_cells);
            let j = Math.floor(Math.random() * num_cells);

            if (grid[i][j] == 0) {
                grid[i][j] = type;
                boids.push(new Boid(type, i, j));
                break;
            }
        }
    }
}

function initParams() {
    grid = [];
    boids = [];

    if (mobile) {
        num_cells = 30;
    }
    else {
        num_cells = 50;
    }

    cell_length = canvas_width / num_cells;
    boid_radius = 0.4 * cell_length;

    if (paused) {
        pauseToggle();
    }

    updateParams("tol");

    initObjs();
}

function getNumBoids() {
    let num_boids = 0;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] > 0) {
                num_boids++;
            }
        }
    }

    return num_boids;
}