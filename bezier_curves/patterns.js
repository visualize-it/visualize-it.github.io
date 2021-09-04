function setPattern(pattern) {
    control_points = [];
    if(pattern == "treble") {
        pushPoint(241, 387);
        pushPoint(212, 17);
        pushPoint(245, 17);
        pushPoint(172, 52);
        pushPoint(326, 61);
        pushPoint(305, 28);
        pushPoint(323, 105);
        pushPoint(108, 305);
        pushPoint(99, 176);
        pushPoint(87, 237);
        pushPoint(196, 428);
        pushPoint(288, 428);
        pushPoint(326, 243);
        pushPoint(312, 293);
        pushPoint(292, 181);
        pushPoint(207, 249);
    }
    setColors();
    num_points = control_points.length;
}

function pushPoint(new_x, new_y) {
    let new_point = new Point("#00ff00");
    new_point.x = new_x;
    new_point.y = new_y;
    control_points.push(new_point);
}

function setColors() {
    control_points[0].color = "#ff0000";
    control_points[control_points.length - 1].color = "#0000ff";
}