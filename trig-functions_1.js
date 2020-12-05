let screen_width = window.innerWidth, screen_height = window.innerHeight;
console.log("Screen width and height:", screen_width, screen_height);
let canvas_1 = document.getElementById("sine-cosine");
let context = canvas_1.getContext("2d");
let slider_1 = document.getElementById("slider-1");
let angle_1 = document.getElementById("angle-1");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
    console.log("Mobile detected");
} else {
    mobile = false;
    console.log("Desktop detected");
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.5 * screen_width;
}
canvas_height = canvas_width / 1.6;

canvas_1.width = canvas_width;
canvas_1.height = canvas_height;
console.log("Canvas width and height:", canvas_1.width, canvas_1.height);

function drawRaw() {
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(5, canvas_height/2);
    context.lineTo(canvas_width-5, canvas_height/2);
    context.stroke();

    context.beginPath();
    context.moveTo(canvas_width / 2, 5);
    context.lineTo(canvas_width / 2, canvas_height - 5);
    context.stroke();

    context.beginPath();
    context.arc(canvas_width / 2, canvas_height / 2, canvas_height / 3, 0, 2 * Math.PI);
    context.stroke();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw();
}

function update_1() {
    angle_1.innerHTML = `&theta; = ${slider_1.value}`;
}

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    slider_1.value = 30;
    update_1();
    animate(step);
}

function step() {
    render();
    animate(step);
};