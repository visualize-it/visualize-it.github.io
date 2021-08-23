let old_grid, new_grid;

let initial_a, initial_b;
let diffusion_a, diffusion_b;
let increase_a, decrease_a;
let increase_b, decrease_b;

let diagonal_weight, adjacent_weight;

let dt, time, speed;

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

function updateParams(variable) {

}

function initParams() {
    console.log("Resolution:", canvas_width, canvas_height);
    old_grid = new2dArray(canvas_height, canvas_width);
    new_grid = new2dArray(canvas_height, canvas_width);

    initial_a = 1;
    initial_b = 0;
    normaliseInitials();

    diffusion_a = 1;
    diffusion_b = 0.5;

    adjacent_weight = 0.2;
    diagonal_weight = 0.05;
    normaliseWeights();

    increase_a = 0.055;
    decrease_a = 0;
    increase_b = 0;
    decrease_b = 0.062;

    dt = 1;
    time = 0;
    speed = 1;

    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            old_grid[i][j] = {
                a: 1,
                b: 0
            };
            new_grid[i][j] = {
                a: 1,
                b: 0
            }
        }
    }

    for (let i = canvas_height / 2 - 200; i < canvas_height / 2 + 200; i++) {
        for (let j = canvas_width / 2 - 200; j < canvas_width / 2 + 200; j++) {
            old_grid[i][j].b = 1;
        }
    }
}

function handleBorders() {
    let i = 0;
    for (let j = 0; j < canvas_width; j++) {
        a = old_grid[i][j].a;
        b = old_grid[i][j].b;

        new_grid[i][j].a = a + (diffusion_a * safeLapA(i, j) - a * b * b + increase_a * (1 - a)) * dt;
        new_grid[i][j].b = b + (diffusion_b * safeLapB(i, j) + a * b * b - (decrease_b + increase_a) * b) * dt;
    }
    i = canvas_height - 1;
    for (let j = 0; j < canvas_width; j++) {
        a = old_grid[i][j].a;
        b = old_grid[i][j].b;

        new_grid[i][j].a = a + (diffusion_a * safeLapA(i, j) - a * b * b + increase_a * (1 - a)) * dt;
        new_grid[i][j].b = b + (diffusion_b * safeLapB(i, j) + a * b * b - (decrease_b + increase_a) * b) * dt;
    }
    let j = 0;
    for (let i = 0; i < canvas_height; i++) {
        a = old_grid[i][j].a;
        b = old_grid[i][j].b;

        new_grid[i][j].a = a + (diffusion_a * safeLapA(i, j) - a * b * b + increase_a * (1 - a)) * dt;
        new_grid[i][j].b = b + (diffusion_b * safeLapB(i, j) + a * b * b - (decrease_b + increase_a) * b) * dt;
    }
    j = canvas_width - 1;
    for (let i = 0; i < canvas_height; i++) {
        a = old_grid[i][j].a;
        b = old_grid[i][j].b;

        new_grid[i][j].a = a + (diffusion_a * safeLapA(i, j) - a * b * b + increase_a * (1 - a)) * dt;
        new_grid[i][j].b = b + (diffusion_b * safeLapB(i, j) + a * b * b - (decrease_b + increase_a) * b) * dt;
    }
}