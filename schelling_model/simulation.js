let num_cells, cell_length, boid_radius;

let occupancy = 0.3;

let tolerance = 0.7;

let boids;
let grid;

function update() {
    let num_unhappy_boids = getNumUnhappyBoids();

    if (num_unhappy_boids > 0) {
        while (true) {
            let i = Math.floor(Math.random() * num_cells);
            let j = Math.floor(Math.random() * num_cells);

            if (grid[i][j] > 0) {
                let fraction = getFraction(i, j);

                if (fraction > tolerance) {
                    getHappySpot(i, j);
                    break;
                }
                else {
                    continue;
                }
            }
        }
    }

    let num_boids = getNumBoids();

    console.log(num_boids, num_unhappy_boids);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawUnhappySquares();

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] > 0) {
                if (grid[i][j] == 1) {
                    context.fillStyle = "#ff0000";
                }
                else if (grid[i][j] == 2) {
                    context.fillStyle = "#0000ff";
                }

                context.beginPath();
                context.arc((j + 0.5) * cell_length, (i + 0.5) * cell_length, boid_radius, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }
}

function drawUnhappySquares() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] > 0) {
                let fraction = getFraction(i, j, grid[i][j]);

                if (fraction > tolerance) {
                    context.beginPath();
                    context.rect(j * cell_length, i * cell_length, cell_length, cell_length);
                    context.stroke();
                }
            }
        }
    }
}

function updateParams(variable) {

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
        let type = 0;
        if (i % 2 == 0) {
            type = 1;
        }
        else {
            type = 2;
        }

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
    boid_radius = 0.45 * cell_length;

    initObjs();
}

function getHappySpot(i, j) {
    while (true) {
        let i_new = Math.floor(Math.random() * num_cells);
        let j_new = Math.floor(Math.random() * num_cells);


        if (grid[i_new][j_new] == 0) {
            let fraction = getFraction(i_new, j_new, grid[i][j]);

            if (fraction <= tolerance) {
                grid[i_new][j_new] = grid[i][j];
                grid[i][j] = 0;
                break;
            }
        }
    }
}

function getFraction(i, j, type) {
    let num_total = 0, num_opp = 0;

    for (let i_off = -1; i_off <= 1; i_off++) {
        for (let j_off = -1; j_off <= 1; j_off++) {
            let i_index = i + i_off;
            let j_index = j + j_off;

            if (i_index < 0) {
                i_index = num_cells - 1;
            }
            else if (i_index == num_cells) {
                i_index = 0;
            }
            if (j_index < 0) {
                j_index = num_cells - 1;
            }
            else if (j_index == num_cells) {
                j_index = 0;
            }

            if (grid[i_index][j_index] > 0) {
                num_total++;

                if (grid[i_index][j_index] != type) {
                    num_opp++;
                }
            }
        }
    }
    if (num_total == 0) {
        return 1;
    }
    else {
        return num_opp / num_total;
    }
}

function getNumUnhappyBoids() {
    let num_unhappy_boids = 0;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] > 0) {
                let fraction = getFraction(i, j, grid[i][j]);

                if (fraction > tolerance) {
                    num_unhappy_boids++;
                }
            }
        }
    }

    return num_unhappy_boids;
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