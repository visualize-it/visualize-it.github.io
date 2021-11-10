function clicked() {

}

function moved() {

}

function released() {

}

function keyPressed(key) {
    if (key == 80) {
        pauseToggle();
    }
    else if (key == 71) {
        gridToggle();
    }
}

function keyReleased(key) {

}

function addNucleus(number = 1) {
    let passed;
    for (let i = 0; i < number; i++) {
        passed = false
        while (!passed) {
            passed = true;
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            for (let nucleus of nuclei) {
                distance = distanceBetweenCoordAndNucleus(x, y, nucleus);
                if (distance <= exclusion_radius) {
                    passed = false;
                    break;
                }
            }
        }
        nuclei.push(new Nucleus(x, y, 1, 1, 100));
    }
    updateAtomic();
}

function removeNucleus(number = 1) {
    let removed = 0;
    while(nuclei.length > 0 && removed < number) {
        nuclei.pop();
        removed++;
    }
    updateAtomic();
}

function pauseToggle() {
    if (paused) {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
    else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}

function restart() {
    updateParams("n");

    makeGrid();
    makeScene();

    z_display.innerHTML = "";
    temp_display.innerHTML = "";
}

function gridToggle() {
    show_grid = !show_grid;
}