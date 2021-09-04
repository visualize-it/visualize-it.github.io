let points = [];
let x, y, angle;

let center_x, center_y;
let scale;
let displacement, angular_velocity, angular_acceleration, angular_jerk;

function update() {

    x += displacement * Math.cos(angle);
    y += displacement * Math.sin(angle);
    angular_acceleration += angular_jerk;
    angular_velocity += angular_acceleration;
    angle += angular_velocity;

    points.push({
        x: x,
        y: y
    });
    console.log(points);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.lineWidth = 2;
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(center_x, center_y);
    for(let point of points) {
        context.lineTo(center_x + point.x * scale, center_y + point.y * scale);
    }
    context.stroke();
}

function updateParams(variable) {

}

function initParams() {
    points = [];
    displacement = 1;
    angular_velocity = toRadian(10);
    angular_acceleration = toRadian(1);
    angular_jerk = toRadian(0.01);

    center_x = canvas_width / 2;
    center_y = canvas_height / 2;
    scale = 5;

    x = 0;
    y = 0;
    angle = 0;
}