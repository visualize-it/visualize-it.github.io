let cells = [];
let num_cells, cell_length;

let percolation_probability;

function update() {
    
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawCells();
}

function updateParams(variable) {

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

    percolation_probability = 0.5;
    openGates();
}

function drawCells() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (cells[i][j].top_open) {
                context.beginPath();
                context.moveTo(j * cell_length, i * cell_length);
                context.lineTo((j + 1) * cell_length, i * cell_length);
                context.stroke();
            }
            if (cells[i][j].right_open) {
                context.beginPath();
                context.moveTo((j + 1) * cell_length, i * cell_length);
                context.lineTo((j + 1) * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
            if (cells[i][j].bottom_open) {
                context.beginPath();
                context.moveTo(j * cell_length, (i + 1) * cell_length);
                context.lineTo((j + 1) * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
            if (cells[i][j].left_open) {
                context.beginPath();
                context.moveTo(j * cell_length, i * cell_length);
                context.lineTo(j * cell_length, (i + 1) * cell_length);
                context.stroke();
            }
        }
    }
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
                left_open: false
            };
            new_row.push(new_cell);
        }
        cells.push(new_row);
    }
}

function openGates() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (cells[i][j].right < percolation_probability) {
                cells[i][j].right_open = true;
                cells[i][(j + 1) % num_cells].left_open = true;
            }
            else {
                cells[i][j].right_open = false;
                cells[i][(j + 1) % num_cells].left_open = false;
            }
            if (cells[i][j].bottom < percolation_probability) {
                cells[i][j].bottom_open = true;
                cells[(i + 1) % num_cells][j].top_open = true;
            }
            else {
                cells[i][j].bottom_open = false;
                cells[(i + 1) % num_cells][j].top_open = false;
            }
        }
    }

    let num_open_gates = 0;
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            if (cells[i][j].right_open) {
                num_open_gates++;
            }
            if (cells[i][j].bottom_open) {
                num_open_gates++;
            }
        }
    }
    console.log(num_open_gates / (2 * num_cells * num_cells));
}