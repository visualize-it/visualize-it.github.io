let grid = [];
let grid_size, cell_length;


function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == 0) {
                context.fillStyle = "#00ff00";
            }
            else if (grid[row][col] == 1) {
                context.fillStyle = "#0000ff";
            }
            else {
                context.fillStyle = "#ff0000";
            }
            context.fillRect(col * cell_length, row * cell_length, cell_length, cell_length);
        }
    }
}

function updateParams(variable) {

}

function initParams() {
    grid = [];

    if (mobile) {
        grid_size = 70;
    }
    else {
        grid_size = 100;
    }

    cell_length = canvas_width / grid_size;

    let new_row;
    for (let row = 0; row < grid_size; row++) {
        new_row = [];
        for (let col = 0; col < grid_size; col++) {
            new_row.push(Math.floor(Math.random() * 3));
        }
        grid.push(new_row);
    }

    console.log(grid);
}