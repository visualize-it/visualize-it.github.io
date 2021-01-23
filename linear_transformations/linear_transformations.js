let num_points, coord_gap, extension_index;
let points;
let isTransforming;
let transforming_steps, reci, step_no;
let a,b,c,d

function update() {
    if(isTransforming) {
        if(step_no < transforming_steps) {
            step_no++;

            for(let point of points) {
                point.x += point.x_step;
                point.y += point.y_step;
            }
        }
        else {
            isTransforming = false;
        }
    }
}

function evaluate() {
    isTransforming = true;
    step_no = 0;

    for(let point of points) {
        point.x_step = reci * (a * point.x + b * point.y - point.x);
        point.y_step = reci * (c * point.x + d * point.y - point.y)
    }
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
    for(let point of points) {
        context.fillRect(x_origin + point.x, y_origin - point.y, 1, 1);
    }
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

    rotate(90);
    console.log(a, b, c, d);

    isTransforming = false;
    assignCoords();
    evaluate();
}

function assignCoords() {
    let gap, length;

    length = (canvas_width > canvas_height) ? canvas_width : canvas_height;
    gap = Math.ceil(length / num_points);

    for(let x = 0; x < extension_index * length; x += gap) {
        for(let y = -extension_index * length; y < extension_index * length; y += coord_gap) {
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
    for(let x = -gap; x > -extension_index * length; x -= gap) {
        for(let y = -extension_index * length; y < extension_index * length; y += coord_gap) {
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
    for(let y = 0; y < extension_index * length; y += gap) {
        for(let x = -extension_index * length; x < extension_index * length; x += coord_gap) {
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
    for(let y = -gap; y > -extension_index * length; y -= gap) {
        for(let x = -extension_index * length; x < extension_index * length; x += coord_gap) {
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
}

function step() {
    update();
    if(isTransforming) {
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

function radian(degree) {
    return (degree * Math.PI / 180);
}