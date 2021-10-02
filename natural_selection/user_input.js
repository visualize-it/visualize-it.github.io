function clicked() {
    for(let movable of movables) {
        if(movable.clicked()) {
            movable.select();
            break;
        }
    }
    if(mobile) {
        disableScroll();
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
    if(mobile) {
        enableScroll();
    }
}

function keyPressed(key) {

}

function keyReleased(key) {
    
}