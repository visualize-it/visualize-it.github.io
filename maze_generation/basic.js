let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 24;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let algo_select = document.getElementById("algo-select");

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

// let animate = window.requestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.mozRequestAnimationFrame
//     || function (callback) {
//         window.setTimeout(callback, 1000 / fps);
//     };

let animate = function (callback) {
    window.setTimeout(callback, 1000 / 30);
}

window.onload = function () {
    initParams();
    animate(step);
}

function step() {
    update();
    render();
    animate(step);
}

function resizeCanvas() {
    canvas.width -= (canvas.width - num_rows * length);
    canvas.height -= (canvas.height - num_rows * length);

    canvas_width = canvas.width;
    canvas_height = canvas.height;
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function get2Darray(r, c) {
    let array_2d = [];
    for (let i = 0; i < r; i++) {
        let array_1d = [];
        for (let i = 0; i < c; i++) {
            array_1d.push(0);
        }
        array_2d.push(array_1d);
    }
    return array_2d;
}

function randomCell(cells) {
    return cells[Math.floor(Math.random() * cells.length)];
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randInt(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower));
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function removeElement(array, element) {
    return array.filter(function (dummy) {
        return dummy != element;
    });
}

Set.prototype.union = function (otherSet) {
    var unionSet = new Set();

    for (var elem of this) {
        unionSet.add(elem);
    }

    for (var elem of otherSet)
        unionSet.add(elem);

    return unionSet;
}

Set.prototype.disjoint = function (otherSet) {
    for (let elem of otherSet) {
        if (this.has(elem)) {
            return false;
        }
    }
    return true;
}

Set.prototype.contains = function(element) {
    for(let elem of this) {
        if(elem.i == element.i && elem.j == element.j) {
            return true;
        }
    }
    return false;
}