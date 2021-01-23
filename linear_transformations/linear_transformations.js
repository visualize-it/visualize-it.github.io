let num_points, coord_gap;
let x_coords, y_coords;
let points;

function update() {

}

function render() {
    basicRendering();
    gridRendering();
}

function updateParams(variable) {

}

function initParams() {
    num_points = 5;
    coord_gap = 2;

    x_coords = [];
    y_coords = [];
    points = [];

    assignCoords();
}

function assignCoords() {
    let gap, length, coord;

    if (canvas_width > canvas_height) {
        length = canvas_width / 2;
    }
    else {
        length = canvas_height / 2;
    }
    gap = length / num_points;

    for (coord = x_origin; coord > 0; coord -= gap) {
        x_coords.push(coord);
    }
    x_coords.pop();
    for (coord = x_origin; coord < canvas_width; coord += gap) {
        x_coords.push(coord);
    }
    for (coord = y_origin; coord > 0; coord -= gap) {
        y_coords.push(coord);
    }
    y_coords.pop();
    for (coord = y_origin; coord < canvas_height; coord += gap) {
        y_coords.push(coord);
    }

    for (let x_coord of x_coords) {
        for (let y = 1; y < canvas_height; y += coord_gap) {
            points.push(
                {
                    x: x_coord,
                    y: y,
                }
            )
        }
    }

    for(let y_coord of y_coords) {
        for(let x = 1; x < canvas_width; x += coord_gap) {
            points.push(
                {
                    x: x,
                    y: y_coord,
                }
            )
        }
    }
}

function basicRendering() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.lineWidth = "2";
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(0, y_origin);
    context.lineTo(canvas_width, y_origin);
    context.stroke();

    context.beginPath();
    context.moveTo(x_origin, 0);
    context.lineTo(x_origin, canvas_height);
    context.stroke();
}

function gridRendering() {
    context.fillStyle = "#ffffff";
    for(let point of points) {
        context.fillRect(point.x, point.y, 1, 1);
    }
}