let r, l, e, x, y;
let x_def, y_def;
let isDrawing, angle, angle_step;
let scale, scale_req, scale_step;
let points;

function update() {
    if (isDrawing) {
        if (angle < 2 * Math.PI) {
            angle += angle_step;

            r = l / (1 + e * Math.cos(angle));
            x = cartesianX(r, angle);
            y = cartesianY(r, angle);

            if (canDraw(e, x, y)) {
                drawPoint();
            }
        }
        else {
            isDrawing = false;
            angle = 0;
            if (!checkScaling()) {
                enableDrawButtons();
                render();
            }
        }
    }

    if (isScaling) {
        if (scale > scale_req) {
            scale *= 0.99;

            for (let point of points) {
                point.x = ((point.x - origin) * 0.99) + origin;
                point.y = origin - ((point.y - origin) * 0.99);
            }
            displayScale();
        }
        else {
            isScaling = false;
            enableDrawButtons();
            x_def = origin;
            y_def = origin;
            render();
        }
    }
}

function drawPoint() {
    if (Math.abs(x) > origin) {
        if (Math.abs(x) > x_def) {
            x_def = Math.abs(x);
        }
    }
    if (Math.abs(y) > origin) {
        if (Math.abs(y) > y_def) {
            y_def = Math.abs(y);
        }
    }
    x = transformX(x);
    y = transformY(y);

    points.push(
        {
            x: x,
            y: y,
        }
    );
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    // context.strokeStyle = "#ffffff";
    // context.beginPath();
    // context.moveTo(origin, 0);
    // context.lineTo(origin, canvas_width);
    // context.stroke();

    // context.beginPath();
    // context.moveTo(0, origin);
    // context.lineTo(canvas_height, origin);
    // context.stroke();

    context.fillStyle = "#ffffff";
    if (isDrawing) {
        context.beginPath();
        context.moveTo(origin, origin);
        context.lineTo(x, y);
        context.stroke();

        context.fillText("Drawing...", 0, 30);
    }

    if (isScaling) {
        context.fillText("Rescaling...", 0, 30);
    }

    // context.strokeStyle = "#ffffff"
    // context.beginPath();
    // context.moveTo(points[0].x, points[0].y);
    // for (let i = 1; i < points.length; i++) {
    //     context.lineTo(points[i].x, points[i].y);
    // }
    // context.stroke();

    context.fillStyle = "#ffffff";
    for(let point of points) {
        context.fillRect(point.x, point.y, 3, 3);
    }
}

function step() {
    update();
    if (isDrawing || isScaling) {
        render();
    }
    animate(step);
}

function updateParams(variable) {
    if (variable == 'l') {
        l = Number.parseFloat(input_l.value);
    }
    if (variable == 'e') {
        e = Number.parseFloat(input_e.value);
    }
}

function initParams() {
    r = 0;
    l = 50;
    e = 0.9;

    x_def = origin;
    y_def = origin;

    angle = 0;
    angle_step = 0.03;
    points = [];

    isDrawing = true;
    isScaling = false;
    scale = 1;
    displayScale();

    disableDrawButtons();
    input_l.value = 50;
    input_e.value = 0.9;

    if (!mobile) {
        context.font = "30px Arial";
    }
    else {
        context.font = "20px Arial";
    }
    context.textAlign = "left";
}

function checkScaling() {
    console.log(x_def, y_def, origin);
    if (x_def > origin || y_def > origin) {
        if (x_def > y_def) {
            scale_req = (scale * canvas_width) / (2.1 * x_def);
        }
        else {
            scale_req = (scale * canvas_height) / (2.1 * y_def);
        }
        isScaling = true;
        return true;
    }
    return false;
}

function drawConic() {
    isDrawing = true;
    angle = 0;
    disableDrawButtons();
}

function drawExample(conic) {
    if (conic == "circle") {
        l = canvas_width / (3 * scale);
        e = 0;
    }
    if (conic == "ellipse") {
        l = canvas_width / (4 * scale);
        e = 0.9;
    }
    if (conic == "parabola") {
        l = 50 / scale;
        e = 1
    }
    if (conic == "hyperbola") {
        l = 50 / scale;
        e = 1.1
    }
    updateText();
    window.scrollTo(0, 100);
    drawConic();
}

function clearPoints() {
    points = [];
    scale = 1;
    isDrawing = false;
    isScaling = false;
    enableDrawButtons();
    displayScale();
    render();
}

function updateText() {
    input_l.value = `${l.toFixed()}`;
    input_e.value = `${e.toFixed()}`;
}

function enableDrawButtons() {
    draw_button.disabled = false;
    circle_button.disabled = false;
    ellipse_button.disabled = false;
    parabola_button.disabled = false;
    hyperbola_button.disabled = false;
}

function disableDrawButtons() {
    draw_button.disabled = true;
    circle_button.disabled = true;
    ellipse_button.disabled = true;
    parabola_button.disabled = true;
    hyperbola_button.disabled = true;
}

function displayScale() {
    scale_display.innerHTML = `Scale: 1 pixel = ${scale.toFixed(2)} length units`;
}

function cartesianX(r, theta) {
    return (scale * r * Math.cos(theta));
}

function cartesianY(r, theta) {
    return (scale * r * Math.sin(theta));
}

function transformX(x) {
    return origin + x;
}

function transformY(y) {
    return origin - y;
}

function canDraw(e, x, y) {
    return (Math.abs(e) < 1 || (Math.abs(transformX(x)) < 2 * canvas_width && Math.abs(transformY(y)) < 2 * canvas_height))
}
