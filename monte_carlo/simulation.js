let num_points, num_inside;

let pi;

let point_radius;

let radius_squared;

let started;

function update() {
    if (started) {
        let x, y;
        x = Math.random() * canvas_width;
        y = Math.random() * canvas_height;

        if (Math.pow(x - canvas_width / 2, 2) + Math.pow(y - canvas_height / 2, 2) < radius_squared) {
            num_inside++;
            context.fillStyle = "#ff0000";
        }
        else {
            context.fillStyle = "#0000ff";
        }
        context.beginPath();
        context.arc(x, y, point_radius, 0, 2 * Math.PI);
        context.fill();
        num_points++;

        pi = 4 * num_inside / num_points;
        num_points_display.innerHTML = `Total number of points: ${num_points}`;
        num_inside_display.innerHTML = `Number of points inside the circle: ${num_inside}`;
        pi_estimate_display.innerHTML = `Estimated value of pi: ${pi.toFixed(6)}`;``
    }
}

function clearCanvas() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(canvas_width / 2, canvas_height / 2, canvas_width / 2, 0, 2 * Math.PI);
    context.stroke();
}

function distanceFromCenter(x, y) {
    return ;
}

function updateParams(variable) {

}

function initParams() {
    num_points = 0;
    num_inside = 0;
    started = true;

    radius_squared = Math.pow(canvas_width / 2, 2);

    if (mobile) {
        point_radius = 2;
    }
    else {
        point_radius = 3;
    }

    clearCanvas();
}