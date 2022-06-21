// cell related
let cells, neighbours, num_cells, cell_length;
let grid;

// simulation related
let next_state, num_neigh;

// event
let rect, click_x, click_y;

// states
let isPaused, showGrid, borderInteract;

function update() {
  prepareNextState();
  middleGround();
  if (borderInteract) {
    edgeGround();
    cornerGround();
  }
  copyNextState();
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  if (showGrid) {
    drawGrid();
  }

  context.fillStyle = "#ffffff";
  for (let i = 0; i < num_cells; i++) {
    for (let j = 0; j < num_cells; j++) {
      if (cells[i][j]) {
        if (neighbours[i][j] == 1) {
          context.fillStyle = "#ffffff";
        }
        else if (neighbours[i][j] == 2) {
          context.fillStyle = "#ffa500";
        }
        else if (neighbours[i][j] == 3) {
          context.fillStyle = "#1f51ff";
        }
        else {
          context.fillStyle = "#ff0000";
        }
        context.fillRect(grid[i], grid[j], cell_length, cell_length);
      }
    }
  }
}

function drawGrid() {
  context.strokeStyle = "#aaaaaa";
  context.lineWidth = 0.75;
  for (let latitude of grid) {
    context.beginPath();
    context.moveTo(0, latitude);
    context.lineTo(canvas_width, latitude);
    context.stroke();
  }
  for (let longitude of grid) {
    context.beginPath();
    context.moveTo(longitude, 0);
    context.lineTo(longitude, canvas_height);
    context.stroke();
  }
}

function updateParams(variable) {
  if (variable == "cells") {
    num_cells = cell_slider.value;
    cell_display.innerHTML = `Number of cells per row/column: ${num_cells}`;

    grid = [];
    cells = [];
    showGrid = true;
    grid_button.innerHTML = "Hide Grid";

    if (!isPaused) {
      togglePause();
    }

    initCanvas();
  }
  if (variable == "fps") {
    fps = fps_slider.value;
    fps_display.innerHTML = `Frames per second: ${fps}`;

    animate = function (callback) {
      window.setTimeout(callback, 1000 / fps);
    };
  }
}

function initParams() {
  num_cells = 10;
  grid = [];
  cells = [];
  neighbours = [];

  cell_slider.value = num_cells;

  fps_slider.value = fps;
  updateParams("fps");

  initCanvas();

  isPaused = false;
  showGrid = false;
  borderInteract = true;

  gosperState();
}

function toggle(i, j) {
  if (i < num_cells && j < num_cells) {
    cells[i][j] = cells[i][j] ? 0 : 1;
  }
  else {
    console.log("Out of bounds")
  }
}

function initCanvas() {
  cell_length = canvas_width / num_cells;
  grid = [];

  for (let pos = 1; pos < canvas_width; pos += cell_length) {
    grid.push(pos);
  }
  grid.push(canvas_width - 1);

  cell_display.innerHTML = `Number of cells per row/column: ${num_cells}`;
  resetCells();
}