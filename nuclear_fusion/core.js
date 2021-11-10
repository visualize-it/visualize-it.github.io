let nuclei = [];
let grid = [], temp_grid = [];

// default number of nuclei
let num_nuclei = 300;

// diffusion related
let cell_length;
let num_rows, num_cols;
let diffusion_constant, cooldown_rate;
let adjacent_weight, diagonal_weight;

// agitation
let heat_efficiency;

// inertial_confinement
let ic_heat, ic_force, ic_cycle;

// fusion related;
let max_heat, half_maxima, sigmoid_exponent;

// fusion events
let fusion_events = [];

// constants
let distance_scaling, exclusion_radius
let mass_factor, charge_factor;
let radius_factor, force_factor;

// measurements
let avg_temp, avg_z;

// states
let show_grid;
let inertial_confinement;

// simulation
let frame;
let dt = 0.001;

function update() {
    for (let nucleus of nuclei) {
        nucleus.update();
    }

    for(let fusion_event of fusion_events) {
        fusion_event.update();
    }

    diffuseHeat();
    internuclearInteractions();

    if(pressed) {
        heatUp();
    }

    frame++;
    frame = frame % fps
    if(frame == 0) {
        measureTemperature();
    }

    IC()
}

function internuclearInteractions() {
    let nucleus1, nucleus2, constant_part, force_x, force_y;
    for (let i = 0; i < nuclei.length - 1; i++) {
        for (let j = i + 1; j < nuclei.length; j++) {
            nucleus1 = nuclei[i];
            nucleus2 = nuclei[j];
            r = distanceBetween(nucleus1, nucleus2);

            if (r < Math.min(nucleus1.radius, nucleus2.radius)) {
                nuclearFusion(i, j, nucleus1, nucleus2);
            }
            else {
                constant_part = force_factor * nucleus1.charge * nucleus2.charge / Math.pow(r, 3);
                force_x = constant_part * (nucleus1.x - nucleus2.x);
                force_y = constant_part * (nucleus1.y - nucleus2.y);
                nucleus1.applyForce(force_x, force_y);
                nucleus2.applyForce(-force_x, -force_y);
            }
        }
    }
}

function diffuseHeat() {
    syncGrids();
    diffuseCenter();
    diffuseEdges();
    diffuseCorners();
    cooldown();
}

function nuclearFusion(i, j, nucleus1, nucleus2) {
    nuclei.splice(j, 1);
    nuclei.splice(i, 1);
    new_nucleus = new Nucleus(nucleus1.x, nucleus1.y, nucleus1.mass + nucleus2.mass, nucleus1.charge + nucleus2.charge, 0);
    nuclei.push(new_nucleus);

    row = Math.floor(new_nucleus.y / cell_length);
    col = Math.floor(new_nucleus.x / cell_length);
    grid[row][col] = 1;

    new_fusion_event = new Fusion_event(new_nucleus.x, new_nucleus.y, new_nucleus.radius);
    fusion_events.push(new_fusion_event);
    updateAtomic();
}

function IC() {
    if(inertial_confinement) {
        if(frame == 0) {
            heatIC();
        }
        else if(frame == fps - 1) {
            for(let i = 0; i < nuclei.length; i++) {
                if(i % 5 == ic_cycle) {
                    nuclei[i].compress();
                }
            }
            ic_cycle++;
            if(ic_cycle == 5) {
                toggleIC();
            }
        }
    }
}

function measureTemperature() {
    let sum = 0;

    for(let row = 0; row < num_rows; row++) {
        for(let col = 0; col < num_cols; col++) {
            sum += grid[row][col];
        }
    }
    avg_temp = 1000 * sum / (num_rows * num_cols)
    temp_display.innerHTML = `Average temperature: ${avg_temp.toFixed(2)}`;
}

function updateAtomic() {
    let sum = 0;
    for(let nucleus of nuclei) {
        sum += nucleus.mass;
    }
    avg_z = sum / nuclei.length;
    z_display.innerHTML = `Average atomic number: ${avg_z.toFixed(2)}`;
    n_display.innerHTML = `Number of nuclei: ${nuclei.length}`;
}

function updateParams(variable) {
    if(variable == "n") {
        num_nuclei = Number.parseInt(n_input.value);
    }
    if(variable == "h") {
        heat_temperature = Number.parseFloat(heat_input.value);
        heat_display.innerHTML = `Temperature: ${heat_temperature * 1000}`;
    }
}

function initParams() {
    n_input.value = num_nuclei;
    updateParams("n");
    heat_input.value = 0.1;
    updateParams("h");

    mass_factor = 1;
    charge_factor = 1;
    force_factor = 1e9;
    distance_scaling = 1;

    diffusion_constant = 100;
    adjacent_weight = 0.2;
    diagonal_weight = 0.05;
    cooldown_rate = 0.2;
    heat_efficiency = 0.2;

    if(mobile) {
        cell_length = 10;
        radius_factor = 4;
        exclusion_radius = 10;
    } 
    else {
        cell_length = 20;
        radius_factor = 10;
        exclusion_radius = 15;
    }

    max_heat = 1;
    half_maxima = 1;

    frame = 0;

    fusion_event = false;
    inertial_confinement = false;
    show_grid = true;

    ic_heat = 0.05;
    ic_force = 1e5;
    
    makeScene();
    makeGrid();
}

function makeScene() {
    nuclei = [];
    fusion_events = [];

    let x, y, passed;
    for (let i = 0; i < num_nuclei; i++) {
        passed = false
        while (!passed) {
            passed = true;
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            for (let nucleus of nuclei) {
                distance = distanceBetweenCoordAndNucleus(x, y, nucleus);
                if (distance <= exclusion_radius) {
                    passed = false;
                    break;
                }
            }
        }
        nuclei.push(new Nucleus(x, y, 1, 1, 100));
    }
}

function makeGrid() {
    grid = [];
    num_rows = Math.ceil(canvas_height / cell_length);
    num_cols = Math.ceil(canvas_width / cell_length);

    for (let row = 0; row < num_rows; row++) {
        new_row = [];
        for (let col = 0; col < num_cols; col++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);
}

function distanceBetweenCoordAndNucleus(x, y, nucleus) {
    return distance_scaling * Math.sqrt(Math.pow(x - nucleus.x, 2) + Math.pow(y - nucleus.y, 2));
}

function distanceBetween(nucleus1, nucleus2) {
    return distance_scaling * Math.sqrt(Math.pow(nucleus2.x - nucleus1.x, 2) + Math.pow(nucleus2.y - nucleus1.y, 2));
}