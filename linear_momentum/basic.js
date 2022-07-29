let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

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

let click_x, click_y, pressed;

if(mobile) {
    canvas.addEventListener("touchstart", function (e) {
        getTouchPosition(canvas, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        pressed = true;
        clicked();
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        getTouchPosition(canvas, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        moved();
    }, false);

    canvas.addEventListener("touchend", function (e) {
        getTouchPosition(canvas, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mouseup", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        pressed = false;
        released();
    }, false);
}
else {
    canvas.addEventListener("mousedown", function (e) {
        getMousePosition(canvas, e);
        pressed = true;
        clicked();
    });

    canvas.addEventListener("mousemove", function (e) {
        getMousePosition(canvas, e);
        moved();
    });

    canvas.addEventListener("mouseup", function (e) {
        getMousePosition(canvas, e);
        pressed = false;
        released();
    });

    window.addEventListener("keydown", function(e) {
        keyPressed(e.keyCode);
    }, false);

    window.addEventListener("keydown", function(e) {
        keyReleased(e.keyCode);
    }, false);
}

function getMousePosition(canvas, event) {
    rect = canvas.getBoundingClientRect();
    click_x = event.clientX - rect.left;
    click_y = event.clientY - rect.top;
}

function getTouchPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    click_x = event.touches[0].clientX - rect.left;
    click_y = event.touches[0].clientY - rect.top;
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
