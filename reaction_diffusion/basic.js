let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let brush_button = getElement("brush-button");
let pause_button = getElement("pause-button");
let time_framerate_display = getElement("time-framerate-display");

let diffusion_a_input = getElement("diffusion-a-input");
let diffusion_b_input = getElement("diffusion-b-input");
let increase_a_input = getElement("increase-a-input");
let decrease_b_input = getElement("decrease-b-input");
let prec_input = getElement("prec-input");
let speed_input = getElement("speed-input");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = Math.floor(0.9 * screen_width);

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
    canvas_width = Math.floor(0.4 * screen_width);

    canvas.addEventListener("mousedown", function (e) {
        getMousePosition(canvas, e);
    });
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

window.onload = function () {
    initParams();
    animate(step);
}

function step() {
    let start = performance.now();
    if(!paused) {
        update();
    }
    
    render();
    if(!paused) {
        time_framerate_display.innerHTML = `Time: ${time} s ; Framerate: ${(1000 / (performance.now() - start)).toFixed(0)} fps`;
    }

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

function downloadImage(element) {
    var image = canvas.toDataURL("image/png");
    element.href = image;
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

function brush() {
    if(!drawMode) {
        drawMode = true;
        brush_button.innerHTML = "Toggle Draw Mode: ON";
    }
    else {
        drawMode = false;
        brush_button.innerHTML = "Toggle Draw Mode: OFF";
    }
}

function restart() {
    time = 0;
    old_grid = initial_grid;
    if(paused) {
        pause();
    }
}

