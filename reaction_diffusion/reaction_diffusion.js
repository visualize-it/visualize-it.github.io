let old_grid, new_grid, initial_grid;

let initial_a, initial_b;
let diffusion_a, diffusion_b;
let increase_a, decrease_b;

let diagonal_weight, adjacent_weight;

let dt, time, speed;

let pattern;

let paused, drawMode;

let click_x, click_y, thickness

function update() {
    for (let iteration = 0; iteration < speed; iteration++) {
        let start = performance.now();
        let a, b;
        let laplace_a, laplace_b;
        for (let i = 0; i < canvas_height; i++) {
            for (let j = 0; j < canvas_width; j++) {
                a = old_grid[i][j].a;
                b = old_grid[i][j].b;

                laplace_a = -a;
                laplace_b = -b;

                if (i < 1 || i > canvas_height - 2 || j < 1 || j > canvas_width - 2) {
                    laplace_a += adjacent_weight * (safeGetA(i-1, j) + safeGetA(i, j-1) + safeGetA(i+1, j) + safeGetA(i, j+1));
                    laplace_b += adjacent_weight * (safeGetB(i-1, j) + safeGetB(i, j-1) + safeGetB(i+1, j) + safeGetB(i, j+1));
                    laplace_a += diagonal_weight * (safeGetA(i-1, j-1) + safeGetA(i-1, j+1) + safeGetA(i+1, j-1) + safeGetA(i+1, j+1));
                    laplace_b += diagonal_weight * (safeGetB(i-1, j-1) + safeGetB(i-1, j+1) + safeGetB(i+1, j-1) + safeGetB(i+1, j+1));
                }
                else {
                    laplace_a += adjacent_weight * (old_grid[i - 1][j].a + old_grid[i][j - 1].a + old_grid[i + 1][j].a + old_grid[i][j + 1].a);
                    laplace_b += adjacent_weight * (old_grid[i - 1][j].b + old_grid[i][j - 1].b + old_grid[i + 1][j].b + old_grid[i][j + 1].b);
                    laplace_a += diagonal_weight * (old_grid[i - 1][j - 1].a + old_grid[i - 1][j + 1].a + old_grid[i + 1][j - 1].a + old_grid[i + 1][j + 1].a);
                    laplace_b += diagonal_weight * (old_grid[i - 1][j - 1].b + old_grid[i - 1][j + 1].b + old_grid[i + 1][j - 1].b + old_grid[i + 1][j + 1].b);
                }

                new_grid[i][j].a = limit(a + (diffusion_a * laplace_a - a * b * b + increase_a * (1 - a)) * dt);
                new_grid[i][j].b = limit(b + (diffusion_b * laplace_b + a * b * b - (decrease_b + increase_a) * b) * dt);
            }
        }
        old_grid = new_grid;

        time += dt;
    }
}

function render() {
    let id = context.getImageData(0, 0, canvas_width, canvas_height);
    let pixels = id.data;

    let position = 0, grayscale = 0;
    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            position = (i * canvas_width + j) * 4;
            grayscale = Math.floor(255 * (old_grid[i][j].a - old_grid[i][j].b));
            pixels[position] = grayscale;
            pixels[position + 1] = grayscale;
            pixels[position + 2] = grayscale;
            pixels[position + 3] = 255;
        }
    }

    context.putImageData(id, 0, 0);
}

function setPattern(pattern_input) {
    if(pattern_input == "squares") {
        let square_length = 10;
        let num_squares = 100;

        for(let square = 0; square < num_squares; square++) {
            let x = randInt(square_length, canvas_width - square_length);
            let y = randInt(square_length, canvas_height - square_length);

            console.log(x, y);
            for(let i = y; i < y + square_length; i++) {
                for(let j = x; j < x + square_length; j++) {
                    old_grid[i][j].b = 1;
                }
            }
        }
    }
    else if(pattern_input == "big square") {
        let square_half_length = 0.35 * canvas_width;
        
        for(let i = canvas_height / 2 - square_half_length; i < canvas_height / 2 + square_half_length; i++) {
            for(let j = canvas_width / 2 - square_half_length; j < canvas_width / 2 + square_half_length; j++) {
                old_grid[Math.floor(i)][Math.floor(j)].b = 1;
            }
        }
    }
    else if(pattern_input == "small square") {
        let square_half_length = 5;

        for(let i = canvas_height / 2 - square_half_length; i < canvas_height / 2 + square_half_length; i++) {
            for(let j = canvas_width / 2 - square_half_length; j < canvas_width / 2 + square_half_length; j++) {
                old_grid[Math.floor(i)][Math.floor(j)].b = 1;
            }
        }
    }
}

function manageClick() {
    if(drawMode) {
        for (let i = 0; i < canvas_height; i++) {
            for (let j = 0; j < canvas_width; j++) {
                if(distance(j, i, click_x, click_y) < thickness) {
                    old_grid[i][j].b = 1;
                }
            }
        }
    }
}

function initialize() {
    paused = false;

    old_grid = new2dArray(canvas_height, canvas_width);
    new_grid = new2dArray(canvas_height, canvas_width);
    initial_grid = new2dArray(canvas_height, canvas_width);

    initial_a = 1;
    initial_b = 0;
    normaliseInitials();

    adjacent_weight = 0.2;
    diagonal_weight = 0.05;
    normaliseWeights();

    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            old_grid[i][j] = {
                a: 1,
                b: 0
            };
            new_grid[i][j] = {
                a: 0,
                b: 0
            }
        }
    }
    
    setPattern(pattern);
    setInitialGrid();
    time = 0;
}

function initParams() {
    drawMode = false;
    thickness = 5;
    pattern = "big square";

    defaults();
    initialize();
}

function initPattern(pattern_input) {
    pattern = pattern_input;
    initialize();
}

function defaults() {
    diffusion_a_input.value = 1;
    diffusion_b_input.value = 0.5;
    increase_a_input.value = 0.055;
    decrease_b_input.value = 0.062;
    prec_input.value = 1;
    speed_input.value = 1;

    updateValues();
}

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