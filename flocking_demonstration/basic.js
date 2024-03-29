let screen_width = window.innerWidth, screen_height = window.innerHeight;
let canvas_width, canvas_height;
let fps = 30, paused = false;
let mobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause-button");
let num_display = document.getElementById("num-display");

let speed_display = document.getElementById("speed-display");
let speed_input = document.getElementById("speed-input");

let radius_display = document.getElementById("radius-display");
let radius_input = document.getElementById("radius-input");

let noise_display = document.getElementById("noise-display");
let noise_input = document.getElementById("noise-input");

let orientation_display = document.getElementById("orientation-display");
let orientation_input = document.getElementById("orientation-input");

let attraction_display = document.getElementById("attraction-display");
let attraction_input = document.getElementById("attraction-input");

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.45 * screen_width;
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

function step() {
    if (!paused) {
        update();
    }
    render();
    animate(step);
}

window.onload = function () {
    defaults();
    initParams();
    animate(step);
}

function defaults() {
    updateParams("num");

    speed_input.value = 1;
    updateParams("speed");

    radius_input.value = 3;
    updateParams("radius");

    noise_input.value = 1.5;
    updateParams("noise");

    orientation_input.value = 0.4;
    updateParams("orientation");

    attraction_input.value = 0.4;
    updateParams("attraction");
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

function pauseToggle() {
    if (paused) {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
    else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}