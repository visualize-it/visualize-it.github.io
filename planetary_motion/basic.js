let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("planet-canvas");
let context = canvas.getContext("2d");

let car = document.getElementById("car");
let remove_button = document.getElementById("remove-button");

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
canvas_height = canvas_width;

canvas.width = canvas_width;
canvas.height = canvas_height;

originX = canvas_width / 2;
originY = canvas_height / 2;

let animate = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / fps);
    };

window.onload = function() {
    initialParams();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
}

function newBody() {
    num_entities += 1;
    car.innerHTML += `
    <div class="col s6">
    <p id="body-${num_entities}" class="center-align">Planet ${num_entities - 1}</p>
    <input id="mass-${num_entities}" placeholder="Mass" type="number">
    <input id="x-${num_entities}" placeholder="X-coordinate" type="number">
    <input id="y-${num_entities}" placeholder="Y-coordinate" type="number">
    <input id="vx-${num_entities}" placeholder="Horizontal velocity" type="number">
    <input id="vy-${num_entities}" placeholder="Vertical velocity" type="number">
</div>
    `;

    if(num_entities > 2) {
        remove_button.style.display = "block";
    }
}

function removeBody() {
    if (num_entities > 2) {
        num_entities -= 1;
        car.innerHTML = `
        <div class="col s6">
        <p id="body-1" class="center-align">Star</p>
        <input id="mass-1" placeholder="Mass" type="number">
        <input id="x-1" placeholder="X-coordinate" type="number">
        <input id="y-1"  placeholder="Y-coordinate" type="number">
        <input id="vx-1" placeholder="Horizontal velocity" type="number">
        <input id="vy-1" placeholder="Vertical velocity" type="number">
    </div>
        `
        for(let entity = 2; entity <= num_entities; entity++) {
            car.innerHTML += `
            <div class="col s6">
            <p id="body-${entity}" class="center-align">Planet ${entity - 1}</p>
            <input id="mass-${entity}" placeholder="Mass" type="number">
            <input id="x-${entity}" placeholder="X-coordinate" type="number">
            <input id="y-${entity}" placeholder="Y-coordinate" type="number">
            <input id="vx-${entity}" placeholder="Horizontal velocity" type="number">
            <input id="vy-${entity}" placeholder="Vertical velocity" type="number">
        </div>
            `
        }
    }

    if(num_entities == 2) {
        remove_button.style.display = "none";
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2))
}

function transformX(x) {
    return (originX + x);
}

function transformY(y) {
    return (originY - y);
}