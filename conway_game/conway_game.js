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
  if(borderInteract) {
    edgeGround();
    cornerGround();
  }
  copyNextState();
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  if(showGrid) {
    drawGrid();
  }

  context.fillStyle = "#ffffff";
  for(let i = 0; i < num_cells; i++) {
    for(let j = 0; j < num_cells; j++) {
      if(cells[i][j]) {
        if(neighbours[i][j] == 1) {
          context.fillStyle = "#ff0000";
        }
        else if(neighbours[i][j] == 2) {
          context.fillStyle = "#e2d810";
        }
        else {
          context.fillStyle = "#12a4d9";
        }
        context.fillRect(grid[i], grid[j], cell_length, cell_length);
      }
    }
  }
}

function drawGrid() {
  context.strokeStyle = "#aaaaaa";
  context.lineWidth = 0.75;
  for(let latitude of grid) {
    context.beginPath();
    context.moveTo(0, latitude);
    context.lineTo(canvas_width, latitude);
    context.stroke();
  }
  for(let longitude of grid) {
    context.beginPath();
    context.moveTo(longitude, 0);
    context.lineTo(longitude, canvas_height);
    context.stroke();
  }
}

function updateParams(variable) {
  if(variable == "cells") {
    num_cells = cell_slider.value;

    grid = [];
    cells = [];
    showGrid = true;
    grid_button.innerHTML = "Hide Grid";

    if(!isPaused) {
      togglePause();
    }

    initCanvas();
  }
}

function initParams() {
  num_cells = 10;
  grid = [];
  cells = [];
  neighbours = [];
  cell_slider.value = num_cells;

  initCanvas();

  isPaused = false;
  showGrid = false;
  borderInteract = true;

  gosperState();
}

function toggle(i,j) {
  if(i < num_cells && j < num_cells) {
    cells[i][j] = cells[i][j] ? 0 : 1;
  }
  else {
    console.log("Out of bounds")
  }
}

function resetCells() {
  cells = new2dArray(num_cells);
  neighbours = new2dArray(num_cells);
  next_state = new2dArray(num_cells);
}

function initCanvas() {
  cell_length = canvas_width / num_cells;
  grid = [];

  for(let pos = 1; pos < canvas_width; pos += cell_length) {
    grid.push(pos);
  }
  grid.push(canvas_width - 1);
  resetCells();
}

function new2dArray(num) {
  array = new Array(num);

  for(let i = 0; i < num; i++) {
    array[i] = new Array(num);
  }

  for(let i = 0; i < num; i++) {
    for(let j = 0; j < num; j++) {
      array[i][j] = 0;
    }
  }
  return array;
}

function prepareNextState() {
  for(let i = 0; i < num_cells; i++) {
    for(let j = 0; j < num_cells; j++) {
      next_state[i][j] = 0;
    }
  }
}

function copyNextState() {
  for(let i = 0; i < num_cells; i++) {
    for(let j = 0; j < num_cells; j++) {
      cells[i][j] = next_state[i][j];
    }
  }
}
