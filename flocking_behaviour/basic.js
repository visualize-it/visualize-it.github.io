let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("flocking-canvas");
let context = canvas.getContext("2d");

let separation_toggle = document.getElementById("separation-toggle");
let alignment_toggle = document.getElementById("alignment-toggle");
let cohesion_toggle = document.getElementById("cohesion-toggle");

let pause_button = document.getElementById("pause-button");

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
canvas_height = canvas_width / 1.62;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function() {
    initialize();
    addBoids(20);
    animate(step);
}
