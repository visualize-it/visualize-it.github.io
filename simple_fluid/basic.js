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
let vel_button = document.getElementById("vel-button");
let view_button = document.getElementById("view-button");
let source_button = document.getElementById("source-button");

let fx_input = document.getElementById("fx-input");
let fy_input = document.getElementById("fy-input");
let fx_display = document.getElementById("fx-display");
let fy_display = document.getElementById("fy-display");

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.4 * screen_width;
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
    checkUserInput();
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
    fx_input.value = 1;
    fy_input.value = 1;
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

function velToggle() {
    if (show_vel) {
        show_vel = false;
        vel_button.innerHTML = "Show Velocity";
    }
    else {
        show_vel = true;
        vel_button.innerHTML = "Hide Velocity";
    }
}

function viewToggle() {
    if (show_density) {
        show_density = false;
        view_button.innerHTML = "Show Density";
    }
    else {
        show_density = true;
        view_button.innerHTML = "Show Pressure";
    }
}

function sourceToggle() {
    if (source_on) {
        source_on = false;
        source_button.innerHTML = "Turn on Source";
    }
    else {
        source_on = true;
        source_button.innerHTML = "Turn off Source";
    }
}