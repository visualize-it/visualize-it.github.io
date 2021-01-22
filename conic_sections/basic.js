let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

let canvas = document.getElementById("conic-canvas");
let context = canvas.getContext("2d");

let clear_button = document.getElementById("clear-button");
let draw_button = document.getElementById("draw-button");

let circle_button = document.getElementById("circle-button");
let ellipse_button = document.getElementById("ellipse-button");
let parabola_button = document.getElementById("parabola-button");
let hyperbola_button = document.getElementById("hyperbola-button");

let scale_display = document.getElementById("scale-display");

let input_e = document.getElementById("input-e");
let input_l = document.getElementById("input-l");

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
