let screen_width = window.innerWidth, screen_height = window.innerHeight;
let y_offset = 30;
let fps = 60;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause-button");

let rpm_display = document.getElementById("rpm-display");
let rpm_slider = document.getElementById("rpm-slider");

let fps_slider = document.getElementById("fps-slider");
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
    canvas_width = 0.5 * screen_width;
}
canvas_height = canvas_width / 2 + y_offset;

canvas.width = canvas_width;
canvas.height = canvas_height;;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / (fps));
    };

window.onload = function() {
    initParams();
    animate(step);
}