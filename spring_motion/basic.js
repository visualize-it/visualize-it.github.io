let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

let canvas = document.getElementById("spring-canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause");

let position_input = document.getElementById("position");
let velocity_input = document.getElementById("velocity");
let spring_constant_input = document.getElementById("spring-constant");
let spring_mass_input = document.getElementById("mass");
let damping_input = document.getElementById("damping");
let precision_input = document.getElementById("precision");

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
canvas_height = 70;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };