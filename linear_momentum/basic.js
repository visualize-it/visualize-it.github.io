let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let x_input = document.getElementById("x-input");

let pause_button = document.getElementById("pause-button");
let trail_button = document.getElementById("trail-button");

let wall_hit = new Audio("https://cdn.glitch.com/8417d58b-d44c-41ba-be91-392e8ef78c14%2Fwall_hit.wav?v=1599147339524");
let fail_sound = new Audio("https://cdn.glitch.com/8417d58b-d44c-41ba-be91-392e8ef78c14%2Ffail.wav?v=1599149353825");
let paddle_hit = new Audio("https://cdn.glitch.com/8417d58b-d44c-41ba-be91-392e8ef78c14%2Fbar_hit.wav?v=1599148882047");

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
  bounces = 1;
  paused = false;
  player_bar_x = ai_bar_x = canvas_width / 2;
  spawnBall();
}

function toggleTrails() {
  if(showTrails) {
    showTrails = false;
    trail_button.innerHTML = "Show trails";
  }
  else {
    showTrails = true;
    trail_button.innerHTML = "Hide trails";
  }
}
