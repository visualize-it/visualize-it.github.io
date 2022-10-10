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

let interaction_elements = {
    "red": {
        "red": document.getElementById('red-red'),
        "blue": document.getElementById('red-blue'),
        "orange": document.getElementById('red-orange'),
        "white": document.getElementById('red-white'),
    },
    "blue": {
        "red": document.getElementById('blue-red'),
        "blue": document.getElementById('blue-blue'),
        "orange": document.getElementById('blue-orange'),
        "white": document.getElementById('blue-white'),
    },
    "orange": {
        "red": document.getElementById('orange-red'),
        "blue": document.getElementById('orange-blue'),
        "orange": document.getElementById('orange-orange'),
        "white": document.getElementById('orange-white'),
    },
    "white": {
        "red": document.getElementById('white-red'),
        "blue": document.getElementById('white-blue'),
        "orange": document.getElementById('white-orange'),
        "white": document.getElementById('white-white'),
    },
}

let interaction_displays = {
    "red": {
        "red": document.getElementById('red-red-display'),
        "blue": document.getElementById('red-blue-display'),
        "orange": document.getElementById('red-orange-display'),
        "white": document.getElementById('red-white-display'),
    },
    "blue": {
        "red": document.getElementById('blue-red-display'),
        "blue": document.getElementById('blue-blue-display'),
        "orange": document.getElementById('blue-orange-display'),
        "white": document.getElementById('blue-white-display'),
    },
    "orange": {
        "red": document.getElementById('orange-red-display'),
        "blue": document.getElementById('orange-blue-display'),
        "orange": document.getElementById('orange-orange-display'),
        "white": document.getElementById('orange-white-display'),
    },
    "white": {
        "red": document.getElementById('white-red-display'),
        "blue": document.getElementById('white-blue-display'),
        "orange": document.getElementById('white-orange-display'),
        "white": document.getElementById('white-white-display'),
    }
}

let status_elements = {
    "red": document.getElementById('red-status'),
    "blue": document.getElementById('blue-status'),
    "orange": document.getElementById('orange-status'),
    "white": document.getElementById('white-status'),
}

let damping_input = document.getElementById('damping-input');
let damping_display = document.getElementById('damping-display');

let cutoff_input = document.getElementById('cutoff-input');
let cutoff_display = document.getElementById('cutoff-display');

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
    num_red = 200;
    num_blue = 200;
    num_green = 200;
    num_white = 200;

    damping_input.value = 0.2;

    cutoff_input.min = Number.parseInt(canvas_width / 10);
    cutoff_input.max = Number.parseInt(canvas_width / 2);
    cutoff_input.value = Number.parseInt(canvas_width / 6);
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