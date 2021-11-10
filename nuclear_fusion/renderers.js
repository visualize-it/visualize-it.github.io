function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawHeatMap();
    if (show_grid) {
        drawGrid();
    }

    for (let nucleus of nuclei) {
        nucleus.render();
    }

    for(let fusion_event of fusion_events) {
        fusion_event.render();
    }
}

function drawGrid() {
    context.strokeStyle = "#aaaaaa";
    for (let row = 0; row < num_rows; row++) {
        context.beginPath();
        context.moveTo(0, row * cell_length);
        context.lineTo(canvas_width, row * cell_length);
        context.stroke();
    }
    for (let col = 0; col < num_cols; col++) {
        context.beginPath();
        context.moveTo(col * cell_length, 0);
        context.lineTo(col * cell_length, canvas_height);
        context.stroke();
    }
}

function drawHeatMap() {
    let red_value;
    for (let row = 0; row < num_rows; row++) {
        for (let col = 0; col < num_cols; col++) {
            // I don't know why but this particular formula gives nice results
            red_value = 64 * Math.floor(64 * grid[row][col]);
            context.fillStyle = `rgb(${red_value}, 0, 0)`;
            context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        }
    }
}