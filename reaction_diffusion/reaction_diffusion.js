let grid = [];

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);
}

function updateParams(variable) {

}

function initParams() {
    grid = new2dArray(20, 30);
    console.log(grid);
}