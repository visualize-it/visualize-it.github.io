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

function fusionEffect() {
    console.log("Fusion!");
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(fusion_x, fusion_y, fusion_radius * fusion_radius, 0, 2 * Math.PI, false);
    context.fill();
    console.log(fusion_x, fusion_y, fusion_radius * fusion_radius);
}

function getRedValue(temperature) {
    if(temperature == 0) {
        return 0;
    }
    else if(temperature > 0.5) {
        return 255;
    }
    else if(temperature > 0.3) {
        return 128;
    }
}