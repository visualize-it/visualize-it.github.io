let points, point_radius;

let extent;

let degree, thetas;

let alpha = 1;

let iterationCount = 0;
let manualIterateCount = 0;
let autoIterating = false;
let autoIterateInterval = null;

function update() {
    if (points.length > 0) {
        let temp_thetas = [];
        for (let i = 0; i < thetas.length; i++) {
            temp_thetas.push(0);
        }

        for (let j = 0; j < thetas.length; j++) {
            let sum = 0;
            for (let i = 0; i < points.length; i++) {
                sum += (getY(points[i].x) - points[i].y) * Math.pow(points[i].x, j);
            }
            temp_thetas[j] = thetas[j] - alpha * sum / points.length;
        }

        thetas = temp_thetas;
        iterationCount++;
        updateParams("cost");
        updateParams("coeffs");
        updateParams("iteration");
    }
}

function iterateManual() {
    update();
    manualIterateCount++;
    updateParams("iteration");
}

function toggleAutoIterate() {
    if (autoIterating) {
        stopAutoIterate();
    } else {
        startAutoIterate();
    }
}

function startAutoIterate() {
    autoIterating = true;
    document.getElementById("auto-btn").innerHTML = "Stop Auto";
    autoIterateInterval = setInterval(() => {
        update();
    }, 50);
}

function stopAutoIterate() {
    autoIterating = false;
    document.getElementById("auto-btn").innerHTML = "Start Auto";
    if (autoIterateInterval) {
        clearInterval(autoIterateInterval);
        autoIterateInterval = null;
    }
}

function updateDegreeFromText() {
    let textValue = document.getElementById("degree-text-input").value;
    if (textValue !== "") {
        let value = Math.max(0, Math.min(100, parseInt(textValue)));
        document.getElementById("degree-input").value = value;
        updateParams("degree");
    }
}

function applyManualCoefficients() {
    let input = document.getElementById("manual-coeffs-input").value.trim();
    if (input === "") {
        alert("Please enter coefficients separated by commas");
        return;
    }
    
    try {
        let coefficients = input.split(",").map(c => parseFloat(c.trim()));
        
        // Validate input
        if (coefficients.length > 100) {
            alert("Maximum 100 polynomial coefficients allowed");
            return;
        }
        
        if (coefficients.some(isNaN)) {
            alert("Invalid input. Please enter numbers separated by commas");
            return;
        }
        
        // Update degree and thetas
        degree = coefficients.length - 1;
        document.getElementById("degree-input").value = degree;
        document.getElementById("degree-text-input").value = degree;
        thetas = coefficients;
        
        iterationCount = 0;
        manualIterateCount = 0;
        
        updateParams("degree");
        updateParams("cost");
        updateParams("coeffs");
        updateParams("iteration");
        
        alert(`Polynomial set with degree ${degree} (${coefficients.length} coefficients)`);
    } catch (e) {
        alert("Error parsing coefficients: " + e.message);
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(0, canvas_height / 2);
    context.lineTo(canvas_width, canvas_height / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(canvas_width / 2, 0);
    context.lineTo(canvas_width / 2, canvas_height);
    context.stroke();

    context.fillStyle = "#ffffff";
    for (let point of points) {
        context.beginPath();
        context.arc(canvas_width / 2 + point.x * extent, canvas_height / 2 - point.y * extent, 5, 0, 2 * Math.PI);
        context.fill();
    }

    context.fillStyle = "#0000ff";
    for (let x = -1; x < 1; x += 1 / canvas_width) {
        let y = getY(x);
        context.fillRect(canvas_width / 2 + x * extent, canvas_height / 2 - y * extent, 2, 2);
    }
}

function getY(x) {
    let value = 0;
    for (let i = 0; i < degree + 1; i++) {
        value += thetas[i] * Math.pow(x, i);
    }
    return value;
}

function updateParams(variable) {
    if (variable == "degree") {
        degree = Number.parseInt(degree_input.value);
        degree_text_input.value = degree;
        degree_display.innerHTML = `Degree of fitting polynomial: ${degree}`;
        thetas = [];
        for (let i = 0; i < degree + 1; i++) {
            thetas.push(0);
        }
        updateParams("coeffs");
    }
    if (variable == "alpha") {
        alpha = Math.pow(10, Number.parseFloat(alpha_input.value));
        alpha_display.innerHTML = `Learning rate: ${alpha.toFixed(3)}`;
    }
    if (variable == "cost") {
        if (points.length > 0) {
            cost_display.innerHTML = `Cost: ${calculateCost().toFixed(6)}`;
        }
        else {
            cost_display.innerHTML = "";
        }
    }
    if (variable == "coeffs") {
        let string = "";
        for (let i = 0; i < thetas.length; i++) {
            if (i == 0) {
                string += `${thetas[i].toFixed(6)}`;
            }
            else if (i == 1) {
                string += ` + ${thetas[i].toFixed(6)} x`;
            }
            else {
                string += ` + ${thetas[i].toFixed(6)} x<sup>${i}</sup>`;
            }
        }
        coeffs_display.innerHTML = `Fitting polynomial: ${string}`;
    }
    if (variable == "iteration") {
        let iterationDisplay = document.getElementById("iteration-display");
        iterationDisplay.innerHTML = `Total Iterations: ${iterationCount} | Manual Clicks: ${manualIterateCount}`;
    }
}

function initParams() {
    points = [];
    point_radius = canvas_width / 40;
    extent = canvas_width / 2;

    updateParams("degree");
    updateParams("alpha");
    updateParams("cost");
    updateParams("coeffs");
    updateParams("iteration");
}

function calculateCost() {
    let sum = 0;
    for (let point of points) {
        sum += Math.pow(getY(point.x) - point.y, 2);
    }
    return sum / (2 * points.length);
}

function addPoint() {
    let x = (click_x - canvas_width / 2) / extent;
    let y = (canvas_height / 2 - click_y) / extent;

    if (!checkPoint(x, y)) {
        points.push({
            x: x,
            y: y
        });
    }
}

function checkPoint(x, y) {
    for (let point of points) {
        if (Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)) < point_radius / extent) {
            points = points.filter(p => p !== point);
            return true;
        }
    }
    return false;
}

function resetTheta() {
    for (let i = 0; i < thetas.length; i++) {
        thetas[i] = 0;
    }
    stopAutoIterate();
    iterationCount = 0;
    manualIterateCount = 0;
    updateParams("cost");
    updateParams("coeffs");
    updateParams("iteration");
}

function clearPoints() {
    points = [];
    stopAutoIterate();
    iterationCount = 0;
    manualIterateCount = 0;
    resetTheta();
    updateParams("cost");
    updateParams("coeffs");
    updateParams("iteration");
}