let num_cells = 50;
let cell_length;

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawGrid();
}

function updateParams(variable) {

}

function initParams() {
    cell_length = Math.ceil(canvas_width / num_cells);
}

function drawGrid() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;

    for (let i = 0; i < num_cells; i++) {
        context.beginPath();
        context.moveTo(i * cell_length, 0);
        context.lineTo(i * cell_length, canvas_height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, i * cell_length);
        context.lineTo(canvas_width, i * cell_length);
        context.stroke();
    }
}