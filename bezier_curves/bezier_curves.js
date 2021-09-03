let control_points = [];
let render_points = [];
let selected_point;

let point_radius, prec;

let click_x, click_y;
let selected;
let leeway;

// states
let interpolated;

function update() {
    if (!interpolated) {
        render_points = [];

        // control points
        let p1 = control_points[0];
        let p2 = control_points[1];
        let p3 = control_points[2];
        let p4 = control_points[3];

        // first level
        let a_x, a_y;
        let b_x, b_y;
        let c_x, c_y;

        // second level
        let d_x, d_y;
        let e_x, e_y;

        // point
        let p_x, p_y;
        for (let i = 0; i < 1; i += prec) {
            a_x = (1 - i) * p1.x + i * p2.x;
            a_y = (1 - i) * p1.y + i * p2.y;

            b_x = (1 - i) * p2.x + i * p3.x;
            b_y = (1 - i) * p2.y + i * p3.y;

            c_x = (1 - i) * p3.x + i * p4.x;
            c_y = (1 - i) * p3.y + i * p4.y;

            d_x = (1 - i) * a_x + i * b_x;
            d_y = (1 - i) * a_y + i * b_y;

            e_x = (1 - i) * b_x + i * c_x;
            e_y = (1 - i) * b_y + i * c_y;

            p_x = (1 - i) * d_x + i * e_x;
            p_y = (1 - i) * d_y + i * e_y;

            render_points.push({
                x: p_x,
                y: p_y
            });
        }
        interpolated = true;
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let point of control_points) {
        point.render();
    }

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(render_points[0].x, render_points[0].y);
    for (let i = 1; i < render_points.length; i++) {
        context.lineTo(render_points[i].x, render_points[i].y);
    }
    context.stroke();
}

function updateParams(variable) {
    if(variable == "x") {
        control_points[selected_point].x = click_x;
        interpolated = false;
    }
    if(variable == "y") {
        control_points[selected_point].y = canvas_height - y_input.value;
        interpolated = false;
    }
    if(variable == "pointer") {
        control_points[selected_point].x = click_x;
        control_points[selected_point].y = click_y;
        interpolated = false;
    }
}

function updateSelected() {
    for(let point of control_points) {
        point.selected = false;
    }
    if(selected) {
        control_points[selected_point].selected = true;
    }
}

function initParams() {
    control_points = [];
    point_radius = 6;
    prec = 0.01;
    interpolated = false;
    selected = false;

    if(mobile) {
        leeway = 12;
    }
    else {
        leeway = 5;
    }

    control_points.push(new Point("#ff0000"));
    control_points.push(new Point("#00ff00"));
    control_points.push(new Point("#0000ff"));
    control_points.push(new Point("#ffa500"));
}