let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = getElement("pause-button");
let time_framerate_display = getElement("time-framerate-display");

let diffusion_a_input = getElement("diffusion-a-input");
let diffusion_b_input = getElement("diffusion-b-input");
let increase_a_input = getElement("increase-a-input");
let decrease_b_input = getElement("decrease-b-input");
let prec_input = getElement("prec-input");
let speed_input = getElement("speed-input");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = Math.floor(0.9 * screen_width);
}
else {
    canvas_width = Math.floor(0.4 * screen_width);
}
canvas_height = canvas_width;

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
    let start = performance.now();
    if(!paused) {
        update();
    }
    
    render();
    if(!paused) {
        time_framerate_display.innerHTML = `Time: ${time} s ; Framerate: ${(1000 / (performance.now() - start)).toFixed(0)} fps`;
    }

    animate(step);
}

function normaliseInitials() {
    let sum = initial_a + initial_b;
    initial_a /= sum;
    initial_b /= sum;
}

function normaliseWeights() {
    let sum = 4 * (adjacent_weight + diagonal_weight);
    adjacent_weight /= sum;
    diagonal_weight /= sum;
}

function safeGetA(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].a;
}

function safeGetB(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].b;
}

function limit(value) {
    if (value > 1) {
        return 1;
    }
    else if (value < 0) {
        return 0;
    }
    else {
        return value;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function downloadImage(element) {
    var image = canvas.toDataURL("image/png");
    element.href = image;
}

function pause() {
    if(!paused) {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
    else {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
}

function restart() {
    time = 0;
    old_grid = initial_grid;
    paused = false;
}

