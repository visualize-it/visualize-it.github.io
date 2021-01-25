let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let x_input = document.getElementById("x-input");

let pause_button = document.getElementById("pause-button");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.99 * screen_width;
}
else {
    canvas_width = 0.5 * screen_width;
}
canvas_height = canvas_width / 1.618;

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
  player_points = ai_points = 0;
  paused = false;
  spawnBall();
}
