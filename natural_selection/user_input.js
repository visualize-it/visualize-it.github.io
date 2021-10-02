function clicked() {
    for(let movable of movables) {
        if(movable.clicked()) {
            movable.select();
        }
    }
}

function moved() {
    for(let movable of movables) {
        if(movable.selected) {
            movable.update();
        }
    }
}

function released() {
    for(let movable of movables) {
        if(movable.selected) {
            movable.release();
        }
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}