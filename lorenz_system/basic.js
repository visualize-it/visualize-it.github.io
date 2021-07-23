let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let mobile;
let canvas_width, canvas_height;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * window.innerWidth;
    canvas_height = canvas_width;
}
else {
    canvas_width = window.innerHeight;
    canvas_height = canvas_width / 1.62;
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let rho_input = document.getElementById("rho");
let sigma_input = document.getElementById("sigma");
let beta_input = document.getElementById("beta");

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

function step() {
    update();
    render();
    animate(step);
}