// transitive params
let ball_x, ball_y;
let player_bar_x, ai_bar_x;
let vx, vy;
let player_points, ai_points;
let trails;

// targets
let ai_bar_target;
let target_reached;

// states
let paused;

// permanent params;
let ball_radius, leeway;
let player_bar_y, ai_bar_y;
let bar_thickness, half_bar_length, bar_length;
let padding;
let bar_speed;

function update() {
  moveBall();
  moveBar();
  trails.shift();
}

function moveBar() {
  if(!target_reached) {
    if(Math.abs(ai_bar_x - ai_bar_target) >= bar_speed) {
      if(ai_bar_x < ai_bar_target) {
        ai_bar_x += bar_speed;
      }
      else {
        ai_bar_x -= bar_speed;
      }
    }
    else {
      target_reached = true;
    }
  }
}

function moveBall() {
  ball_x += ball_vx;
  ball_y += ball_vy;

  if(ball_x < ball_radius) {
    ball_x = ball_radius;
    ball_vx = -ball_vx;
  }
  else if(ball_x + ball_radius > canvas_width) {
    ball_x = canvas_width - ball_radius;
    ball_vx = -ball_vx;
  }

  if(Math.abs(player_bar_y - ball_y) < leeway) {
    if(Math.abs(ball_x - player_bar_x) < half_bar_length) {
      ball_y = player_bar_y - leeway;
      ball_vy = -ball_vy;
    }
    else {
      trails = [];
    }
  }

  if(Math.abs((ai_bar_y + bar_thickness) - ball_y) < leeway) {
    if(Math.abs(ball_x - ai_bar_x) < half_bar_length) {
      ball_y = (ai_bar_y + bar_thickness) + leeway;
      ball_vy = -ball_vy;
      generateTrails();
    }
    else {
      trails = [];
    }
  }

  if(ball_y < 0) {
    player_points++;
    spawnBall();
  }
  else if(ball_y > canvas_height) {
    ai_points++;
    spawnBall();
  }
}

function seekTarget() {
  target_reached = false;
}

function spawnBall() {
  ball_x = canvas_width / 2;
  ball_y = canvas_height / 2;

  ball_vy = (Math.random() > 0.5) ? canvas_height / 200 : -canvas_width / 200;
  ball_vx = (Math.random() > 0.5) ? (Math.random() * ball_vy) : -(Math.random() * ball_vy);
  generateTrails();
}

function generateTrails() {
  let x = ball_x, y = ball_y;
  let vx = ball_vx, vy = ball_vy;
  let latest;

  trails = [];
  while(y > ai_bar_y + bar_thickness) {
    x += vx;
    y += vy;

    if(x < ball_radius) {
      x = ball_radius;
      vx = -vx;
    }
    else if(x + ball_radius > canvas_width) {
      x = canvas_width - ball_radius;
      vx = -vx;
    }

    if(Math.abs(player_bar_y - y) < leeway) {
      y = player_bar_y - leeway;
      vy = -vy;
    }

    trails.push(
      {
        x: x,
        y: y,
      }
    );
    ai_bar_target = x;
    if(trails.length > 2 * canvas_width) {
      break;
    }
  }
  seekTarget();
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
  context.closePath();
  context.fill();

  context.fillRect(player_bar_x - half_bar_length, player_bar_y, bar_length, bar_thickness);
  context.fillRect(ai_bar_x - half_bar_length, ai_bar_y, bar_length, bar_thickness);

  for(let trail of trails) {
    context.fillRect(trail.x, trail.y, 1, 1);
  }
}

function updateParams(variable) {
  if(variable == "x") {
    player_bar_x = x_input.value;
  }
}

function initParams() {
  ball_radius = 5;
  leeway = 5;

  padding = mobile ? 10 : 15;
  bar_thickness = canvas_height / 25;
  bar_length = canvas_width / 7;
  half_bar_length = bar_length / 2;

  player_bar_y = canvas_height - padding - bar_thickness;
  ai_bar_y = padding;
  player_bar_x = ai_bar_x = canvas_width / 2;

  x_input.style.width = `${canvas_width - half_bar_length}px`;
  x_input.min = Math.ceil(half_bar_length);
  x_input.max = Math.ceil(canvas_width - half_bar_length);
  x_input.value = Math.ceil(canvas_width / 2);

  bar_speed = canvas_width / 40;
  ai_bar_target = canvas_width / 2;
  target_reached = false;

  player_points = ai_points = 0;
  trails = [];
  paused = false;

  spawnBall();
}

function step() {
    if(!paused) {
      update();
    }
    render();
    animate(step);
}
