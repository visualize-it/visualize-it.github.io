let walls = [];
let source;

let wall_width_factor, wall_height_factor;
let radius_factor;


let movables = [];

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for(let wall of walls) {
        wall.render();
    }
    target.render();
    source.render();
}

function updateParams(variable) {

}

function initParams() {
    radius_factor = 50;
    wall_width_factor = 5;
    wall_height_factor = 30;

    source = new Source(canvas_width / 2, 7 * canvas_height / 8);
    target = new Target(canvas_width / 2, canvas_height / 8);

    walls.push(new Wall(canvas_width / 2, canvas_height / 2, "h"));

    updateMovables();
}

function updateMovables() {
    movables = [];
    movables.push(source);
    movables.push(target);
    for(let wall of walls) {
        movables.push(wall);
    }
}

function addWall(orientation) {
    walls.push(new Wall(canvas_width / 2, canvas_height / 2, orientation));
    updateMovables();
}

function clearWalls() {
    walls = [];
    updateMovables();
}