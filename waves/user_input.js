function clicked() {
    disturbance_position = canvas_height / 2 - click_y;
    drawing = false;
}

function moved() {
    if(pressed) {
        disturbance_position = canvas_height / 2 - click_y;
    }
}

function released() {
    
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}