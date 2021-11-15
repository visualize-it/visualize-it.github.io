let canvas_2 = document.getElementById("tan-cot");
context_2 = canvas_2.getContext("2d");

let slider_2 = document.getElementById("slider-2");
let angle_2 = document.getElementById("angle-2");
let type_2 = document.getElementById("type-2");

let tan = document.getElementById("tan");
let cot = document.getElementById("cot");

canvas_2.width = canvas_width;
canvas_2.height = canvas_height;

function drawRaw_2() {
    context_2.strokeStyle = "#ffffff";
    context_2.beginPath();
    context_2.moveTo(5, canvas_height/2);
    context_2.lineTo(canvas_width-5, canvas_height/2);
    context_2.stroke();

    context_2.beginPath();
    context_2.moveTo(canvas_width / 2, 5);
    context_2.lineTo(canvas_width / 2, canvas_height - 5);
    context_2.stroke();

    context_2.beginPath();
    context_2.arc(canvas_width / 2, canvas_height / 2, canvas_height / 4, 0, 2 * Math.PI);
    context_2.stroke();

    context_2.beginPath();
    context_2.arc(canvas_width / 2, canvas_height / 2, canvas_height / 14, -radian(slider_2.value), 0);
    context_2.stroke();
}

function drawLine_2() {
    context_2.lineWidth = 3;
    context_2.strokeStyle = "#ffffff";
    context_2.beginPath();
    context_2.moveTo(canvas_width / 2, canvas_height / 2);
    context_2.lineTo(canvas_width / 2 + (Math.cos(radian(slider_2.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_2.value))) * canvas_height / 4);
    context_2.stroke();
}

function drawTangents_2() {
    // tangent
    context_2.strokeStyle = "#0000ff";
    context_2.beginPath();
    context_2.moveTo(canvas_width / 2 + (Math.cos(radian(slider_2.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_2.value))) * canvas_height / 4);
    context_2.lineTo(canvas_width / 2 + (1/Math.cos(radian(slider_2.value))) * canvas_height / 4 , canvas_height / 2);
    context_2.stroke();

    // cotangent
    context_2.strokeStyle = "#ff0000";
    context_2.beginPath();
    context_2.moveTo(canvas_width / 2 + (Math.cos(radian(slider_2.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_2.value))) * canvas_height / 4);
    context_2.lineTo(canvas_width / 2, canvas_height / 2 - (1/Math.sin(radian(slider_2.value))) * canvas_height / 4);
    context_2.stroke();
}

function render_2() {
    context_2.fillStyle = "#000000";
    context_2.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw_2();
    drawLine_2();
    drawTangents_2();
}

function update_2(changed) {
    if(changed == 'slide') {
        angle_2.innerHTML = `&theta; = ${slider_2.value}&deg;`;
    }
    else if(changed == 'typed') {
        if(type_2.value != "") {
            slider_2.value = type_2.value;
            angle_2.innerHTML = `&theta; = ${type_2.value}`;
        }
    }
    tan.innerHTML = `Tan(&theta;) = length of blue line = ${Math.tan(radian(slider_2.value)).toFixed(4)}`;
    cot.innerHTML = `Cot(&theta;) = length of red line = ${(1/Math.tan(radian(slider_2.value))).toFixed(4)}`;
}
