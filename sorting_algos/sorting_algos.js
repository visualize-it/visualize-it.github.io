let array = [];

let algo;

let num_numbers, x_scale, y_scale;

let initAlgo, updateAlgo, renderAlgo;

function update() {
    updateAlgo();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderAlgo();
}

function updateParams(variable) {
    if(variable == "algo") {
        algo = algo_select.value;
        if(algo == "selection") {
            initAlgo = initSelection;
            updateAlgo = updateSelection;
            renderAlgo = renderSelection;
        }
        else if(algo == "bubble") {
            initAlgo = initBubble;
            updateAlgo = updateBubble;
            renderAlgo = renderBubble;
        }
    }
    initAlgo();
}

function initParams() {
    if(mobile) {
        num_numbers = 35;
    }
    else {
        num_numbers = 50;
    }
    
    x_scale = canvas_width / num_numbers;
    y_scale = canvas_height / num_numbers;

    algo_select.value = "bubble";
    updateParams("algo");
}

function makeArray() {
    array = [];
    for(let i = 1; i <= num_numbers; i++) {
        array.push(i);
    }
    array = shuffleKnuth(array);
}

function drawArray() {
    context.fillStyle = "#0000ff";
    for(let i = 0; i < num_numbers; i++) {
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}