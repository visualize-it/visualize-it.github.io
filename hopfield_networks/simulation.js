let num_cells, cell_length;
let grid, already_toggled;

function update() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);
}

function render() {
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
    num_cells = 30;
    cell_length = canvas_width / num_cells;

    grid = [];
    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(-1);
        }
        grid.push(new_row);
    }

    already_toggled = [];
    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(false);
        }
        already_toggled.push(new_row);
    }
}