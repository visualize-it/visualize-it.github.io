// simulation params
let array, positions;
let move_speed;

// constant params
let size;
let square_length;
let x_positions, y_positions;
let y_level;

// states
let moved;

function update() {

  moved = false;
  verticalMovements();
  horizontalMovements();
}

function updateParams(variable) {

}

function initDisplay() {
  square_length = Math.floor(canvas_width / (2 * array.length + 1));
  move_speed = square_length / 10;

  x_positions = [];
  y_positions = [];
  y_level = (canvas_height - square_length) / 2;
  for (let i = 0; i < array.length; i ++) {
    x_positions.push((2 * i + 1) * square_length);
    y_positions.push(y_level);
    positions.push({
      x: (2 * i + 1) * square_length,
      y: y_level,
      number: array[i],
    });
  }

  context.font = `${0.75 * square_length}px Arial`;
}

function initParams() {
  generateArray(10);
  shuffleArray();
  initDisplay();

  scanArray();
}
