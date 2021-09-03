let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;

    canvas.addEventListener("touchstart", function (e) {
        getTouchPosition(canvas, e);
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
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
} else {
    canvas_width = 0.3 * screen_width;

    canvas.addEventListener("mousedown", function (e) {
        getMousePosition(canvas, e);
        clicked(canvas, e);
    });

    canvas.addEventListener("mousemove", function (e) {
        getMousePosition(canvas, e);
        moved(canvas, e);
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
    update();
    render();
    animate(step);
}

function getProspectivePoint() {
    let prospective_point = -1;
    for (let i = 0; i < control_points.length; i++) {
        if (getDistance(click_x, click_y, control_points[i].x, control_points[i].y) < leeway) {
            prospective_point = i;
        }
    }
    return prospective_point;
}

function clicked() {
    let prospective_point = getProspectivePoint();

    if (!selected) {
        selected = true;
        selected_point = prospective_point;
    }
    else {
        if (prospective_point < 0) {
            selected = false;
        }
        else if (prospective_point == selected_point) {
            selected = false;
        }
        else {
            selected = true;
            selected_point = prospective_point;
        }
    }
    updateSelected();
}

function moved() {
    if (selected) {
        updateParams("pointer");
    }
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
