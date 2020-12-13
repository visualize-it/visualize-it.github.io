// Initial Params
let init_num_entities = 2;
let init_star_mass = 1000;
let init_star_x = 0, init_star_y = 0;
let init_star_vx = 0, init_star_vy = 0;

let init_planet_mass = 10;
let init_planet_x = 50, init_planet_y = 0;
let init_planet_vx = 0, init_planet_vy = 10;

// Transitive params
let num_entities
let bodies = [];
let scale, max_distance;

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);
}

function initialParams() {
    num_entities = init_num_entities;
    if(num_entities > 2) {
        remove_button.style.display = "block";
    }
    else {
        remove_button.style.display = "none";
    }
}

function updateParams() {

}

