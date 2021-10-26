function clicked() {
    disturbance_position = canvas_height / 2 - click_y;
    drawing = false;
    if(mobile) {
        disableScroll();
    }
}

function moved() {
    if(pressed) {
        disturbance_position = canvas_height / 2 - click_y;
    }
}

function released() {
    if(mobile) {
        enableScroll();
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}