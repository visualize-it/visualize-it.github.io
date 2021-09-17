function clicked() {
    let row_num = Math.floor(click_y / square_length);
    let col_num = Math.floor(click_x / square_length);

    grid[row_num][col_num] = (grid[row_num][col_num] == 1) ? 0 : 1;
}

function moved() {

}

function released() {

}

function keyPressed(key) {

}

function keyReleased(key) {
    
}