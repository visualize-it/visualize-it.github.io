let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("spring-canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause");

let position_input = document.getElementById("position");
let velocity_input = document.getElementById("velocity");
let spring_constant_input = document.getElementById("spring-constant");
let spring_mass_input = document.getElementById("mass");
let damping_input = document.getElementById("damping");
let precision_input = document.getElementById("precision");

let scale_display = document.getElementById("scale-display");
let position_display = document.getElementById("position-display");
let velocity_display = document.getElementById("velocity-display");
let acceleration_display = document.getElementById("acceleration-display");

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
canvas_height = 0.65 * canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };