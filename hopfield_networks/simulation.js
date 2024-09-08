let num_cells, cell_length, num_nodes;
let grid, weights;

let num_memorized;

function memorize() {
    let new_weights = [];
    for (let i = 0; i < num_nodes; i++) {
        let new_row = [];
        for (let j = 0; j < num_nodes; j++) {
            new_row.push(0);
        }
        new_weights.push(new_row);
    }

    let vector = [];
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            vector.push(grid[i][j]);
        }
    }

    for (let i = 0; i < num_nodes; i++) {
        for (let j = i + 1; j < num_nodes; j++) {
            new_weights[i][j] = new_weights[j][i] = vector[i] * vector[j];
        }
    }

    for (let i = 0; i < num_nodes; i++) {
        for (let j = 0; j < num_nodes; j++) {
            weights[i][j] = weights[i][j] + new_weights[i][j];
        }
    }

    let max_weight = 0;
    for (let i = 0; i < num_nodes; i++) {
        for (let j = 0; j < num_nodes; j++) {
            max_weight = Math.max(max_weight, Math.abs(weights[i][j]));
        }
    }

    if (max_weight > 0) {
        for (let i = 0; i < num_nodes; i++) {
            for (let j = 0; j < num_nodes; j++) {
                weights[i][j] /= max_weight;
            }
        }
    }
}

function recall() {
    let vector = [];
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            vector.push(grid[i][j]);
        }
    }

    let energies = [];
    while (true) {
        for (let count = 0; count < num_nodes; count++) {
            let node = Math.floor(Math.random() * num_nodes);
            let sum = 0;
            for (let other_node = 0; other_node < num_nodes; other_node++) {
                if (node == other_node) {
                    continue;
                }
                sum += weights[node][other_node] * vector[other_node];
            }
            if (sum > 0) {
                vector[node] = 1;
            } else {
                vector[node] = -1;
            }
        }
    
        let energy = 0;
        for (let i = 0; i < num_nodes; i++) {
            for (let j = i + 1; j < num_nodes; j++) {
                energy -= weights[i][j] * vector[i] * vector[j];
            }
        }
        energies.push(energy);

        if (energies.length > 100 && energies[energies.length - 1] >= energies[energies.length - 2]) {
            break;
        }
    }

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            grid[i][j] = vector[i * num_cells + j];
        }
    }
}

function update() {
    
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    for (let i = 0; i <= num_cells; i++) {
        context.beginPath();
        context.moveTo(i * cell_length, 0);
        context.lineTo(i * cell_length, canvas_height);
        context.stroke();
    }
    for (let i = 0; i <= num_cells; i++) {
        context.beginPath();
        context.moveTo(0, i * cell_length);
        context.lineTo(canvas_width, i * cell_length);
        context.stroke();
    }

    context.fillStyle = "#ffffff";
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (grid[i][j] == +1) {
                context.fillRect(j * cell_length, i * cell_length, cell_length, cell_length);
            }
        }
    }
}

function updateParams(variable) {

}

function initParams() {
    num_cells = 35;
    cell_length = canvas_width / num_cells;
    num_nodes = num_cells * num_cells;
    num_memorized = 0;

    grid = [];
    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(-1);
        }
        grid.push(new_row);
    }

    weights = [];
    for (let i = 0; i < num_nodes; i++) {
        let new_row = [];
        for (let j = 0; j < num_nodes; j++) {
            new_row.push(0);
        }
        weights.push(new_row);
    }

    console.log(weights);
}

function clearGrid() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            grid[i][j] = -1;
        }
    }
}

function clearMemory() {
    clearGrid();
    for (let i = 0; i < num_nodes; i++) {
        for (let j = 0; j < num_nodes; j++) {
            weights[i][j] = 0;
        }
    }
    num_memorized = 0;
}