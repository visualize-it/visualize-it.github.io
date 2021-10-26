let wave = [];
let disturbance_position;
let velocity, dt;

let drawing, wave_name;
let iteration, limit;

let sine_wave_prec, square_wave_prec, triangle_wave_prec;

function update() {
    if (drawing) {
        if (wave_name == "sine") {
            if (iteration < limit) {
                disturbance_position = 0.4 * canvas_height * Math.sin(iteration);
                iteration += sine_wave_prec;
            }
            else {
                drawing = false;
            }
        }
        else if (wave_name == "square") {
            if (iteration < limit) {
                if (iteration < 1) {
                    disturbance_position = 0.4 * canvas_height;
                }
                else {
                    disturbance_position = -0.4 * canvas_height;
                }
                iteration += square_wave_prec;
            }
            else {
                drawing = false;
                disturbance_position = 0;
            }
        }
        else if(wave_name == "triangle") {
            if(iteration < limit) {
                if (iteration < 1) {
                    disturbance_position = 0.4 * iteration * canvas_height;
                }
                else {
                    disturbance_position = -0.4 * (2 - iteration) * canvas_height;
                }
                iteration += triangle_wave_prec;
            }
            else {
                drawing = false;
            }
        }
    }

    wave[0].current_position = disturbance_position;

    let temp_wave = [];
    for (let point of wave) {
        temp_wave.push({
            previous_position: point.previous_position,
            current_position: point.current_position
        });
    }

    let laplacian, laplacian_factor = Math.pow(velocity * dt, 2);
    let current_position;
    for (let i = 1; i < canvas_width - 1; i++) {
        laplacian = 0.5 * (temp_wave[i - 1].current_position + temp_wave[i + 1].current_position) - temp_wave[i].current_position;
        current_position = temp_wave[i].current_position;
        wave[i].current_position = 2 * (laplacian_factor * laplacian + temp_wave[i].current_position) - temp_wave[i].previous_position;
        wave[i].previous_position = current_position;
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.fillStyle = "#0000ff";
    context.fillRect(0, canvas_height / 2 - disturbance_position - 5, canvas_width, 10);

    context.lineWidth = 2;
    context.strokeStyle = "#ffffff";
    context.beginPath();
    for (let i = 0; i < canvas_width; i++) {
        context.lineTo(i, canvas_height / 2 - wave[i].current_position);
    }
    context.stroke();
}

function updateParams(variable) {

}

function initParams() {
    wave = [];
    for (let i = 0; i < canvas_width; i++) {
        wave.push({
            previous_position: 0,
            current_position: 0,
        });
    }

    disturbance_position = 0;
    velocity = 100;
    dt = 0.01;
    drawing = false;

    sine_wave_prec = 2 * Math.PI / 100;
    square_wave_prec = 0.01;
    triangle_wave_prec = 0.01;
}

function resetWave() {
    wave = [];
    for (let i = 0; i < canvas_width; i++) {
        wave.push({
            previous_position: 0,
            current_position: 0,
        });
    }
    disturbance_position = 0;
    drawing = false;
}

function sineWave() {
    drawing = true;
    iteration = 0;
    limit = 2 * Math.PI;
    wave_name = "sine";
}

function squareWave() {
    drawing = true;
    iteration = 0;
    limit = 2;
    wave_name = "square";
}

function triangleWave() {
    drawing = true;
    iteration = 0;
    limit = 2;
    wave_name = "triangle";
}

function pause() {
    if(paused) {
        paused = false;
        pause_button.innerHTML = "Pause"
    }
    else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}