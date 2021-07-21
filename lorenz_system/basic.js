let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let rho_input = document.getElementById("rho");
let sigma_input = document.getElementById("sigma");
let beta_input = document.getElementById("beta");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
    canvas_height = canvas_width;
}
else {
    canvas_width = 0.5 * screen_width;
    canvas_height = canvas_width / 1.62;
}

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

function zoomIn() {
    scale++;
}

function zoomOut() {
    scale--;

    if(scale < 1) {
        scale = 1;
    }
}

function restart() {
    points = [];
    x = 0.01;
    y = 0;
    z = 0;
    hue_start = Math.random() * 255;
    
    updateParams("rho");
    updateParams("sigma");
    updateParams("beta");
}