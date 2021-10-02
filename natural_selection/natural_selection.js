let wall_width_factor, wall_height_factor;

let walls = [];

let movables = [];

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for(let wall of walls) {
        wall.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    wall_width_factor = 5;
    wall_height_factor = 30;

    walls.push(new Wall(canvas_width / 2, canvas_height / 2, "h"));

    updateMovables();
}

function updateMovables() {
    movables = [];
    for(let wall of walls) {
        movables.push(wall);
    }
}

function addWall(orientation) {
    walls.push(new Wall(canvas_width / 2, canvas_height / 2, orientation));
    updateMovables();
}