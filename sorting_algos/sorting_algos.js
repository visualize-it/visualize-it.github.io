let array = [];

let algo;

let num_numbers, x_scale, y_scale;

let initAlgo, updateAlgo, renderAlgo;

let iterations, comparisons, array_access, swaps;

function update() {
    updateAlgo();
    params_display.innerHTML = `Iterations: ${iterations}, Comparisons: ${comparisons}`;
    params_display.innerHTML += ` <br>Array accesses: ${array_access}, Swaps: ${swaps}`;
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
        else if(algo == "insertion") {
            initAlgo = initInsertion;
            updateAlgo = updateInsertion;
            renderAlgo = renderInsertion;
        }
        else if(algo == "cocktail") {
            initAlgo = initCocktail;
            updateAlgo = updateCocktail;
            renderAlgo = renderCocktail;
        }
        else if(algo == "heap") {
            initAlgo = initHeap;
            updateAlgo = updateHeap;
            renderAlgo = renderHeap;
        }
        else if(algo == "quick") {
            initAlgo = initQuick;
            updateAlgo = updateQuick;
            renderAlgo = renderQuick;
        }
        else if(algo == "merge") {
            initAlgo = initMerge;
            updateAlgo = updateMerge;
            renderAlgo = renderMerge;
        }
    }
    initAlgo();
}

function initParams() {
    if(mobile) {
        num_numbers = 32;
    }
    else {
        num_numbers = 64;
    }
    
    x_scale = canvas_width / num_numbers;
    y_scale = canvas_height / num_numbers;

    algo_select.value = "merge";
    updateParams("algo");
}

function makeArray() {
    array = [];
    for(let i = 1; i <= num_numbers; i++) {
        array.push(i);
    }
    array = shuffleKnuth(array);

    iterations = 0;
    comparisons = 0;
    array_access = 0;
    swaps = 0;
}

function drawArray() {
    context.fillStyle = "#0000ff";
    for(let i = 0; i < num_numbers; i++) {
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function swap(index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
}