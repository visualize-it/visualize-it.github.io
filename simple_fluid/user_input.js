function checkUserInput() {
    console.log(pressed);

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

    if (mobile) {
        for (let i = 0; i < num_cells; i++) {
            for (let j = 0; j < num_cells; j++) {
                source[i][j] = 0;
                focal_i = undefined;
                focal_j = undefined;
                pressed = false;
            }
        }
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}