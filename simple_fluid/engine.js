function velocityUpdate() {
    addForce();
    diffuse(1);
    diffuse(2);
    conserveMass();
    advect(1);
    advect(2);
    conserveMass();
}

function densityUpdate() {
    addDensity();
    diffuse(0);
    advect(0);
}

function evaporationUpdate() {
    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            density[i][j] -= evaporation_rate * density[i][j] * dt;
        }
    }
}

function addForce() {
    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            vel_x[i][j] += force_x[i - 1][j - 1] * dt;
            vel_y[i][j] += force_y[i - 1][j - 1] * dt;
        }
    }
}

function addDensity() {
    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            density[i][j] += source[i - 1][j - 1] * dt;
        }
    }
}

function diffuse(mode) {
    let grid, diffusion_rate;

    if (mode == 0) {
        grid = density;
        diffusion_rate = diffusion;
    }
    else if (mode == 1) {
        grid = vel_x;
        diffusion_rate = viscosity;
    }
    else {
        grid = vel_y;
        diffusion_rate = viscosity;
    }
    let init_grid = make2DArray(num_cells + 2, num_cells + 2, 0);
    copyArray(grid, init_grid);

    let diffusion_constant = diffusion_rate * dt * num_cells * num_cells;

    // Gauss Seidel Relaxation
    for (let relaxation_step = 0; relaxation_step < velocity_relaxation; relaxation_step++) {
        for (let i = 1; i <= num_cells; i++) {
            for (let j = 1; j <= num_cells; j++) {
                grid[i][j] = (init_grid[i][j] + diffusion_constant * (grid[i - 1][j] + grid[i + 1][j] + grid[i][j - 1] + grid[i][j + 1])) / (1 + 4 * diffusion_constant);
            }
        }
        enforceBoundary(grid, mode);
    }
}

function advect(mode) {
    let grid;
    if (mode == 0) {
        grid = density;
    }
    else if (mode == 1) {
        grid = vel_x;
    }
    else {
        grid = vel_y;
    }

    let init_grid = make2DArray(num_cells + 2, num_cells + 2, 0);
    copyArray(grid, init_grid);

    let dt_mod = dt * num_cells;
    let x, y;
    let i0, j0, i1, j1;
    let s0, t0, s1, t1;

    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            // go back in time
            x = i - dt_mod * vel_x[i][j];
            y = j - dt_mod * vel_y[i][j];

            // keep within range
            if (x < 0.5) {
                x = 0.5;
            }
            if (x > num_cells + 0.5) {
                x = num_cells + 0.5;
            }
            if (y < 0.5) {
                y = 0.5;
            }
            if (y > num_cells + 0.5) {
                y = num_cells + 0.5;
            }

            // clamp to grid
            i0 = Math.floor(x);
            i1 = i0 + 1;
            j0 = Math.floor(y);
            j1 = j0 + 1;

            // get distance from grid points
            s1 = x - i0;
            s0 = 1 - s1;
            t1 = y - j0;
            t0 = 1 - t1;

            // interpolate
            grid[i][j] = s0 * (t0 * init_grid[i0][j0] + t1 * init_grid[i0][j1]) + s1 * (t0 * init_grid[i1][j0] + t1 * init_grid[i1][j1]);
        }
    }
    enforceBoundary(grid, 0);
}

function conserveMass() {
    let divergence = make2DArray(num_cells + 2, num_cells + 2, 0);
    let constant = 1.0 / num_cells;

    // calculate divergence
    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            divergence[i][j] = -0.5 * constant * (vel_x[i + 1][j] - vel_x[i - 1][j] + vel_y[i][j + 1] - vel_y[i][j - 1]);
        }
    }
    enforceBoundary(divergence, 0);

    // calculate pressure
    let pressure = make2DArray(num_cells + 2, num_cells + 2, 0);
    for (let relaxation_step = 0; relaxation_step < pressure_relaxation; relaxation_step++) {
        for (let i = 1; i <= num_cells; i++) {
            for (let j = 1; j <= num_cells; j++) {
                pressure[i][j] = (divergence[i][j] + pressure[i - 1][j] + pressure[i + 1][j] + pressure[i][j - 1] + pressure[i][j + 1]) / 4;
            }
        }
    }
    enforceBoundary(pressure, 0);

    // subtract pressure gradient
    for (let i = 1; i <= num_cells; i++) {
        for (let j = 1; j <= num_cells; j++) {
            vel_x[i][j] -= 0.5 * (pressure[i + 1][j] - pressure[i - 1][j]) / constant;
            vel_y[i][j] -= 0.5 * (pressure[i][j + 1] - pressure[i][j - 1]) / constant;
        }
    }
    enforceBoundary(vel_x, 1);
    enforceBoundary(vel_y, 2);
}

function enforceBoundary(grid, mode) {
    for (let i = 1; i <= num_cells; i++) {
        grid[0][i] = (mode == 1) ? -grid[1][i] : grid[1][i];
        grid[num_cells + 1][i] = (mode == 1) ? -grid[num_cells][i] : grid[num_cells][i];
        grid[i][0] = (mode == 2) ? -grid[i][1] : grid[i][1];
        grid[i][num_cells + 1] = (mode == 2) ? -grid[i][num_cells] : grid[i][num_cells];
    }

    grid[0][0] = 0.5 * (grid[1][0] + grid[0][1]);
    grid[0][num_cells + 1] = 0.5 * (grid[1][num_cells + 1] + grid[0][num_cells]);
    grid[num_cells + 1][0] = 0.5 * (grid[num_cells][0] + grid[num_cells + 1][1]);
    grid[num_cells + 1][num_cells + 1] = 0.5 * (grid[num_cells][num_cells + 1] + grid[num_cells + 1][num_cells]);
}