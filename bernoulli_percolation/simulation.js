let cells = [];
let num_cells, cell_length;

let percolation_probability;

function update() {
    
}

function render() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawCells();
    drawGates();
}

function updateParams(variable) {
    if (variable == "prob") {
        percolation_probability = parseFloat(prob_input.value);
        prob_display.innerHTML = `Percolation Probability = ${percolation_probability.toFixed(2)}`;
        openGates();
    }
}

function initParams() {
    if (mobile) {
        num_cells = 30;
    }
    else {
        num_cells = 50;
    }

    cell_length = canvas_width / num_cells;
    makeCells();

    updateParams('prob');
    openGates();
}

function openGates() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (cells[i][j].right < percolation_probability) {
                // right gate should be open
                if (!cells[i][j].right_open) {
                    cells[i][j].right_open = true;
                    cells[i][(j + 1) % num_cells].left_open = true;

                    if (cells[i][j].color != cells[i][(j + 1) % num_cells].color) {
                        cells[i][(j + 1) % num_cells].color = cells[i][j].color;
                        percolate(i, (j + 1) % num_cells);
                    }
                }
            }
            else {
                // right gate should be closed
                if (cells[i][j].right_open) {
                    cells[i][j].right_open = false;
                    cells[i][(j + 1) % num_cells].left_open = false;

                    if (cells[i][j].color == cells[i][(j + 1) % num_cells].color) {
                        cells[i][(j + 1) % num_cells].color = getRandomColor();
                        percolate(i, (j + 1) % num_cells);
                    }
                }
            }
            if (cells[i][j].bottom < percolation_probability) {
                // bottom gate should be open
                if (!cells[i][j].bottom_open) {
                    cells[i][j].bottom_open = true;
                    cells[(i + 1) % num_cells][j].top_open = true;

                    if (cells[i][j].color != cells[(i + 1) % num_cells][j].color) {
                        cells[(i + 1) % num_cells][j].color = cells[i][j].color;
                        percolate((i + 1) % num_cells, j);
                    }
                }
            }
            else {
                // bottom gate should be closed
                if (cells[i][j].bottom_open) {
                    cells[i][j].bottom_open = false;
                    cells[(i + 1) % num_cells][j].top_open = false;

                    if (cells[i][j].color == cells[(i + 1) % num_cells][j].color) {
                        cells[(i + 1) % num_cells][j].color = getRandomColor();
                        percolate((i + 1) % num_cells, j);
                    }
                }
            }
        }
    }
}

function percolate(i, j) {
    let percolate_stack = [[i, j]];

    while (percolate_stack.length > 0) {
        let cell = percolate_stack.pop();
        let i = cell[0];
        let j = cell[1];

        if (cells[i][j].top_open) {
            if (cells[i][j].color != cells[(i + num_cells - 1) % num_cells][j].color) {
                cells[(i + num_cells - 1) % num_cells][j].color = cells[i][j].color;
                percolate_stack.push([(i + num_cells - 1) % num_cells, j]);
            }
        }
        if (cells[i][j].right_open) {
            if (cells[i][j].color != cells[i][(j + 1) % num_cells].color) {
                cells[i][(j + 1) % num_cells].color = cells[i][j].color;
                percolate_stack.push([i, (j + 1) % num_cells]);
            }
        }
        if (cells[i][j].bottom_open) {
            if (cells[i][j].color != cells[(i + 1) % num_cells][j].color) {
                cells[(i + 1) % num_cells][j].color = cells[i][j].color;
                percolate_stack.push([(i + 1) % num_cells, j]);
            }
        }
        if (cells[i][j].left_open) {
            if (cells[i][j].color != cells[i][(j + num_cells - 1) % num_cells].color) {
                cells[i][(j + num_cells - 1) % num_cells].color = cells[i][j].color;
                percolate_stack.push([i, (j + num_cells - 1) % num_cells]);
            }
        }
    }
}

function drawCells() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            context.fillStyle = cells[i][j].color;
            context.fillRect(j * cell_length, i * cell_length, cell_length, cell_length);
        }
    }
}

function drawGates() {
    context.strokeStyle = "#000000";
    context.lineWidth = 2;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (!cells[i][j].top_open) {
                context.beginPath();
                context.moveTo(j * cell_length, i * cell_length);
                context.lineTo((j + 1) * cell_length, i * cell_length);
                context.stroke();
            }
            if (!cells[i][j].right_open) {
                context.beginPath();
                context.moveTo((j + 1) * cell_length, i * cell_length);
                context.lineTo((j + 1) * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
            if (!cells[i][j].bottom_open) {
                context.beginPath();
                context.moveTo(j * cell_length, (i + 1) * cell_length);
                context.lineTo((j + 1) * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
            if (!cells[i][j].left_open) {
                context.beginPath();
                context.moveTo(j * cell_length, i * cell_length);
                context.lineTo(j * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
        }
    }
}

function getRandomColor() {
    let color = "rgb(";
    color += Math.floor(56 + Math.random() * 200) + ", ";
    color += Math.floor(56 + Math.random() * 200) + ", ";
    color += Math.floor(56 + Math.random() * 200) + ")";
    return color;
}

function makeCells() {
    cells = [];
    for (let i = 0; i < num_cells; i++) {
        new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_cell = {
                bottom: Math.random(),
                right: Math.random(),
                
                top_open: false,
                right_open: false,
                bottom_open: false,
                left_open: false,

                color: getRandomColor(),
            };
            new_row.push(new_cell);
        }
        cells.push(new_row);
    }
}