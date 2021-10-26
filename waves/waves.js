let wave = [];
let disturbance_position;

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.fillStyle = "#0000ff";
    context.fillRect(0, canvas_height / 2 - disturbance_position - 5, canvas_width, 10);

    context.lineWidth = 2;
    context.strokeStyle = "#ffffff";
    context.beginPath();
    for(let i = 0; i < canvas_width; i++) {
        context.lineTo(i, canvas_height / 2 - wave[i]);
    }
    context.stroke();
}

function updateParams(variable) {

}

function initParams() {
    wave = [];
    for(let i = 0; i < canvas_width; i++) {
        wave.push(0);
    }
    disturbance_position = 0;
}