let num_points, coord_gap, extension_index;
let points;
let isTransforming;
let transforming_steps, reci, step_no;
let a, b, c, d;
let x, y, x_step, y_step;

function update() {
    if (isTransforming) {
        if (step_no < transforming_steps) {
            step_no++;

            for (let point of points) {
                point.x += point.x_step;
                point.y += point.y_step;
            }
            x += x_step;
            y += y_step;
        }
        else {
            isTransforming = false;
        }
    }
}

function transform() {
    updateMatrix();
    console.log("Transforming: ", a, b, c, d);
    isTransforming = true;
    step_no = 0;

    for (let point of points) {
        point.x_step = reci * (a * point.x + b * point.y - point.x);
        point.y_step = reci * (c * point.x + d * point.y - point.y)
    }

    x_step = reci * (a * x + b * y - x);
    y_step = reci * (c * x + d * y - y);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.lineWidth = "2";
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(0, y_origin);
    context.lineTo(canvas_width, y_origin);
    context.stroke();

    context.beginPath();
    context.moveTo(x_origin, 0);
    context.lineTo(x_origin, canvas_height);
    context.stroke();

    context.fillStyle = "#ffffff";
    for (let point of points) {
        context.fillRect(x_origin + point.x, y_origin - point.y, 2, 2);
    }

    context.strokeStyle = "#ffff00";
    context.beginPath();
    context.moveTo(x_origin, y_origin);
    context.lineTo(x_origin + x, y_origin - y);
    context.stroke();
}

function updateParams(variable) {

}

function initParams() {
    num_points = 10;
    extension_index = 1;
    coord_gap = 2;

    x_coords = [];
    y_coords = [];
    points = [];

    transforming_steps = 64;
    reci = 1 / transforming_steps;

    input_x = 1;
    input_y = 0;
    x_step = 0;
    y_step = 0;

    r_input.value = 120;
    rotate(r_input.value);
    updateTextFields(4);

    assignCoords();
    transform();
}

function assignCoords() {
    let gap, length;

    length = (canvas_width > canvas_height) ? canvas_width : canvas_height;
    gap = Math.ceil(length / num_points);

    for (let x = 0; x < extension_index * length; x += gap) {
        for (let y = -extension_index * length; y < extension_index * length; y += coord_gap) {
            points.push(
                {
                    x: x,
                    y: y,
                    x_step: 0,
                    y_step: 0,
                }
            );
        }
    }
    for (let x = -gap; x > -extension_index * length; x -= gap) {
        for (let y = -extension_index * length; y < extension_index * length; y += coord_gap) {
            points.push(
                {
                    x: x,
                    y: y,
                    x_step: 0,
                    y_step: 0,
                }
            );
        }
    }
    for (let y = 0; y < extension_index * length; y += gap) {
        for (let x = -extension_index * length; x < extension_index * length; x += coord_gap) {
            points.push(
                {
                    x: x,
                    y: y,
                    x_step: 0,
                    y_step: 0,
                }
            );
        }
    }
    for (let y = -gap; y > -extension_index * length; y -= gap) {
        for (let x = -extension_index * length; x < extension_index * length; x += coord_gap) {
            points.push(
                {
                    x: x,
                    y: y,
                    x_step: 0,
                    y_step: 0,
                }
            );
        }
    }
    x = input_x * gap;
    y = input_y * gap;
}

function reset() {
    points = [];

    x_step = y_step = 0;
    assignCoords();
    render();
}

function clearValues() {
    identity();
    updateTextFields(0);
}

function updateMatrix() {
    a = Number.parseFloat(a_input.value);
    b = Number.parseFloat(b_input.value);
    c = Number.parseFloat(c_input.value);
    d = Number.parseFloat(d_input.value);
}

function updateTextFields(prec = 4) {
    a_input.value = a.toFixed(prec);
    b_input.value = b.toFixed(prec);
    c_input.value = c.toFixed(prec);
    d_input.value = d.toFixed(prec);
}

function checkAngle() {
    let angle = Number.parseFloat(r_input.value)
    if (angle !== undefined && r_input.value != "") {
        rotate(Number.parseFloat(r_input.value));
        updateTextFields(4);
    }
}

function zero_det() {
    a = 1;
    b = 2;
    c = 2;
    d = 4;
    updateTextFields();
    transform();
    window.scrollTo(0, 100);
}

function invert() {
    let det = a * d - b * c;
    let new_a, new_b, new_c, new_d;

    if (det) {
        new_a = d / det;
        new_b = -b / det;
        new_c = -c / det;
        new_d = a / det;

        a = new_a;
        b = new_b;
        c = new_c;
        d = new_d;

        updateTextFields();
        transform();
        window.scrollTo(0, 100);
    }
}

function step() {
    update();
    if (isTransforming) {
        render();
    }
    animate(step);
}

function rotate(angle) {
    a = Math.cos(radian(angle));
    b = -Math.sin(radian(angle));
    c = -b;
    d = a;
}

function scale(scalar) {
    a = d = scalar;
    b = c = 0;
}

function identity() {
    a = d = 1;
    b = c = 0;
    r_input.value = 0;
}

function radian(degree) {
    return (degree * Math.PI / 180);
}