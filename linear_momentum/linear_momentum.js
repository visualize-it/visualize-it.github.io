// transitive params
let ball_x, ball_y;
let player_bar_x, ai_bar_x;

// permanent params;
let ball_radius;
let player_bar_y, ai_bar_y;
let bar_thickness, half_bar_length;
let padding;

function update() {

}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  context.fillStyle = "#ffffff";
  context.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
  context.fill();

  context.fillRect(player_bar_x - half_bar_length, player_bar_y, 2 * half_bar_length, bar_thickness);
  context.fillRect(ai_bar_x - half_bar_length, ai_bar_y, 2 * half_bar_length, bar_thickness);
}

function updateParams(variable) {
  if(variable == "x") {
    player_bar_x = x_input.value;
  }
}

function initParams() {
  ball_x = canvas_width / 2;
  ball_y = canvas_height / 2;
  ball_radius = 5;

  padding = mobile ? 10 : 15;
  bar_thickness = canvas_height / 25;
  half_bar_length = canvas_width / 14;

  player_bar_y = canvas_height - padding - bar_thickness;
  ai_bar_y = padding;
  player_bar_x = ai_bar_x = canvas_width / 2;

  x_input.style.width = `${canvas_width - half_bar_length}px`;
  x_input.min = half_bar_length;
  x_input.max = canvas_width - half_bar_length;
  x_input.value = canvas_width / 2;
}
