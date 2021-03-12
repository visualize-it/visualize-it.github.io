let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 16;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d", { alpha: false });

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.5 * screen_width;
}
canvas_height = canvas_width / 1.46;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = function (callback) {
    window.setTimeout(callback, 1000 / fps);
};

window.onload = function () {
    initParams();
    animate(step);
}

function step() {
    update();
    animate(step);
}

function toggleAnimation() {
    animating = animating ? false : true;
}

function left() {
    center_x -= 0.05 * 2 * half_width / scale;
    generate();
    animating = false;
}

function right() {
    center_x += 0.05 * 2 * half_width / scale;
    generate();
    animating = false;
}

function up() {
    center_y -= 0.05 * 2 * half_height / scale;
    generate();
    animating = false;
}

function down() {
    center_y += 0.05 * 2 * half_height / scale;
    generate();
    animating = false;
}

function zoomIn() {
    scale *= 1.1
    generate();
}

function zoomOut() {
    scale /= 1.1
    generate();
}
