let screen_width = window.innerWidth, screen_height = window.innerHeight;
let canvas_width, canvas_height;
let fps = 24, paused = false;
let mobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

let left_canvas = document.getElementById("left-canvas");
let left_context = left_canvas.getContext("2d");

let right_canvas = document.getElementById("right-canvas");
let right_context = right_canvas.getContext("2d");

let building_image = document.getElementById("building");
let einstein_image = document.getElementById("einstein");

let kernel_inputs = document.getElementsByClassName("kernel-inputs");
let kernel_select = document.getElementById("kernel-select");
let image_select = document.getElementById("image-select");

if (mobile) {
    canvas_width = Math.floor(0.9 * screen_width);
}
else {
    canvas_width = Math.floor(0.3 * screen_width);
}
canvas_height = Math.floor(canvas_width);

left_canvas.width = canvas_width;
left_canvas.height = canvas_height;
right_canvas.width = canvas_width;
right_canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

function step() {
    if (!paused) {
        update();
    }
    render();
    animate(step);
}

window.onload = function() {
    initParams();
    animate(step);
}