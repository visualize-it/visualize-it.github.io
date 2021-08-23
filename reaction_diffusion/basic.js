let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let time_display = document.getElementById("time-display");
let framerate_display = document.getElementById("framerate-display");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = Math.floor(0.9 * screen_width);
}
else {
    canvas_width = Math.floor(0.4 * screen_width);
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
    update();
    render();
    framerate_display.innerHTML = `Time: ${time} s ; Framerate: ${(1000/(performance.now() - start)).toFixed(0)} fps`;
    
    animate(step);
}

function lapA(i, j) {
    return adjacent_weight * (old_grid[i - 1][j].a + old_grid[i][j - 1].a + old_grid[i + 1][j].a + old_grid[i][j + 1].a) + diagonal_weight * (old_grid[i - 1][j - 1].a + old_grid[i - 1][j + 1].a + old_grid[i + 1][j - 1].a + old_grid[i + 1][j + 1].a) - old_grid[i][j].a;
}

function safeLapA(i, j) {
    let dot_product = -old_grid[i][j].a;
    dot_product += adjacent_weight * (safeRetrieveA(i - 1, j) + safeRetrieveA(i, j - 1) + safeRetrieveA(i + 1, j) + safeRetrieveA(i, j + 1));
    dot_product += diagonal_weight * (safeRetrieveA(i - 1, j - 1) + safeRetrieveA(i - 1, j + 1) + safeRetrieveA(i + 1, j - 1) + safeRetrieveA(i + 1, j + 1));
    return dot_product;
}

function lapB(i, j) {
    return adjacent_weight * (old_grid[i - 1][j].b + old_grid[i][j - 1].b + old_grid[i + 1][j].b + old_grid[i][j + 1].b) + diagonal_weight * (old_grid[i - 1][j - 1].b + old_grid[i - 1][j + 1].b + old_grid[i + 1][j - 1].b + old_grid[i + 1][j + 1].b) - old_grid[i][j].b;
}

function safeLapB(i, j) {
    let dot_product = -old_grid[i][j].b;
    dot_product += adjacent_weight * (safeRetrieveB(i - 1, j) + safeRetrieveB(i, j - 1) + safeRetrieveB(i + 1, j) + safeRetrieveB(i, j + 1));
    dot_product += diagonal_weight * (safeRetrieveB(i - 1, j - 1) + safeRetrieveB(i - 1, j + 1) + safeRetrieveB(i + 1, j - 1) + safeRetrieveB(i + 1, j + 1));
    return dot_product;
}

function normaliseInitials() {
    let sum = initial_a + initial_b;
    initial_a /= sum;
    initial_b /= sum;
}

function normaliseWeights() {
    let sum = 4 * (adjacent_weight + diagonal_weight);
    adjacent_weight /= sum;
    diagonal_weight /= sum;
}

function safeGetA(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].a;
}

function safeGetB(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].b;
}

function getGrayScale(cell) {
    return 255 * cell.a / (cell.a + cell.b)
}

function limit(value) {
    if(value > 1) {
        return 1;
    }
    else if(value < 0) {
        return 0;
    }
    else {
        return value;
    }
}

