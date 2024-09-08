function clicked() {

}

function moved() {
    let row, col;
    if (pressed) {
        row = Math.floor(click_y / cell_length);
        col = Math.floor(click_x / cell_length);
        if (!already_toggled[row][col]) {
            grid[row][col] *= -1;
            already_toggled[row][col] = true;
        }
    }
}

function released() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            already_toggled[i][j] = false;
        }
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}