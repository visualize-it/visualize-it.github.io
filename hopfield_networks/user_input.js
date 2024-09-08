function clicked() {

}

function moved() {
    let row, col;
    if (pressed) {
        row = Math.floor(click_y / cell_length);
        col = Math.floor(click_x / cell_length);
        grid[row][col] = 1;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (row + i >= 0 && row + i < num_cells && col + j >= 0 && col + j < num_cells) {
                    grid[row + i][col + j] = 1;
                }
            }
        }
    }
}

function released() {

}

function keyPressed(key) {

}

function keyReleased(key) {
    
}