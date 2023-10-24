let num_cells = 10;
let cell_length;
let cells = [];

let pref_velocity_sqrt = 1
let density_diffusion_mulitplier = 1;
let velocity_diffusion_mulitplier = 1;
let advection_multiplier = 1;
let pressure_multiplier = 1;
let dt = 0.001;

let max_density;

function update() {
    new_cells = [];
    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push({
                density: cells[i][j].density,
                velocity: cells[i][j].velocity,
            });
        }
        new_cells.push(new_row);
    }

    max_density = 0;
    let density_sum = 0;
    let current_cell, top_cell, bottom_cell, left_cell, right_cell;
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            current_cell = cells[i][j];
            top_cell = cells[(i - 1 + num_cells) % num_cells][j];
            bottom_cell = cells[(i + 1) % num_cells][j];
            left_cell = cells[i][(j - 1 + num_cells) % num_cells];
            right_cell = cells[i][(j + 1) % num_cells];

            let velocity_change = new Vector(0, 0);
            let density_change = 0;

            // velocity diffusion
            let velocity_laplacian = new Vector(0, 0);
            velocity_laplacian.add(left_cell.velocity);
            velocity_laplacian.add(right_cell.velocity);
            velocity_laplacian.add(top_cell.velocity);
            velocity_laplacian.add(bottom_cell.velocity);
            velocity_laplacian.subtract(current_cell.velocity);
            velocity_laplacian.scale(velocity_diffusion_mulitplier / 4);
            velocity_change.add(velocity_laplacian);

            // velocity preference
            let velocity_preference = new Vector(0, 0);
            let multiplier = pref_velocity_sqrt - current_cell.velocity.magnitude() ** 2;
            velocity_preference.x = multiplier * current_cell.velocity.x;
            velocity_preference.y = multiplier * current_cell.velocity.y;
            velocity_change.add(velocity_preference);

            // velocity advection
            let velocity_gradient = new Vector(0, 0);
            velocity_gradient.x = current_cell.velocity.x * (right_cell.velocity.x - left_cell.velocity.x);
            velocity_gradient.y = current_cell.velocity.y * (top_cell.velocity.y - bottom_cell.velocity.y);
            velocity_gradient.scale(advection_multiplier / 2);
            velocity_change.subtract(velocity_gradient);

            // density equalization
            let density_gradient = new Vector(0, 0);
            density_gradient.x = right_cell.density - left_cell.density;
            density_gradient.y = top_cell.density - bottom_cell.density;
            density_gradient.scale(pressure_multiplier / 2);
            velocity_change.subtract(density_gradient);
            
            // calculate change in density by applying continuity equation
            if (left_cell.velocity.x > 0) {
                density_change += left_cell.velocity.x * left_cell.density / left_cell.velocity.magnitude();
            } 
            if (right_cell.velocity.x < 0) {
                density_change += right_cell.velocity.x * right_cell.density / right_cell.velocity.magnitude();
            }
            if (top_cell.velocity.y < 0) {
                density_change += top_cell.velocity.y * top_cell.density / top_cell.velocity.magnitude();
            }
            if (bottom_cell.velocity.y > 0) {
                density_change += bottom_cell.velocity.y * bottom_cell.density / bottom_cell.velocity.magnitude();
            }
            density_change -= current_cell.velocity.magnitude() * current_cell.density;

            velocity_change.scale(dt);
            density_change *= dt;

            new_cells[i][j].velocity.add(velocity_change);
            new_cells[i][j].density += density_change;
            
            density_sum += new_cells[i][j].density;
            if (new_cells[i][j].density > max_density) {
                max_density = new_cells[i][j].density;
            }
        }
    }

    cells = new_cells;
    console.log(density_sum);
    // console.log(cells[5][5].density);
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawDensities();
    drawVelocities();
}

function updateParams(variable) {

}

function initParams() {
    cell_length = Math.ceil(canvas_width / num_cells);
    for (let i = 0; i < num_cells; i++) {
        let new_row = [];
        for (let j = 0; j < num_cells; j++) {
            new_row.push({
                density: Math.random(),
                velocity: new Vector(2 * Math.PI * Math.random()),
            });
        }
        cells.push(new_row);
    }
}

function drawGrid() {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;

    for (let i = 0; i < num_cells; i++) {
        context.beginPath();
        context.moveTo(i * cell_length, 0);
        context.lineTo(i * cell_length, canvas_height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, i * cell_length);
        context.lineTo(canvas_width, i * cell_length);
        context.stroke();
    }
}

function drawDensities() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            let brightness = Math.floor(256 * cells[i][j].density / max_density);
            context.fillStyle = "rgb(" + brightness + "," + brightness + "," + brightness + ")";
            context.fillRect(j * cell_length, i * cell_length, cell_length, cell_length);
        }
    }
}

function drawVelocities() {
    context.strokeStyle = "#0000ff";
    context.lineWidth = 1;

    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            let cell = cells[i][j];
            context.beginPath();
            context.moveTo(j * cell_length + cell_length / 2, i * cell_length + cell_length / 2);
            context.lineTo((j + 0.5) * cell_length + Math.cos(cell.velocity.angle) * cell_length / 2, (i + 0.5) * cell_length + Math.sin(cell.velocity.angle) * cell_length / 2)
            context.stroke();
        }
    }
}