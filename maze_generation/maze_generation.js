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

}

function initParams() {
    num_rows = num_cols = 10;
    length = Math.floor(canvas_width / num_rows);
    resizeCanvas();

    algo = "kruskal";

    if(algo == "dfs") {
        initMaze = initDFS;
        updateMaze = updateDFS;
        renderMaze = renderDFS;
    }
    else if(algo = "kruskal") {
        initMaze = initKruskal;
        updateMaze = updateKruskal;
        renderMaze = renderKruskal;
    }

    initMaze();
}