let angle = 30;
let init_speed = 50;
let cannon_length = 30;
let ball_x = 20;
let ball_y = 0;

function drawRaw() {

    context.strokeStyle = "#ffffff";
    context.fillStyle = "#ffffff";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(20, canvas_height - 20, 10, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.moveTo(15, canvas_height - 25);
    context.lineTo(15 + cannon_length * Math.cos(toRadian(angle)), canvas_height - 25 - cannon_length * Math.sin(toRadian(angle)));
    context.lineTo(25 + cannon_length * Math.cos(toRadian(angle)), canvas_height - 17 - cannon_length * Math.sin(toRadian(angle)));
    context.lineTo(25, canvas_height - 17);
    context.lineTo(15, canvas_height - 25);
    context.closePath();
    context.fill();
}

function update_params(input) {
    if(input == "angle-slide") {
        angle = angle_slider.value;
        angle_display.innerHTML = `&theta; = ${angle} degrees`;
    }
    else if(input =="speed-slide") {
        init_speed = speed_slider.value;
        speed_display.innerHTML = `u = ${init_speed} units`;
    }
}

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw();
}

function initParams() {
    angle_slider.value = angle;
    update_params('angle-slide');

    speed_slider.value = init_speed;
    update_params('speed-slide');
}

window.onload = function () {
    initParams();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
};