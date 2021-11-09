let atoms = [];
let grid = [], temp_grid = [];

let num_atoms = 0;
let cell_length = 100;
let num_rows, num_cols;

let dt = 0.001;

let diffusion_constant, cooldown_rate;
let adjacent_weight, diagonal_weight;

let distance_scaling;
let mass_factor, charge_factor;
let radius_factor, force_factor;
let exclusion_radius;

let show_grid;

function update() {
    for (let atom of atoms) {
        atom.update();
    }

    temp_grid = [];
    for(let row = 0; row < num_rows; row++) {
        new_row = [];
        for(let col = 0; col < num_cols; col++) {
            new_row.push(grid[row][col]);
        }
        temp_grid.push(new_row);
    }

    for(let row = 1; row < num_rows - 1; row++) {
        for(let col = 1; col < num_cols - 1; col++) {
            grid[row][col] = diffusion_constant * getLaplacian(row, col);
        }
    }

    for(let row = 0; row < num_rows; row++) {
        for(let col = 0; col < num_cols; col++) {
            if(grid[row][col] < 0) {
                grid[row][col] = 0;
            }
        }
    }

    interatomicInteractions();
    console.log(grid);
}

function getLaplacian(row, col) {
    let diagonals = diagonal_weight * (temp_grid[row - 1][col - 1] + temp_grid[row - 1][col + 1] + temp_grid[row + 1][col + 1] + temp_grid[row + 1][col - 1]);
    let adjacents = adjacent_weight * (temp_grid[row - 1][col] + temp_grid[row][col + 1] + temp_grid[row + 1][col] + temp_grid[row][col - 1]);
    return diagonals + adjacents - temp_grid[row][col];
}

function interatomicInteractions() {
    let atom1, atom2, constant_part, force_x, force_y;
    for (let i = 0; i < atoms.length - 1; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            atom1 = atoms[i];
            atom2 = atoms[j];
            r = distanceBetween(atom1, atom2);

            if (r < Math.min(atom1.radius, atom2.radius)) {
                atoms.splice(j, 1);
                atoms.splice(i, 1);
                new_atom = new Atom(atom1.x, atom1.y, atom1.mass + atom2.mass, atom1.charge + atom2.charge, 0);
                atoms.push(new_atom);
                console.log("Fusion! Resulting atomic number:", atom1.mass + atom2.mass);

                output_string = "Current atoms: "
                for(let atom of atoms) {
                    output_string += String(atom.mass) + " ";
                }
                console.log(output_string);
            }
            else {
                constant_part = force_factor * atom1.charge * atom2.charge / Math.pow(r, 3);
                force_x = constant_part * (atom1.x - atom2.x);
                force_y = constant_part * (atom1.y - atom2.y);
                atom1.applyForce(force_x, force_y);
                atom2.applyForce(-force_x, -force_y);
            }
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawHeatMap();
    if(show_grid) {
        drawGrid();
    }

    for (let atom of atoms) {
        atom.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    mass_factor = 1;
    charge_factor = 1;
    radius_factor = 10;
    force_factor = 1e9;
    distance_scaling = 1;
    exclusion_radius = 5;

    show_grid = true;
    diffusion_constant = 0.5;
    adjacent_weight = 0.2;
    diagonal_weight = 0.05;
    cooldown_rate = 0;

    num_rows = Math.ceil(canvas_height / cell_length);
    num_cols = Math.ceil(canvas_width / cell_length);

    for(let row = 0; row < num_rows; row++) {
        new_row = [];
        for(let col = 0; col < num_cols; col++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }
    grid[2][2] = 1;

    makeScene();
}

function makeScene() {
    let x, y, passed;
    for (let i = 0; i < num_atoms; i++) {
        passed = false
        while(!passed) {
            passed = true;
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            for(let atom of atoms) {
                distance = distanceBetweenCoordAndAtom(x, y, atom);
                if(distance <= exclusion_radius) {
                    passed = false;
                    break;
                }
            }
        }
        atoms.push(new Atom(x, y, 1, 1, 100));
    }
}

function distanceBetweenCoordAndAtom(x, y, atom) {
    return distance_scaling * Math.sqrt(Math.pow(x - atom.x, 2) + Math.pow(y - atom.y, 2));
}

function distanceBetween(atom1, atom2) {
    return distance_scaling * Math.sqrt(Math.pow(atom2.x - atom1.x, 2) + Math.pow(atom2.y - atom1.y, 2));
}

function getMagn(x, y) {
    return Math.sqrt(x * x + y * y);
}

function removeElement(array, element) {
    return array.filter(function (dummy) {
        return dummy != element;
    });
}