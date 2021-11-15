// fractal colors
let colors = [], color_periodicity;

// generation params 
let max_iterations;

// fractal params
let center_x, center_y;
let half_width, half_height;

// canvas params
let scale;

// states
let animating;
let coloring_scheme;

let downloading;

function update() {
  if (animating) {
    zoomIn();
  }
}

function generate() {
  let fractal = [];

  let start_x = center_x - (half_width / scale);
  let start_y = center_y - (half_height / scale);

  let stop_x = center_x + (half_width / scale);
  let stop_y = center_y + (half_height / scale);

  let prec = (stop_x - start_x) / canvas_width;

  for (let y0 = start_y; y0 < stop_y; y0 += prec) {
    for (let x0 = start_x; x0 < stop_x; x0 += prec) {
      let x = y = i = 0;
      let x2 = y2 = 0;

      while (x2 + y2 < 4 && i < max_iterations) {
        y = 2 * x * y + y0;
        x = x2 - y2 + x0;
        x2 = x * x;
        y2 = y * y
        i += 1;
      }
      fractal.push(i);
    }
    fractal.push("r");
  }

  return fractal;
}

function render() {
  let start = performance.now();

  let fractal = generate();

  let id = context.getImageData(0, 0, canvas_width, canvas_height);
  let pixels = id.data;

  let x = y = i = off = 0;
  while (y < canvas_height) {
    if (fractal[i] == "r") {
      x = 0;
      y += 1;
      i += 1;
    }
    off = (y * id.width + x) * 4;
    if (fractal[i] < max_iterations) {
      pixels[off] = colors[fractal[i] % color_periodicity][0];
      pixels[off + 1] = colors[fractal[i] % color_periodicity][1];
      pixels[off + 2] = colors[fractal[i] % color_periodicity][2];
      pixels[off + 3] = 255;
    }
    else {
      pixels[off] = pixels[off + 1] = pixels[off + 2] = 0;
      pixels[off + 3] = 255;
    }
    x += 1
    i += 1
  }
  context.putImageData(id, 0, 0);

  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(0, canvas_height / 2);
  context.lineTo(canvas_width, canvas_height / 2);
  context.stroke();
  context.beginPath();
  context.moveTo(canvas_width / 2, 0);
  context.lineTo(canvas_width / 2, canvas_height);
  context.stroke();

  if (animating)
    fps_display.innerHTML = `${(1000 / (performance.now() - start)).toFixed()} fps`;
}

function area(number) {
  if (number == 1) {
    center_x = -0.7442799899774443;
    center_y = -0.12115404002858504;
  }
  else if (number == 2) {
    center_x = -1.787911683240298;
    center_y = 0;
  }
  else if (number == 3) {
    center_x = -0.1097522593518249;
    center_y = -0.9646161601143399;
  }
  scale = 1;
  animating = true;
  fps_display.style.display = "block";
}

function iterations(num) {
  max_iterations = num;
  render();
}

function initParams() {
  center_x = -0.75;
  center_y = 0;

  half_width = 1.75
  half_height = 1.2;

  scale = 1;
  max_iterations = 100;
  animating = false;

  fps_display.style.display = "none";
  initColors();
  render();
}

function color(scheme) {
  coloring_scheme = scheme;
  initColors();
  render();
}

function initColors() {
  colors = [];

  if (coloring_scheme == 1) {
    color_periodicity = 16;
    colors.push([66, 30, 15]);
    colors.push([25, 7, 26]);
    colors.push([9, 1, 47]);
    colors.push([4, 4, 73]);
    colors.push([0, 7, 100]);
    colors.push([12, 44, 138]);
    colors.push([24, 82, 177]);
    colors.push([57, 125, 209]);
    colors.push([134, 181, 229]);
    colors.push([211, 236, 248]);
    colors.push([241, 233, 191]);
    colors.push([248, 201, 95]);
    colors.push([255, 170, 0]);
    colors.push([204, 128, 0]);
    colors.push([153, 87, 0]);
    colors.push([106, 52, 3]);
  }
  else if(coloring_scheme == 2) {
    let red, blue, green;
    let red_part = 255, blue_part = 255, green_part = 175;
    color_periodicity = max_iterations;
    for (let i = 0; i < color_periodicity; i++) {

      red = (255 - red_part) + (red_part * i / color_periodicity);
      blue = (255 - blue_part) + (blue_part * i / color_periodicity);
      green = (255 - green_part) + (green_part * i / color_periodicity);

      colors.push([red, blue, green]);
    }
  }
  else if(coloring_scheme == 3) {
    let red, blue, green;
    let red_part = 255, blue_part = 255, green_part = 255;
    color_periodicity = max_iterations;
    for (let i = 0; i < color_periodicity; i++) {

      red = (255 - red_part) + (red_part * i / color_periodicity);
      blue = (255 - blue_part) + (blue_part * i / color_periodicity);
      green = (255 - green_part) + (green_part * i / color_periodicity);

      colors.push([red, blue, green]);
    }
  }
  else if(coloring_scheme == 4) {
      color_periodicity = 16;
      colors.push([106, 52, 3]);
      colors.push([153, 87, 0]);
      colors.push([204, 128, 0]);
      colors.push([255, 170, 0]);
      colors.push([248, 201, 95]);
      colors.push([241, 233, 191]);
      colors.push([211, 236, 248]);
      colors.push([134, 181, 229]);
      colors.push([57, 125, 209]);
      colors.push([24, 82, 177]);
      colors.push([12, 44, 138]);
      colors.push([0, 7, 100]);
      colors.push([4, 4, 73]);
      colors.push([9, 1, 47]);
      colors.push([25, 7, 26]);
      colors.push([66, 30, 15]);
  }
}
