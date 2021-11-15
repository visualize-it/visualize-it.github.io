let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 20;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d", { alpha: false });

let play_button = document.getElementById("play-button");
let fps_display = document.getElementById("fps-display");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.45 * screen_width;
}
canvas_height = canvas_width / 1.46;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    coloring_scheme = 1;
    downloading = false;
    initParams();
    animate(step);
}

function step() {
    update();
    animate(step);
}

function toggleAnimation() {
    if(animating) {
        animating = false;
        fps_display.style.display = "none";
        play_button.innerHTML = "Start";
    }
    else {
        animating = true;
        fps_display.style.display = "block";
        play_button.innerHTML = "Stop";
    }
}

function left() {
    center_x -= 0.05 * 2 * half_width / scale;
    render();
    animating = false;
    fps_display.style.display = "none";
}

function right() {
    center_x += 0.05 * 2 * half_width / scale;
    render();
    animating = false;
    fps_display.style.display = "none";
}

function up() {
    center_y -= 0.05 * 2 * half_height / scale;
    render();
    animating = false;
    fps_display.style.display = "none";
}

function down() {
    center_y += 0.05 * 2 * half_height / scale;
    render();
    animating = false;
    fps_display.style.display = "none";
}

function zoomIn() {
    scale *= 1.1
    render();
}

function zoomOut() {
    scale /= 1.1
    render();
}
