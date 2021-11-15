let canvas_1 = document.getElementById("sine-cosine");
let context_1 = canvas_1.getContext("2d");

let slider_1 = document.getElementById("slider-1");
let angle_1 = document.getElementById("angle-1");
let type_1 = document.getElementById("type-1");

let sin = document.getElementById("sin");
let cos = document.getElementById("cos");

canvas_1.width = canvas_width;
canvas_1.height = canvas_height;

let animating = true;

function drawRaw_1() {
    context_1.strokeStyle = "#ffffff";
    context_1.beginPath();
    context_1.moveTo(5, canvas_height / 2);
    context_1.lineTo(canvas_width - 5, canvas_height / 2);
    context_1.stroke();

    context_1.beginPath();
    context_1.moveTo(canvas_width / 2, 5);
    context_1.lineTo(canvas_width / 2, canvas_height - 5);
    context_1.stroke();

    context_1.beginPath();
    context_1.arc(canvas_width / 2, canvas_height / 2, canvas_height / 3, 0, 2 * Math.PI);
    context_1.stroke();

    context_1.beginPath();
    context_1.arc(canvas_width / 2, canvas_height / 2, canvas_height / 10, -radian(slider_1.value), 0);
    context_1.stroke();
}

function drawLine_1() {
    context_1.strokeStyle = "#ffffff";
    context_1.beginPath();
    context_1.moveTo(canvas_width / 2, canvas_height / 2);
    context_1.lineTo(canvas_width / 2 + (Math.cos(Math.PI * slider_1.value / 180)) * canvas_height / 3, canvas_height / 2 + (-Math.sin(radian(slider_1.value))) * canvas_height / 3);
    context_1.stroke();
}

function drawPerpendiculars_1() {
    // Perpendicular to X-axis
    context_1.strokeStyle = "#ffffff";
    context_1.beginPath();
    context_1.moveTo(canvas_width / 2 + (Math.cos(Math.PI * slider_1.value / 180)) * canvas_height / 3, canvas_height / 2 + (-Math.sin(radian(slider_1.value))) * canvas_height / 3);
    context_1.lineTo(canvas_width / 2, canvas_height / 2 + (Math.sin(-Math.PI * slider_1.value / 180)) * canvas_height / 3);
    context_1.stroke();

    // Perpendicular to Y-axis
    context_1.strokeStyle = "#ffffff";
    context_1.beginPath();
    context_1.moveTo(canvas_width / 2 + (Math.cos(radian(slider_1.value))) * canvas_height / 3, canvas_height / 2 + (-Math.sin(radian(slider_1.value))) * canvas_height / 3);
    context_1.lineTo(canvas_width / 2 + (Math.cos(radian(slider_1.value))) * canvas_height / 3, canvas_height / 2);
    context_1.stroke();
}

function drawProjections_1() {
    context_1.strokeStyle = "#0000ff";
    context_1.lineWidth = 3;
    context_1.beginPath();
    context_1.moveTo(canvas_width / 2, canvas_height / 2);
    context_1.lineTo(canvas_width / 2 + (Math.cos(radian(slider_1.value))) * canvas_height / 3, canvas_height / 2);
    context_1.stroke();

    context_1.strokeStyle = "#ff0000";
    context_1.lineWidth = 3;
    context_1.beginPath();
    context_1.moveTo(canvas_width / 2, canvas_height / 2);
    context_1.lineTo(canvas_width / 2, canvas_height / 2 + (-Math.sin(radian(slider_1.value))) * canvas_height / 3);
    context_1.stroke();
}

function render_1() {
    context_1.fillStyle = "#000000";
    context_1.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw_1();
    drawLine_1();
    drawPerpendiculars_1();
    drawProjections_1();

    if(animating) {
        update_animation();
    }
}

function update_animation() {
    slider_1.value = Number.parseFloat(slider_1.value) + 1;
    console.log(slider_1.value);
    while (slider_1.value >= 360) {
        slider_1.value = slider_1.value - 360;
    }
    angle_1.innerHTML = `&theta; = ${slider_1.value}<sup>o</sup>`;

    sin.innerHTML = `Sin(&theta;) = length of red line = ${Math.sin(radian(slider_1.value)).toFixed(4)}`;
    cos.innerHTML = `Cos(&theta;) = length of blue line = ${Math.cos(radian(slider_1.value)).toFixed(4)}`;
}

function update_1(changed) {
    animating = false;
    if (changed == 'slide') {
        angle_1.innerHTML = `&theta; = ${slider_1.value}&deg;`;
    }
    else if (changed == 'typed') {
        if (type_1.value != "") {
            slider_1.value = type_1.value;
            angle_1.innerHTML = `&theta; = ${type_1.value}`;
        }
    }
    sin.innerHTML = `Sin(&theta;) = length of red line = ${Math.sin(radian(slider_1.value)).toFixed(4)}`;
    cos.innerHTML = `Cos(&theta;) = length of blue line = ${Math.cos(radian(slider_1.value)).toFixed(4)}`;
}