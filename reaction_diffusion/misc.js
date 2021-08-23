function updateValues() {
    diffusion_a = Number.parseFloat(diffusion_a_input.value);
    diffusion_b = Number.parseFloat(diffusion_b_input.value);
    increase_a = Number.parseFloat(increase_a_input.value);
    decrease_b = Number.parseFloat(decrease_b_input.value);
    dt = Number.parseFloat(prec_input.value);
    speed = Number.parseInt(speed_input.value);
}

function setInitialGrid() {
    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            initial_grid[i][j] = {
                a: old_grid[i][j].a,
                b: old_grid[i][j].b
            }
        }
    }
}

function clearGrid() {
    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            old_grid[i][j].a = 1;
            old_grid[i][j].b = 0;
            new_grid[i][j].a = 1;
            new_grid[i][j].b = 0;
            initial_grid[i][j].a = 1;
            initial_grid[i][j].b = 0;
        }
    }
}

function normaliseInitials() {
    let sum = initial_a + initial_b;
    initial_a /= sum;
    initial_b /= sum;
}

function normaliseWeights() {
    let sum = 4 * (adjacent_weight + diagonal_weight);
    adjacent_weight /= sum;
    diagonal_weight /= sum;
}

function safeGetA(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].a;
}

function safeGetB(i, j) {
    if (i < 0 || i >= canvas_height || j < 0 || j >= canvas_width) {
        return 0;
    }
    else return old_grid[i][j].b;
}

function limit(value) {
    if (value > 1) {
        return 1;
    }
    else if (value < 0) {
        return 0;
    }
    else {
        return value;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}