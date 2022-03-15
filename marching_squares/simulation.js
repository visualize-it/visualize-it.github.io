let func, constant;

let grid;

let res;

let scale;

function update() {

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

    if (func !== undefined) {
        let scenario;
        for (let i = 1; i * res < canvas_height - 1; i++) {
            for (let j = 1; j * res < canvas_width - 1; j++) {
                scenario = getScenario(i, j);

                context.fillStyle = "#1f51ff";
                context.fillRect(j * res, i * res, res, res);

                context.fillStyle = "#fff01f";

                // basic
                // if (scenario == 15) {
                //     // context.fillRect(j * res, i * res, res, res);
                // }

                // advanced
                if (scenario == 1 || scenario == 5) {
                    context.beginPath();
                    context.moveTo(j * res, i * res);
                    context.lineTo((j + 0.5) * res, i * res);
                    context.lineTo(j * res, (i + 0.5) * res);
                    context.lineTo(j * res, i * res);
                    context.fill();
                }
                if (scenario == 2 || scenario == 10) {
                    context.beginPath();
                    context.moveTo((j + 1) * res, i * res);
                    context.lineTo((j + 1) * res, (i + 0.5) * res);
                    context.lineTo((j + 0.5) * res, i * res);
                    context.lineTo((j + 1) * res, i * res);
                    context.fill();
                }
                if (scenario == 3) {
                    context.fillRect(j * res, i * res, res, res / 2);
                }
                if(scenario == 4 || scenario == 5) {
                    context.beginPath();
                    context.moveTo((j + 1) * res, (i + 1) * res);
                    context.lineTo((j + 0.5) * res, (i + 1) * res);
                    context.lineTo((j + 1) * res, (i + 0.5) * res);
                    context.lineTo((j + 1) * res, (i + 1) * res);
                    context.fill();
                }
                if(scenario == 6) {
                    context.fillRect((j + 0.5) * res, i * res, res / 2, res);
                }
                if(scenario == 7) {
                    context.beginPath();
                    context.moveTo(j * res, i * res);
                    context.lineTo((j + 1) * res, i * res);
                    context.lineTo((j + 1) * res, (i + 1) * res);
                    context.lineTo((j + 0.5) * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 0.5) * res);
                    context.moveTo(j * res, i * res);
                    context.fill();
                }
                if(scenario == 8 || scenario == 10) {
                    context.beginPath();
                    context.moveTo(j * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 0.5) * res);
                    context.lineTo((j + 0.5) * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 1) * res);
                    context.fill();
                }
                if(scenario == 9) {
                    context.fillRect(j * res, i * res, res / 2, res);
                }
                if(scenario == 11) {
                    context.beginPath();
                    context.moveTo(j * res, i * res);
                    context.lineTo((j + 1) * res, i * res);
                    context.lineTo((j + 1) * res, (i + 0.5) * res);
                    context.lineTo((j + 0.5) * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 1) * res);
                    context.lineTo(j * res, i * res);
                    context.fill();
                }
                if(scenario == 12) {
                    context.fillRect(j * res, (i + 0.5) * res, res, res / 2);
                }
                if (scenario == 13) {
                    context.beginPath();
                    context.moveTo(j * res, i * res);
                    context.lineTo((j + 0.5) * res, i * res);
                    context.lineTo((j + 1) * res, (i + 0.5) * res);
                    context.lineTo((j + 1) * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 1) * res);
                    context.lineTo(j * res, i * res);
                    context.fill();
                }
                if (scenario == 14) {
                    context.beginPath();
                    context.moveTo((j + 0.5) * res, i * res);
                    context.lineTo((j + 1) * res, i * res);
                    context.lineTo((j + 1) * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 1) * res);
                    context.lineTo(j * res, (i + 0.5) * res);
                    context.lineTo((j + 0.5) * res, i * res);
                    context.fill();
                }
                if (scenario == 15) {
                    context.fillRect(j * res, i * res, res, res);
                }
            }
        }
    }
    drawAxes();
}

function renderFunc() {
    func = new Function('x', 'y', `return ${prepareString()}`);
    constant = Number.parseFloat(constant_input.value);

    for (let i = 0; i * res < canvas_height; i++) {
        for (let j = 0; j * res < canvas_width; j++) {
            if (func(getX(j * res), getY(i * res)) <= constant) {
                grid[i][j] = 1;
            }
            else {
                grid[i][j] = 0;
            }
        }
    }

    render();
}

function updateParams(variable) {
    if (variable == "res") {
        res = Number.parseInt(res_input.value);
        makeGrid();
        renderFunc();
        render();
    }
    if (variable == "scale") {
        scale = Number.parseFloat(scale_input.value);
        if (mobile) {
            scale = scale * 5;
        }
        renderFunc();
        render();
    }
}

function makeGrid() {
    grid = [];
    for (let j = 0; j * res <= canvas_height; j++) {
        new_row = [];
        for (let i = 0; i * res <= canvas_width; i++) {
            new_row.push(0);
        }
        grid.push(new_row);
    }
}

function initParams() {
    func = undefined;

    res_input.value = 4;
    res = 4;

    scale_input.value = 0.005;
    scale = 0.005;
    if (mobile) {
        scale = scale * 5;
    }

    makeGrid();

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    func_input.value = "pow(pow(x, 2) + pow(y, 2) - 1, 3) + pow(x, 2) * pow(y, 3)"
    constant_input.value = 0;

    renderFunc();
    render();
}

function getScenario(i, j) {
    let a, b, c, d;

    a = grid[i - 1][j - 1];
    b = grid[i - 1][j];
    c = grid[i][j];
    d = grid[i][j - 1];

    let binary = d * 1000 + c * 100 + b * 10 + a;
    return Number.parseInt(binary, 2);
}

function getX(point) {
    return (point - canvas_width / 2) * scale;
}

function getY(point) {
    return (point - canvas_height / 2) * scale;
}

function prepareString() {
    let raw_string = func_input.value;
    raw_string = raw_string.replaceAll("sin", "Math.sin").replace("cos", "Math.cos").replace("tan", "Math.tan");
    raw_string = raw_string.replaceAll("pow", "Math.pow");
    console.log(raw_string);
    return raw_string;
}

function getLeft(raw_string, position) {
    for (let i = position - 1; i > -1; i--) {
        if (!isNum(raw_string[i])) {
            return i;
        }
    }
    return 0;
}

function getRight(raw_string, position) {
    for (let i = position + 1; i < raw_string.length; i++) {
        if (!isNum(raw_string[i])) {
            return i;
        }
    }
    return raw_string.length - 1;
}

function isNum(char) {
    if (char == "1" || char == "2" || char == "3" || char == "4" || char == "5") {
        return true;
    }
    else if (char == "6" || char == "7" || char == "8" || char == "9" || char == "0") {
        return true;
    }
    else if (char == "." || char == "x" || char == "y") {
        return true;
    }
    else {
        return false;
    }
}

function drawAxes() {
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(0, canvas_height / 2);
    context.lineTo(canvas_width, canvas_height / 2);
    context.stroke();
    context.beginPath();
    context.moveTo(canvas_width / 2, 0);
    context.lineTo(canvas_width / 2, canvas_height);
    context.stroke();
}

// heart curve
// pow(pow(x, 2) + pow(y, 2) - 1, 3) + pow(x, 2) * pow(y, 3)