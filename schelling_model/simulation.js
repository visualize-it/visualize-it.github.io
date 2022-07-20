let num_cells, cell_length, boid_radius;

let occupancy = 0.75;

let boids;
let grid;

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    // drawGrid();

    for (let boid of boids) {
        boid.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    grid = [];
    boids = [];

    if (mobile) {
        num_cells = 30;
    }
    else {
        num_cells = 50;
    }

    cell_length = canvas_width / num_cells;
    boid_radius = 0.45 * cell_length;

    
    for (let i = 0; i < num_cells; i++) {
        new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }

    let num_boids = Math.floor(num_cells * num_cells * occupancy);

    for (let i = 0; i < num_boids; i++) {
        let type = 0;
        if (i % 2 == 0) {
            type = 1;
        }
        else {
            type = 2;
        }

        while (true) {
            let i = Math.floor(Math.random() * num_cells);
            let j = Math.floor(Math.random() * num_cells);
            if (grid[i][j] == 0) {
                grid[i][j] = type;
                boids.push(new Boid(type, i, j));
                break;
            }
        }
    }

    console.log(boids);
}