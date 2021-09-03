let balls = [];

let circle_radius, ball_radius;
let g;

function update() {
    for(let ball of balls) {
        ball.update();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.arc(canvas_width / 2, canvas_height / 2, circle_radius, 0, 2 * Math.PI, false);
    context.stroke();

    for(let ball of balls) {
        ball.renderSelf();
    }
}

function updateParams(variable) {

}

function initParams() {
    circle_radius = 0.45 * canvas_width;
    ball_radius = 0.02 * canvas_width;
    g = 1;

    balls.push(new Ball(0, 0, "#ff0000"));
}