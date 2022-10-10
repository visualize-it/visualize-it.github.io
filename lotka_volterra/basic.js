let screen_width = window.innerWidth, screen_height = window.innerHeight;
let canvas_width, canvas_height;
let fps = 24, paused = false;
let mobile;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause-button");

let pred_num_display = document.getElementById("pred-num");
let prey_num_display = document.getElementById("prey-num");

let prey_rep_input = document.getElementById("prey-rep-input");
let prey_ded_input = document.getElementById("prey-ded-input");
let pred_rep_input = document.getElementById("pred-rep-input");
let pred_ded_input = document.getElementById("pred-ded-input");
let pred_req_input = document.getElementById("pred-req-input");

let prey_rep_display = document.getElementById("prey-rep-display");
let prey_ded_display = document.getElementById("prey-ded-display");
let pred_rep_display = document.getElementById("pred-rep-display");
let pred_ded_display = document.getElementById("pred-ded-display");
let pred_req_display = document.getElementById("pred-req-display");

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
    defaultParams();
    initParams();
    animate(step);
}

function defaultParams() {
    prey_rep_input.value = 0.4;
    prey_ded_input.value = 0.2;
    pred_rep_input.value = 0.8;
    pred_ded_input.value = 0.1;
    pred_req_input.value = 2;
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