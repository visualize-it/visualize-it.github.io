function zoomIn() {
    scale++;
}

function zoomOut() {
    scale--;

    if (scale < 1) {
        scale = 1;
    }
}

function restart() {
    points = [];
    x = 0.01;
    y = 0;
    z = 0;
    hue_start = Math.random() * 255;

    updateParams("rho");
    updateParams("sigma");
    updateParams("beta");
}