let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 60;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let solution = document.getElementById("solution");
let x_bar = document.getElementById("x-bar");
let y_bar = document.getElementById("y-bar");
let add_button = document.getElementById("add-button");
let remove_button = document.getElementById("remove-button");
let insert_button = document.getElementById("insert-button");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.9 * screen_width;
}
else {
    canvas_width = 0.3 * screen_width;
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

window.onload = function() {
    initParams();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
}

function removeLast(number) {
    for (let i = 0; i < number && coords.length > 0; i++) {
        coords.pop();
    }
    shortest_path = [];
    solved = false;
}

function clearCoords() {
    coords = [];

    solving = false;
    solved = false;
    shortest_path = [];
    solution.style.display = "none";

    x_bar.value = 50;
    y_bar.value = 50;

    add_button.disabled = false;
    remove_button.disabled = false;
    insert_button.disabled = false;
}

function calcPathLength(path) {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
        length += distanceBetween(permutation_set[current_permutation][i - 1], permutation_set[current_permutation][i]);
    }
    return length;
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(coords[point2].x - coords[point1].x, 2) + Math.pow(coords[point2].y - coords[point1].y, 2));
}