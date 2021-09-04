let control_points = [];
let render_points = [];
let selected_point;

let num_default, num_points;

let point_radius, prec, num_inter;

let click_x, click_y;
let selected;
let leeway;

// states
let interpolated;

function update() {
    if (!interpolated) {
        render_points = [];

        if (num_points > 1) {
            let old_points = [], new_points = [];

            for (let i = 0; i < 1; i += prec) {
                old_points = control_points;

                for (let level = old_points.length - 1; level > 0; level--) {
                    new_points = [];
                    for (let index = 1; index < old_points.length; index++) {
                        new_points.push({
                            x: (1 - i) * old_points[index - 1].x + i * old_points[index].x,
                            y: (1 - i) * old_points[index - 1].y + i * old_points[index].y
                        });
                    }
                    old_points = new_points;
                }

                render_points.push({
                    x: new_points[0].x,
                    y: new_points[0].y
                });
            }
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

    if (num_points > 1) {
        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(render_points[0].x, render_points[0].y);
        for (let i = 1; i < render_points.length; i++) {
            context.lineTo(render_points[i].x, render_points[i].y);
        }
        context.stroke();
    }
}

function updateParams(variable) {
    if (variable == "x") {
        control_points[selected_point].x = click_x;
        interpolated = false;
    }
    if (variable == "y") {
        control_points[selected_point].y = canvas_height - y_input.value;
        interpolated = false;
    }
    if (variable == "pointer") {
        control_points[selected_point].x = click_x;
        control_points[selected_point].y = click_y;
        interpolated = false;
    }
}

function updateSelected() {
    for (let point of control_points) {
        point.selected = false;
    }
    if (selected) {
        control_points[selected_point].selected = true;
    }
}

function initParams() {
    control_points = [];
    point_radius = 6;
    num_inter = 100;
    prec = 1 / num_inter;

    interpolated = false;
    selected = false;

    if (mobile) {
        leeway = 12;
    }
    else {
        leeway = 5;
    }

    setPattern("treble");
}

function getHue(number) {
    return Math.floor(number * 255 / num_inter);
}

function addPoint() {
    if (num_points == 0) {
        control_points.push(new Point("#ff0000"));
    }
    else if (num_points == 1) {
        control_points.push(new Point("#0000ff"));
    }
    else if (num_points > 1) {
        let temp_point = control_points.pop();
        control_points.push(new Point("#00ff00"));
        control_points.push(temp_point);
    }
    num_points++;
    interpolated = false;
}

function clearPoints() {
    control_points = [];
    num_points = 0;
    interpolated = false;
}

function removePoint() {
    if(num_points > 0) {
        control_points.pop();
        if(num_points > 2) {
            control_points[control_points.length - 1].color = "#0000ff";
        }
        num_points--;
        interpolated = false;
    }
}

function printRelativeCoords() {
    for(let point of control_points) {
        console.log(`pushPoint(${(point.x/canvas_width).toFixed(4)}, ${(point.y/canvas_height).toFixed(4)})`);
    }
}