let waves = [];

let graph_xrange, graph_xscale;
let graph_y, graph_yrange;

let circle_y, circle_radius;

let sampling_freq = 1;
let dtheta = 0;

let updated;

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawGraph();
    drawCircle();
}

function drawCircle() {
    context.beginPath();
    context.moveTo(canvas_width / 2, circle_y - circle_radius);
    context.lineTo(canvas_width / 2, circle_y + circle_radius);
    context.stroke();

    context.beginPath();
    context.moveTo(canvas_width / 2 - circle_radius, circle_y);
    context.lineTo(canvas_width / 2 + circle_radius, circle_y);
    context.stroke();

    if (waves.length > 0) {
        let x_values = [];
        let y_values = [];
        let r, theta;

        context.beginPath();
        for (let i = 0; i < graph_xrange; i += 0.001) {
            r = 0;
            for (let wave of waves) {
                if (wave["type"] == "sin") {
                    r += Math.sin(2 * Math.PI * wave["freq"] * i);
                }
                else if (wave["type"] == "cos") {
                    r += Math.cos(2 * Math.PI * wave["freq"] * i);
                }
            }
            theta = i * 2 * Math.PI * sampling_freq;
            x_values.push(r * Math.cos(theta));
            y_values.push(r * Math.sin(theta));
            r = 0.9 * circle_radius * r / waves.length;

            context.lineTo(canvas_width / 2 + r * Math.cos(theta), circle_y - r * Math.sin(theta));
        }
        context.stroke();

        let com_x = 0, com_y = 0;
        for (let i = 0; i < x_values.length; i++) {
            com_x += x_values[i];
            com_y += y_values[i];
        }
        com_x /= x_values.length;
        com_y /= y_values.length;
        let magnitude = Math.sqrt(com_x * com_x + com_y * com_y);

        fourier_display.innerHTML = `F(${sampling_freq}) = ${com_x.toFixed(2)} + (${com_y.toFixed(2)})i`;
        fourier_display.innerHTML += `<br> Magnitude = ${magnitude.toFixed(2)}`;
    }
    else {
        fourier_display.innerHTML = "F(all) = 0 <br> Magnitude = 0";
    }
}

function drawGraph() {
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(0, graph_y);
    context.lineTo(canvas_width, graph_y);
    context.stroke();

    let output = [];
    for (let i = 0; i < canvas_width; i++) {
        output.push(0);
    }

    if (waves.length > 0) {
        for (let wave of waves) {
            if (wave["type"] == "sin") {
                for (let i = 0; i < canvas_width; i++) {
                    output[i] += Math.sin(2 * Math.PI * wave["freq"] * i * graph_xscale);
                }

            }
            else if (wave["type"] == "cos") {
                for (let i = 0; i < canvas_width; i++) {
                    output[i] += Math.cos(2 * Math.PI * wave["freq"] * i * graph_xscale);
                }
            }
        }

        let max_abs = 0;
        for (let i = 0; i < canvas_width; i++) {
            if (Math.abs(output[i]) > max_abs) {
                max_abs = Math.abs(output[i]);
            }
        }

        context.beginPath();
        for (let i = 0; i < canvas_width; i++) {
            context.lineTo(i, graph_y * (1 - output[i] / max_abs));
        }
        context.stroke();

        waves_display.innerHTML = "f(x) = ";
        for (let i = 0; i < waves.length; i++) {
            waves_display.innerHTML += `${waves[i]["type"]}(2&pi;[${waves[i]["freq"]}]x)`;
            if (i < waves.length - 1) {
                waves_display.innerHTML += " + ";
            }
        }
    }
    else {
        waves_display.innerHTML = "f(x) = 0";
    }
}

function updateParams(variable) {
    if (variable == "freq") {
        freq_display.innerHTML = `Wave frequency: ${freq_input.value} Hz`;
    }
    else if (variable == "sampling-freq") {
        sampling_freq_display.innerHTML = `Sampling frequency: ${sampling_freq_input.value} Hz`;
        sampling_freq = parseFloat(sampling_freq_input.value);
        updated = true;
    }
}

function addWave() {
    let frequency = parseFloat(freq_input.value);
    let type = document.getElementById("wave-type").value;

    waves.push({
        "freq": frequency,
        "type": type
    });
    updated = true;
}

function clearWaves() {
    waves = [];
    updated = true;
}

function initParams() {
    graph_xrange = 1;
    graph_xscale = graph_xrange / canvas_width;
    dtheta = 1 / Math.PI;

    graph_y = 0.1 * canvas_height;
    circle_y = 0.6 * canvas_height;
    circle_radius = 0.35 * canvas_height;

    waves.push({
        "type": "sin",
        "freq": 1
    });

    updated = true;

    updateParams('freq');
    updateParams('sampling-freq');
}