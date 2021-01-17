let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("flocking-canvas");
let context = canvas.getContext("2d");

let separation_toggle = document.getElementById("separation-toggle");
let alignment_toggle = document.getElementById("alignment-toggle");
let cohesion_toggle = document.getElementById("cohesion-toggle");
let highlight_toggle = document.getElementById("highlight-toggle");

let pause_button = document.getElementById("pause-button");
let boid_number = document.getElementById("boid-number");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
} else {
    mobile = false;
}

if (mobile) {
    canvas_width = 0.95 * screen_width;
}
else {
    canvas_width = 0.5 * screen_width;
}
canvas_height = canvas_width / 1.62;

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function () {
    initialize();
    addBoids(20);
    animate(step);
}

function step() {
    if (!is_paused) {
        update();
    }
    render();
    animate(step);
}

function pause() {
    if (!is_paused) {
        is_paused = true;
        pause_button.innerHTML = "Resume";
    }
    else {
        is_paused = false;
        pause_button.innerHTML = "Pause";
    }
}

function restart() {
    let num_boids = boids.length;
    removeBoids(boids.length);

    if (num_boids == 0) {
        addBoids(20);
    }
    else {
        addBoids(num_boids);
    }
    is_highlighted = true;
    highlight_index = getHighlightIndex();
}

function initialize() {
    separation_toggle.checked = true;
    alignment_toggle.checked = true;
    cohesion_toggle.checked = true;

    boid_number.innerHTML = `Number of boids: ${boids.length}`;
    highlight_index = getHighlightIndex();
}

function addBoids(number = 1) {
    while (number) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let dirn = Math.random() * 360;

        boids.push(
            {
                x: x,
                y: y,
                dirn: dirn,
            }
        );
        number--;
    }
    boid_number.innerHTML = `Number of boids: ${boids.length}`;
}

function removeBoids(number = 1) {
    while (number) {
        boids.pop();
        number--;
    }
    boid_number.innerHTML = `Number of boids: ${boids.length}`;

    if(boids.length == 0) {
        is_highlighted = false;
        highlight_toggle.innerHTML = "Highlight: OFF";
    }
}

function clearBoids() {
    boids = [];
    boid_number.innerHTML = `Number of boids: ${boids.length}`;
    is_highlighted = false;
    highlight_toggle.innerHTML = "Highlight: OFF";
}

function highlight() {
    if (!is_highlighted && boids.length) {
        is_highlighted = true;
        highlight_toggle.innerHTML = "Highlight: ON";
        highlight_index = getHighlightIndex();
    }
    else {
        is_highlighted = false;
        highlight_toggle.innerHTML = "Highlight: OFF";
    }
}

function getHighlightIndex() {
    return Math.floor(Math.random() * boids.length);
}

function next() {
    highlight_index++;
    if(highlight_index == boids.length) {
        highlight_index = 0;
    }
}

function prev() {
    highlight_index--;
    if(highlight_index == 0) {
        highlight_index = boids.length - 1;
    }
}
