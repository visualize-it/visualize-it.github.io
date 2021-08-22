let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let graph_canvas = document.getElementById("graph-canvas");
let graph_context = graph_canvas.getContext("2d");

let animals_input = document.getElementById("animals-input");
let steps_input = document.getElementById("steps-input");

let params_display = document.getElementById("params-display");

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
canvas_height = canvas_width / 1.618;

canvas.width = canvas_width;
canvas.height = canvas_height;

graph_canvas.width = canvas.width;
graph_canvas.height = 300;

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

function randomWalk() {
    return (Math.random() > 0.5 ? 1 : -1);
}

function Gaussian(x) {
    return Math.exp(-Math.pow((x - mean) / sd, 2) / 2) / normaliser;
}

function step() {
    update();
    render();
    animate(step);
}

function resizeCanvas() {
    canvas.height = 2 * num_steps;
    canvas_height = canvas.height;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}