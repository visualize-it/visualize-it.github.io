function setPattern(pattern) {
    control_points = [];
    if (pattern == "treble") {
        pushPoint(0.5230, 0.8398)
        pushPoint(0.4601, 0.0369)
        pushPoint(0.5317, 0.0369)
        pushPoint(0.3733, 0.1128)
        pushPoint(0.7075, 0.1324)
        pushPoint(0.6619, 0.0608)
        pushPoint(0.7010, 0.2279)
        pushPoint(0.2344, 0.6619)
        pushPoint(0.2148, 0.3819)
        pushPoint(0.1888, 0.5143)
        pushPoint(0.4253, 0.9288)
        pushPoint(0.6250, 0.9288)
        pushPoint(0.7075, 0.5273)
        pushPoint(0.6771, 0.6359)
        pushPoint(0.6337, 0.3928)
        pushPoint(0.4492, 0.5404)
    }
    setColors();
    num_points = control_points.length;
}

function pushPoint(new_x, new_y) {
    let new_point = new Point("#00ff00");
    new_point.x = new_x * canvas_width;
    new_point.y = new_y * canvas_height;
    control_points.push(new_point);
}

function setColors() {
    control_points[0].color = "#ff0000";
    control_points[control_points.length - 1].color = "#0000ff";
}