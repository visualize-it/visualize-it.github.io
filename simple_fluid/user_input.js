function checkUserInput() {
    if (pressed) {
        if (focal_i !== undefined && focal_j !== undefined && source[focal_i][focal_j] !== undefined) {
            source[focal_i][focal_j] = 100 + 100 * Math.random()
        }
    }
    addDensity();
}

function clicked() {
    focal_i = Math.floor(click_x / cell_length);
    focal_j = Math.floor(click_y / cell_length);
}

function moved() {
    if (focal_i !== undefined && focal_j !== undefined && source[focal_i][focal_j] !== undefined) {
        source[focal_i][focal_j] = 0;
    }

    focal_i = Math.floor(click_x / cell_length);
    focal_j = Math.floor(click_y / cell_length);
}

function released() {
    if (focal_i !== undefined && focal_j !== undefined && source[focal_i][focal_j] !== undefined) {
        source[focal_i][focal_j] = 0;
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}