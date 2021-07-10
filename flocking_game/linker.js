let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

window.addEventListener('keydown', getKeyPress, false);

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let error = new Audio("./../assets/error.wav");

let density_slider = document.getElementById("density-slider");
let density_display = document.getElementById("density-display");
let number_display = document.getElementById("number-display");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.95 * screen_width;
    canvas_height = canvas_width / 1.618;

    canvas.addEventListener("touchstart", function (e) {
        getTouchPosition(canvas, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);
}
else {
    canvas_height = screen_height / 1.1;
    canvas_width = canvas_height * 1.618;

    canvas.addEventListener("mousedown", function (e) {
        getMousePosition(canvas, e);
    });
}

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    initParams();
    animate(step);
}

function step() {
    if(!isPaused) {
        update();
    }
    render();
    animate(step);
}

function getMousePosition(canvas, event) {
    rect = canvas.getBoundingClientRect();
    click_x = event.clientX - rect.left;
    click_y = event.clientY - rect.top;
    manageClick();
}

function getTouchPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    click_x = event.touches[0].clientX - rect.left,
    click_y = event.touches[0].clientY - rect.top
    manageClick();
}

function getKeyPress(event) {
    if(event.key == "p" || event.key == "P") {
        isPaused = isPaused ? false : true;
    }
}