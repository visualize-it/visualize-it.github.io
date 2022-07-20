function getHappySpotFor(i, j) {
    while (true) {
        let i_new = Math.floor(Math.random() * num_cells);
        let j_new = Math.floor(Math.random() * num_cells);

        if (grid[i_new][j_new] == 0) {
            let fraction = getFraction(i_new, j_new, grid[i][j]);

            if (fraction <= tolerance) {
                let boid = getBoidAt(i, j);
                boid.moveTo(i_new, j_new);

                console.log(i, j, "moving to", i_new, j_new);
                break;
            }
        }
    }
}

function getBoidAt(i, j) {
    for (let boid of boids) {
        if (!boid.moving && boid.i == i && boid.j == j) {
            return boid;
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