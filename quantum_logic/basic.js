let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 60;

let canvas = document.getElementById("quantum-canvas");
let context = canvas.getContext("2d");

let top_slider = document.getElementById("input-top");
let bottom_slider = document.getElementById("input-bottom");
let input = document.getElementById("input");

let display_top = document.getElementById("display-top");
let display_bottom = document.getElementById("display-bottom");
let display_output = document.getElementById("display-output");
let display_input = document.getElementById("display-input");
let display_measure = document.getElementById("display-measure");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.95 * screen_width;
}
else {
    canvas_width = 0.5 * screen_width;
}
canvas_height = 0.2 * canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

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