let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;
let font_offset;

let canvas = document.getElementById("sr-canvas");
let context = canvas.getContext("2d");

let speed_slider = document.getElementById("speed-slider");
let speed_display = document.getElementById("speed-display");
let speed_input = document.getElementById("speed-input");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
    font_offset = 9;
}
else {
    mobile = false;
    font_offset = 18;
}

if (mobile) {
    canvas_width = 1 * screen_width;
}
else {
    canvas_width = 0.6 * screen_width;
}
canvas_height = canvas_width / 1.618;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    initParams();
    animate(step);
}