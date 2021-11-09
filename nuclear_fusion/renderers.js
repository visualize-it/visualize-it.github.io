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
            if (grid[row][col] > 0) {
                red_value = Math.floor(255 * grid[row][col]);
                context.fillStyle = `rgb(${red_value}, 20, 20)`;
                context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
            }
        }
    }
}