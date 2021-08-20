let algo;

let length;
let num_rows, num_cols;

let initMaze, updateMaze, renderMaze;

function update() {
    updateMaze();
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderMaze();
}

function updateParams(variable) {
    if(variable == "algo") {
        algo = algo_select.value;
        initFunctions();
    }
}

function initParams() {
    num_rows = num_cols = 15;
    length = Math.floor(canvas_width / num_rows);
    resizeCanvas();

    if(mobile) {
        context.lineWidth = 2;
    }
    else {
        context.lineWidth = 4;
    }

    algo_select.value = "dfs";
    updateParams("algo");
}

function initFunctions() {
    if(algo == "dfs") {
        initMaze = initDFS;
        updateMaze = updateDFS;
        renderMaze = renderDFS;
    }
    else if(algo == "kruskal") {
        initMaze = initKruskal;
        updateMaze = updateKruskal;
        renderMaze = renderKruskal;
    }
    else if(algo == "prim") {
        initMaze = initPrim;
        updateMaze = updatePrim;
        renderMaze = renderPrim;
    }

    initMaze();
}