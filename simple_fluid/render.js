function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawDensities();
    drawVelocities();
}

function drawGrid() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;

    for (let i = 0; i < num_cells; i++) {
        context.beginPath();
        context.moveTo(0, i * cell_length);
        context.lineTo(canvas_width, i * cell_length);
        context.stroke();
    }

    for (let i = 0; i < num_cells; i++) {
        context.beginPath();
        context.moveTo(i * cell_length, 0);
        context.lineTo(i * cell_length, canvas_height);
        context.stroke();
    }
}

function drawDensities() {
    let max_density = 0;
    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            if (density[i][j] > max_density) {
                max_density = density[i][j];
            }
        }
    }

    if (max_density != 0) {
        for (let i = 1; i < num_cells + 1; i++) {
            for (let j = 1; j < num_cells + 1; j++) {
                let color = Math.round(255 * density[i][j] / max_density);
                context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
                context.fillRect((i - 1) * cell_length, (j - 1) * cell_length, cell_length, cell_length);
            }
        }
    }
}

function drawVelocities() {
    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            context.strokeStyle = "#0000ff";
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo((i - 1) * cell_length + cell_length / 2, (j - 1) * cell_length + cell_length / 2);
            context.lineTo((i - 1) * cell_length + cell_length / 2 + vel_x[i][j] * cell_length, (j - 1) * cell_length + cell_length / 2 + vel_y[i][j] * cell_length);
            context.stroke();
        }
    }
}