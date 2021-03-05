function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  context.fillText("testing", canvas_width / 2, canvas_height / 2);

  drawSquares();
  displayNumbers();
}

function verticalMovements() {
  for (let i = 0; i < array.length; i++) {
    if (Math.abs(positions[i].y - y_positions[i]) < move_speed) {
      positions[i].y = y_positions[i];
    } else if (positions[i].y > y_positions[i]) {
      positions[i].y -= move_speed;
      moved = true;
    } else if (positions[i].y < y_positions[i]) {
      positions[i].y += move_speed;
      moved = true;
    }
  }
}

function horizontalMovements() {
  if(!moved) {
    for (let i = 0; i < array.length; i++) {
      if (Math.abs(positions[i].x - x_positions[i]) < move_speed) {
        positions[i].x = x_positions[i];
      } else if (positions[i].x > x_positions[i]) {
        positions[i].x -= move_speed;
        moved = true;
      } else if (positions[i].x < x_positions[i]) {
        positions[i].x += move_speed;
        moved = true;
      }
    }
  }
}

function drawSquares() {
  context.strokeStyle = "#ffffff";

  for (let position of positions) {
    context.beginPath();
    context.moveTo(position.x, position.y);
    context.lineTo(position.x + square_length, position.y);
    context.lineTo(position.x + square_length, position.y + square_length);
    context.lineTo(position.x, position.y + square_length);
    context.lineTo(position.x, position.y);
    context.stroke();
  }
}

function displayNumbers() {
  context.fillStyle = "#ffffff";
  context.textAlign = "center";

  for (let i = 0; i < array.length; i++) {
    context.fillText(`${positions[i].number}`,
      positions[i].x + square_length / 2, positions[i].y + 0.75 * square_length);
  }
}
