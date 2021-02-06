let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause-button");
let grid_button = document.getElementById("grid-button");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
    canvas.addEventListener("mousedown", function(e) {
      getMousePosition(canvas, e);
    })
}

if (mobile) {
    canvas_width = 0.95 * screen_width;
}
else {
    canvas_width = 0.35 * screen_width;
}
canvas_height = canvas_width

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

function getMousePosition(canvas, event) {
  rect = canvas.getBoundingClientRect();
  click_x = event.clientX - rect.left;
  click_y = event.clientY - rect.top;
  manageClick();
}

function manageClick() {
  toggle(Math.floor(click_x / cell_length), Math.floor(click_y / cell_length));
}

function toggleGrid() {
  grid_button.innerHTML = showGrid ? "Hide Grid" : "Show Grid";
  showGrid = showGrid ? false : true;
}

function togglePause() {
  pause_button.innerHTML = isPaused ? "Pause" : "Resume";
  isPaused = isPaused ? false : true;
}
