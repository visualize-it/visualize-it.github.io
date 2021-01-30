let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("projectile-canvas");
let context = canvas.getContext("2d");

let angle_slider = document.getElementById("angle-slider");
let angle_display = document.getElementById("angle-display");

let speed_slider = document.getElementById("speed-slider");
let speed_display = document.getElementById("speed-display");

let display_params = document.getElementById("display-params");
let display_stats = document.getElementById("display-stats");

let target_hit = new Audio("../assets/target_hit.wav");
let target_miss = new Audio("../assets/target_miss.wav");

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
canvas_height = 0.5 * canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

function toRadian(angle) {
    return (Math.PI * angle / 180);
}
