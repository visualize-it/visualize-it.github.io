let balls;

let gravity, dt;
let circle_radius, ball_radius;

function update() {
    for(let ball of balls) {
        for(let i = 0; i < 1000; i++) {
            ball.update();
        }
        ball.uploadTrail();
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
        ball.render();
    }
}  

function updateParams(variable) {

}

function initParams() {
    balls = [];
    balls.push(new Ball(0, 0, "#0000ff"));
    // balls.push(new Ball(canvas_width / 2 + 1, canvas_height / 2, "#ff0000"));

    dt = 0.001;
    gravity = -0.2;
    circle_radius = canvas_width / 2.5;
    ball_radius = canvas_width / 25;
}

function calculateEnergy(ball) {
    let kinetic = 0.5 * Math.pow(getMagn(ball.vx, ball.vy), 2);
    let potential = gravity * ball.y;

    console.log("Energy:", kinetic + potential);
}