// fractal
let fractal = [];
let colors = [];

// generation params 
let max_iterations;

// fractal params
let center_x, center_y;
let half_width, half_height;

// canvas params
let scale;

function generate() {
  let start = performance.now();
  fractal = [];

  let start_x = center_x - (half_width / scale);
  let start_y = center_y - (half_height / scale);

  let stop_x = center_x + (half_width / scale);
  let stop_y = center_y + (half_height / scale);

  let prec = (stop_x - start_x) / canvas_width;

  for (let y_0 = start_y; y_0 < stop_y; y_0 += prec) {
    for (let x_0 = start_x; x_0 < stop_x; x_0 += prec) {
      let x = x_temp = y = i = 0;
      let x_square = y_square = 0;

      while (x_square + y_square < 4 && i < max_iterations) {
        x_temp = x_square - y_square + x_0;
        y = 2 * x * y + y_0;
        x = x_temp;
        i += 1;

        x_square = x * x;
        y_square = y * y;
      }
      fractal.push(i);
    }
    fractal.push("r");
  }
  console.log("Generation time: ", performance.now() - start, " ms");
  render();
}

function render() {
  let start = performance.now();

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
      pixels[off] = colors[fractal[i] % 16][0];
      pixels[off + 1] = colors[fractal[i] % 16][1];
      pixels[off + 2] = colors[fractal[i] % 16][2];
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

  console.log("Rendering time: ", performance.now() - start, " ms");
}

function updateParams(variable) {

}

function initParams() {
  center_x = -0.75;
  center_y = 0;

  half_width = 1.75
  half_height = 1.2;

  scale = 1;
  max_iterations = 100;

  initColors();
  generate();
}

function initColors() {
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
