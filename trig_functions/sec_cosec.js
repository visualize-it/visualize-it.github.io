let canvas_3 = document.getElementById("sec-cosec");
context_3 = canvas_3.getContext("2d");

let slider_3 = document.getElementById("slider-3");
let angle_3 = document.getElementById("angle-3");
let type_3 = document.getElementById("type-3");

let sec = document.getElementById("sec");
let cosec = document.getElementById("cosec");

canvas_3.width = canvas_width;
canvas_3.height = canvas_height;

function drawRaw_3() {
    context_3.strokeStyle = "#ffffff";
    context_3.beginPath();
    context_3.moveTo(5, canvas_height/2);
    context_3.lineTo(canvas_width-5, canvas_height/2);
    context_3.stroke();

    context_3.beginPath();
    context_3.moveTo(canvas_width / 2, 5);
    context_3.lineTo(canvas_width / 2, canvas_height - 5);
    context_3.stroke();

    context_3.beginPath();
    context_3.arc(canvas_width / 2, canvas_height / 2, canvas_height / 4, 0, 2 * Math.PI);
    context_3.stroke();

    context_3.beginPath();
    context_3.arc(canvas_width / 2, canvas_height / 2, canvas_height / 14, -radian(slider_3.value), 0);
    context_3.stroke();
}

function drawLine_3() {
    context_3.lineWidth = 3;
    context_3.strokeStyle = "#ffffff";
    context_3.beginPath();
    context_3.moveTo(canvas_width / 2, canvas_height / 2);
    context_3.lineTo(canvas_width / 2 + (Math.cos(radian(slider_3.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_3.value))) * canvas_height / 4);
    context_3.stroke();
}

function drawTangents_3() {
    // tangent
    context_3.strokeStyle = "#ffffff";
    context_3.beginPath();
    context_3.moveTo(canvas_width / 2 + (Math.cos(radian(slider_3.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_3.value))) * canvas_height / 4);
    context_3.lineTo(canvas_width / 2 + (1/Math.cos(radian(slider_3.value))) * canvas_height / 4 , canvas_height / 2);
    context_3.stroke();

    // cotangent
    context_3.strokeStyle = "#ffffff";
    context_3.beginPath();
    context_3.moveTo(canvas_width / 2 + (Math.cos(radian(slider_3.value))) * canvas_height / 4, canvas_height / 2 + (-Math.sin(radian(slider_3.value))) * canvas_height / 4);
    context_3.lineTo(canvas_width / 2, canvas_height / 2 - (1/Math.sin(radian(slider_3.value))) * canvas_height / 4);
    context_3.stroke();
}

function highlight_3() {
    // secant
    context_3.strokeStyle = "#0000ff";
    context_3.beginPath();
    context_3.moveTo(canvas_width / 2, canvas_height / 2);
    context_3.lineTo(canvas_width / 2 + (1/Math.cos(radian(slider_3.value))) * canvas_height / 4 , canvas_height / 2);
    context_3.stroke();

    // cosecant
    context_3.strokeStyle = "#ff0000";
    context_3.beginPath();
    context_3.moveTo(canvas_width / 2, canvas_height / 2);
    context_3.lineTo(canvas_width / 2, canvas_height / 2 - (1/Math.sin(radian(slider_3.value))) * canvas_height / 4);
    context_3.stroke();
}

function render_3() {
    context_3.fillStyle = "#000000";
    context_3.fillRect(0, 0, canvas_width, canvas_height);

    drawRaw_3();
    drawLine_3();
    drawTangents_3();
    highlight_3();
}

function update_3(changed) {
    if(changed == 'slide') {
        angle_3.innerHTML = `&theta; = ${slider_3.value}&deg;`;
    }
    else if(changed == 'typed') {
        if(type_3.value != "") {
            slider_3.value = type_3.value;
            angle_3.innerHTML = `&theta; = ${type_3.value}`;
        }
    }
    sec.innerHTML = `Sec(&theta;) = length of blue line = ${(1/Math.cos(radian(slider_3.value))).toFixed(4)}`;
    cosec.innerHTML = `Cosec(&theta;) = length of red line = ${(1/Math.sin(radian(slider_3.value))).toFixed(4)}`;
}
