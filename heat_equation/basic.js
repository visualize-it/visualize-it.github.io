let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let upper_line = document.getElementById("upper-line");
let lower_line = document.getElementById("lower-line");
let cond_display = document.getElementById("cond-display");

let cond_slider = document.getElementById("cond-slider");
let num_input = document.getElementById("num-input");

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

// let animate = window.requestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.mozRequestAnimationFrame
//     || function (callback) {
//         window.setTimeout(callback, 1000 / fps);
//     };

let animate = function (callback) {
    window.setTimeout(callback, 1000 / fps);
  };

window.onload = function () {
  initParams();
  animate(step);
}

function step() {
  if (simulating) {
    update();
  }
  render();
  animate(step);
}

function getRandom(lower, higher) {
  return Math.random() * (higher - lower) + lower;
}

function simulate() {
  simulating = true;
}
