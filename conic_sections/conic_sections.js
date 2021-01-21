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

            if(Math.abs(e) < 1) {
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
            else if(Math.abs(transformX(x)) < 2 * canvas_width && Math.abs(transformY(y)) < 2 * canvas_height) {
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
        }
        else {
            isDrawing = false;
            angle = 0;
            checkScaling();
        }
    }

    if (isScaling) {
        if (scale > scale_req) {
            scale *= 0.99;

            for (let point of points) {
                point.x = ((point.x - origin) * 0.99) + origin;
                point.y = origin - ((point.y - origin) * 0.99);
            }
        }
        else {
            console.log("Scaling done");

            isScaling = false;
            x_def = origin;
            y_def = origin;
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(origin, 0);
    context.lineTo(origin, canvas_width);
    context.stroke();

    context.beginPath();
    context.moveTo(0, origin);
    context.lineTo(canvas_height, origin);
    context.stroke();

    if (isDrawing) {
        context.beginPath();
        context.moveTo(origin, origin);
        context.lineTo(x, y);
        context.stroke();
    }

    context.fillStyle = "#ffffff";
    for (let point of points) {
        context.fillRect(point.x, point.y, 2, 2);
    }
}

function updateParams(variable) {

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
}

function checkScaling() {
    console.log(origin, x_def, y_def);
    if (x_def > origin || y_def > origin) {

        console.log("Rescaling required");

        if (x_def > y_def) {
            scale_req = canvas_width / (2.1 * x_def);
        }
        else {
            scale_req = canvas_height / (2.1 * y_def);
        }

        console.log(scale, scale_req);
        isScaling = true;
    }
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

function closeToInf(theta) {
    return (theta > 1.48 && theta < 1.66);
}
