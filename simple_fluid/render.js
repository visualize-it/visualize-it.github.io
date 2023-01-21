function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    if (show_density) {
        drawDensities();
    }
    else {
        drawPressure();
    }

    if (show_vel) {
        drawVelocities();
    }
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
    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            let color = Math.round(255 * density[i][j]);
            context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
            context.fillRect((i - 1) * cell_length, (j - 1) * cell_length, cell_length, cell_length);
        }
    }
}

function drawVelocities() {
    context.fillStyle = "#ffffff";
    context.lineWidth = 2;

    let angle;
    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            if (vel_x[i][j] == 0 && vel_y[i][j] == 0) {
                context.fillRect((i - 1) * cell_length + cell_length / 2, (j - 1) * cell_length + cell_length / 2, 1, 1);
            }
            else {
                angle = Math.atan2(vel_y[i][j], vel_x[i][j]) + Math.PI;
                context.strokeStyle = `hsl(${Math.floor(360 * angle / (2 * Math.PI))}, 100%, 50%)`
                
                context.beginPath();
                context.moveTo((i - 1) * cell_length + cell_length / 2, (j - 1) * cell_length + cell_length / 2);
                context.lineTo((i - 1) * cell_length + cell_length / 2 + vel_x[i][j] * cell_length, (j - 1) * cell_length + cell_length / 2 + vel_y[i][j] * cell_length);
                context.stroke();
            }
        }
    }
}

function drawPressure() {
    let max_pressure = 1e-12;
    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            max_pressure = Math.max(max_pressure, pressure[i][j]);
        }
    }

    for (let i = 1; i < num_cells + 1; i++) {
        for (let j = 1; j < num_cells + 1; j++) {
            let color = Math.floor(1 + 359 * pressure[i][j] / max_pressure);
            context.fillStyle = `hsl(${color}, 100%, 50%)`;
            context.fillRect((i - 1) * cell_length, (j - 1) * cell_length, cell_length, cell_length);
        }
    }
}