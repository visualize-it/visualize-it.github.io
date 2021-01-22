let a, b, m, n;
let m_prob, n_prob, num0, num1;
let gates;
let slider_conversion;
let margin, padding, offset, square_half_length, space;
let toDraw;

function update() {
    if (Math.random() < m_prob) {
        num0++;
    }
    if (Math.random() < n_prob) {
        num1++;
    }
    // display_measure.innerHTML = `Measurements: 0 = ${(num0 * 100 / (num0 + num1)).toFixed(2)}%, 1 = ${(num1 * 100 / (num0 + num1)).toFixed(2)}%`;
}

function evaluate() {
    num0 = 0;
    num1 = 0;
    m = a;
    n = b;
    let output;

    for (let gate of gates) {
        if (gate == "H") {
            output = hadamard([m, n]);
        }
        else if (gate == "X") {
            output = x([m, n]);
        }
        else if (gate == "Z") {
            output = z([m, n]);
        }
        m = output[0];
        n = output[1];
    }
    display_output.innerHTML = `Output: [${m.toFixed(4)}, ${n.toFixed(4)}]`;
    m_prob = m * m;
    n_prob = n * n;
}

function render() {
    if (toDraw) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas_width, canvas_height);

        drawStructure();
        drawGates();
        toDraw = false;
    }
}

function updateParams(variable) {
    if (variable == "top-slider") {
        a = top_slider.value / slider_conversion;
        display_top.innerHTML = `a = ${a.toFixed(4)}`;
        display_input.innerHTML = `Input: [${a.toFixed(4)}, ${b.toFixed(4)}]`;
    }
    if (variable == "bottom-slider") {
        b = bottom_slider.value / slider_conversion;
        display_bottom.innerHTML = `b = ${b.toFixed(4)}`;
        display_input.innerHTML = `Input: [${a.toFixed(4)}, ${b.toFixed(4)}]`;
    }
    if (variable == "text") {
        input_string = (input.value).split(",");
        input_a = Number.parseFloat(input_string[0]);
        input_b = Number.parseFloat(input_string[1]);

        if (input_string.length == 2 && inputsDefined(input_a, input_b) && inputsProper(input_a, input_b)) {
            a = input_a;
            b = input_b;
            top_slider.value = a * slider_conversion;
            bottom_slider.value = b * slider_conversion;
            display_top.innerHTML = `a = ${a.toFixed(4)}`;
            display_bottom.innerHTML = `b = ${b.toFixed(4)}`;
            display_input.innerHTML = `Input: [${a.toFixed(4)}, ${b.toFixed(4)}]`;
        }
    }
    evaluate();
}

function initParams() {
    margin = 0.03 * canvas_width;
    if (mobile) {
        padding = 0.2 * canvas_width;
        context.font = "20px Arial";
        offset = 5;
        square_half_length = 15;
        space = 0.7 * canvas_width;
    }
    else {
        padding = 0.15 * canvas_width;
        context.font = "30px Arial";
        offset = 10;
        square_half_length = 20;
        space = 0.8 * canvas_width;
    }

    a = 1;
    b = 0;
    slider_conversion = 2000;
    gates = ["X", "H"];
    toDraw = true;

    top_slider.min = bottom_slider.min = - slider_conversion;
    top_slider.max = bottom_slider.max = slider_conversion;

    top_slider.value = a * slider_conversion;
    bottom_slider.value = b * slider_conversion;

    display_top.innerHTML = `a = ${a.toFixed(4)}`;
    display_bottom.innerHTML = `b = ${b.toFixed(4)}`;
    display_input.innerHTML = `Input: [${a.toFixed(4)}, ${b.toFixed(4)}]`;

    input.value = "";
    evaluate();
}

function drawStructure() {
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(padding, canvas_height / 2);
    context.lineTo(canvas_width - padding, canvas_height / 2);
    context.stroke();

    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.fillText("\u03A8 in", margin, canvas_height / 2 + offset);
    context.textAlign = "right";
    context.fillText("\u03A8 out", canvas_width - margin, canvas_height / 2 + offset);
}

function drawGates() {
    if (gates.length) {
        let x_offset;

        context.strokeStyle = "#ffffff";
        context.textAlign = "center";

        for (let i = 1; i <= gates.length; i++) {
            x_offset = (i * space) / (gates.length + 1) - square_half_length + padding;
            context.beginPath();
            context.moveTo(x_offset - square_half_length, canvas_height / 2 - square_half_length);
            context.lineTo(x_offset + square_half_length, canvas_height / 2 - square_half_length);
            context.lineTo(x_offset + square_half_length, canvas_height / 2 + square_half_length);
            context.lineTo(x_offset - square_half_length, canvas_height / 2 + square_half_length);
            context.lineTo(x_offset - square_half_length, canvas_height / 2 - square_half_length);

            context.fillStyle = "#000000";
            context.fill();
            context.stroke();

            context.fillStyle = "#ffffff";
            context.fillText(gates[i - 1], x_offset, canvas_height / 2 + offset);
        }
    }
}

function addGate(gate) {
    if (gate == "H") {
        gates.push("H");
    }
    if (gate == "X") {
        gates.push("X");
    }
    if (gate == "Z") {
        gates.push("Z");
    }
    toDraw = true;
    evaluate();
}

function remove(gate) {
    if (gate == "first") {
        gates.shift();
    }
    if (gate == "last") {
        gates.pop();
    }
    if (gate == "all") {
        gates = [];
    }
    toDraw = true;
    evaluate();
}

function setInput(input) {
    if (input == "0") {
        a = 1;
        b = 0;
    }
    if (input == "1") {
        a = 0;
        b = 1;
    }
    if (input == "+") {
        a = 1 / Math.sqrt(2);
        b = a;
    }
    if (input == "-") {
        a = 1 / Math.sqrt(2);
        b = -a;
    }
    display_top.innerHTML = `a = ${a.toFixed(4)}`;
    display_bottom.innerHTML = `b = ${b.toFixed(4)}`;
    display_input.innerHTML = `Input: [${a.toFixed(4)}, ${b.toFixed(4)}]`;
    top_slider.value = a * slider_conversion;
    bottom_slider.value = b * slider_conversion;
    evaluate();
}

function x([a, b]) {
    return [b, a];
}

function hadamard([a, b]) {
    return [(a + b) / Math.sqrt(2), (a - b) / Math.sqrt(2)];
}

function z([a, b]) {
    return [a, -b];
}

function inputsProper(input_a, input_b) {
    return (input_a >= -1 && input_a <= 1 && input_b >= -1 && input_b <= 1);
}

function inputsDefined(input_a, input_b) {
    return (input_a !== undefined && !Number.isNaN(input_a) && input_b !== undefined && !Number.isNaN(input_b));
}