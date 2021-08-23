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
    pattern = "frame";

    defaults();
    speed_input.value = 5;
    initialize();
}

function initPattern(pattern_input) {
    pattern = pattern_input;
    window.scrollTo(0, 750);
    initialize();
}

function defaults() {
    diffusion_a_input.value = 1;
    diffusion_b_input.value = 0.5;
    increase_a_input.value = 0.055;
    decrease_b_input.value = 0.062;
    prec_input.value = 1;
    speed_input.value = 5;

    updateValues();
}

