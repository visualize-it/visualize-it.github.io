let init_x = 0.5;
let num_iterations = 2000;
let num_consider = 500;

let r = -2;
let x_scale, y_scale;

let padding = 5;
let draw_per_frame = 10;
let width, height;

function setup() {
  
  width = 0.95 * window.innerWidth;
  height = 0.95 * window.innerHeight;
  createCanvas(width, height);
  background(0);
  frameRate(60);

  x_scale = width / 6;
  y_scale = height / 2;
  stroke(0);
}

function draw() {

  for (let i = 0; i < draw_per_frame; i++) {
    if (r < 4) {
      r = r + (0.5 /x_scale);
      points = returnPoints();

      for (let i = 0; i < num_consider; i++) {
        stroke(getColor(getPeriod(points)));
        point((r + 2) * x_scale, height - (points[i] + 0.5) * y_scale);
      }
    }
  }
}

function returnPoints() {
  points = [];

  let x = init_x;
  for (let i = 0; i < num_iterations - num_consider; i++) {
    x = r * x * (1 - x);
  }

  for (let i = 0; i < num_consider; i++) {
    x = r * x * (1 - x);
    points[i] = x;
  }

  return points;
}

function getPeriod(points) {
  let periodic = false;
  let period;

  for (period = 1; !periodic && period < (num_consider / 5); period++) {

    periodic = true;
    for (let i = 0; i < period && i + period < num_consider; i++) {
      if (abs(points[i] - points[i+period]) > 0.01) {
        periodic = false;
      }
    }
  }
  return period;
}

function getColor(period) {
  switch(period) {
  case 2:
    return color("white");
  case 3:
    return color("blue");
  case 4:
    return color("yellow");
  case 5:
    return color("red");
  case 6:
    return color("orange");
  case 7:
    return color("brown");
  default:
    return color(128, 128, 128);
  }
}
