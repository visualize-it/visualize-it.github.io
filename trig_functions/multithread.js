let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 30;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.4 * screen_width;
}
canvas_height = canvas_width / 1.6;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    slider_1.value = 30;
    slider_2.value = 45;
    slider_3.value = 60;
    update_1('slide');
    update_2('slide');
    update_3('slide');
    animating = true;
    animate(step);
}

function step() {
    render_1();
    render_2();
    render_3();
    animate(step);
};

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ^ 2 + (y2 - y1) ^ 2);
}

function radian(degrees) {
    return (Math.PI * degrees / 180);
}