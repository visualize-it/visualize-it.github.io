let graph_xrange, graph_xscale;
let graph_y, graph_yrange;

let waves = [];

let updated;

function update() {

}

function render() {
    context.fillRect(0, 0, canvas_width, canvas_height);

    drawGraph();
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
    graph_y = 0.1 * canvas_height;

    waves.push({
        "type": "sin",
        "freq": 1
    });

    updated = true;

    updateParams('freq');
}