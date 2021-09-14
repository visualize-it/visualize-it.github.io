let rho = 28;
let sigma = 10;
let beta = 8.0 / 3;

let dt, scale;
let x = 0.01, y = 0, z = 0, dx, dy, dz;

let points = [];
let steps_per_frame;
let hue, start_hue;

function update() {
    for (let steps = 0; steps < steps_per_frame; steps++) {
        dx = sigma * (y - x);
        dy = x * (rho - z) - y;
        dz = x * y - beta * z;

        x += dx * dt;
        y += dy * dt;
        z += dz * dt;

        points.push({ x: x, y: y, z: z });
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    hue = start_hue;

    for (let i = 1; i < points.length; i++) {
        context.strokeStyle = `hsl(${hue}, 50%, 50%)`;
        context.beginPath();
        context.moveTo((canvas_width / 2) + (points[i - 1].x * scale), (canvas_height / 2) + (points[i - 1].y * scale));
        context.lineTo((canvas_width / 2) + (points[i].x * scale), (canvas_height / 2) + (points[i].y * scale));
        context.stroke();
        hue += 1;

        if (hue > 255) {
            hue = 0;
        }
    }
}

function updateParams(variable) {
    if(variable == "rho") {
        rho = parseFloat(rho_input.value);
    }
    if(variable == "sigma") {
        sigma = parseFloat(sigma_input.value);
    }
    if(variable == "beta") {
        beta = parseFloat(beta_input.value);
    }
}

function initParams() {
    rho_input.value = "28";
    sigma_input.value = "10";
    beta_input.value = "2.67";

    updateParams("rho");
    updateParams("sigma");
    updateParams("beta");

    dt = 0.01;
    scale = 6;
    start_hue = Math.random() * 255;
    steps_per_frame = 10;

    context.lineWidth = 2;
}

function zoomIn() {
    scale += 1;
}

function zoomOut() {
    scale -= 1;
}

function restart() {
    points = [];

    updateParams("rho");
    updateParams("sigma");
    updateParams("beta");
}