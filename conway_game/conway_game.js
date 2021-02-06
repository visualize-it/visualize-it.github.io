// cell related
let cells, num_cells, cell_length;
let grid;

// event
let rect, click_x, click_y;

// states
let isPaused, showGrid;

function update() {

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
        context.fillRect(grid[i], grid[j], cell_length, cell_length);
      }
    }
  }
}

function drawGrid() {
  context.strokeStyle = "#ffffff";
  context.lineWidth = 2;
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

}

function initParams() {
  grid = [];
  cells = [];
  num_cells = 50;

  initCanvas();

  isPaused = false;
  showGrid = false;
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
  for(let i = 0; i < num_cells; i++) {
    cells[i] = new Array(num_cells);
  }

  for(let i = 0; i < num_cells; i++) {
    for(let j = 0; j < num_cells; j++) {
      cells[i][j] = 0;
    }
  }
}

function initCanvas() {
  cell_length = canvas_width / num_cells;

  for(let pos = 1; pos < canvas_width; pos += cell_length) {
    grid.push(pos);
  }
  grid.push(canvas_width - 1);

  cells = new Array(num_cells);
  resetCells();
}
