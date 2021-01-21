let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 60;

let canvas = document.getElementById("conic-canvas");
let context = canvas.getContext("2d");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.35 * screen_width;
}
canvas_height = canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

let origin = canvas_width / 2;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function() {
    initParams();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
}