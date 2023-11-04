let points = [];
let near_cutoff;

let num_ants;

function update() {
    
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderPoints();
}

function updateParams(variable) {

}

function initParams() {
    points = [];
    near_cutoff = 7;
    num_ants = 100;
}

function renderPoints() {
    for (let point of points) {
        context.beginPath();
        context.arc(point.x, point.y, near_cutoff, 0, 2 * Math.PI, false);
        context.fillStyle = "#ffffff";
        context.fill();
    }
}

function clickedAt(x, y) {
    let distance = 0;
    let point_nearby = false;
    for (let point of points) {
        distance = getDistance(x, y, point.x, point.y);
        if (distance < near_cutoff) {
            points = removeElement(points, point);
            point_nearby = true;
            break;
        }
    }

    if (!point_nearby) {
        points.push({ x: Math.round(x), y: Math.round(y)});
    }
}

function randomPoint() {
    let x, y;
    let prev_length = points.length;

    while (true) {
        x = Math.random() * canvas_width;
        y = Math.random() * canvas_height;
        clickedAt(x, y);
        if (points.length > prev_length) {
            break;
        }
    }
}

function clearPoints() {
    points = [];
}