// fractal
let fractal = [];
let colors = [];

// generation params 
let center_x, center_y;
let start_x, start_y;
let stop_x, stop_y;
let prec;
let max_iterations;

// fractal params
let half_width, half_height;

// canvas params
let scale;
let x_offset, y_offset;

// states
let toRender;

function getColor(i) {
  // if(i < 17) 
  //   return "#00008b"; // dark blue
  // else if(i < 25) 
  //   return "#ffffff"; //white
  // else if(i < 30) 
  //   return "#ffff00"; // yellow
  // else if(i < 35) 
  //   return "#00ff00" // green
  // else if(i < 40)
  //   return "#ffa500"; // orange
  // else if(i < 45)
  //   return "#0000ff"; // blue
  // else
  //   return "#000000"; // black

  if (i < max_iterations && i > 0) {
    return colors[i % 16];
  }
  else
    return "#000000";
}

function generate() {
  initialize();

  let start = performance.now();
  for(let y_0 = start_y; y_0 < stop_y; y_0 += prec) {
    for(let x_0 = start_x; x_0 < stop_x; x_0 += prec) {
      let x = x_temp = y = i = 0;
      let x_square = y_square = 0;

      while(x_square + y_square < 4 && i < max_iterations) {
        x_temp = x_square - y_square + x_0;
        y = 2*x*y + y_0;
        x = x_temp;
        i += 1;

        x_square = x*x;
        y_square = y*y;
      }
      fractal.push(getColor(i));
    }
    fractal.push("next");
  }
  toRender = true;
  console.log("Generation time: ", performance.now() - start, " ms");

  // console.log(fractal);
}

function update() {
  scale += 0.1;
  generate();
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  let x = y = i = 0;
  let start = performance.now();
  while(y < canvas_height) {
    if(fractal[i] == "next") {
      y += 1;
      x = 0;
    }
    context.fillStyle = fractal[i];
    context.fillRect(x, y, 1, 1);
    x += 1
    i += 1
  }
  console.log("Rendering time: ", performance.now() - start, " ms");

  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(0, canvas_height / 2);
  context.lineTo(canvas_width, canvas_height / 2);
  context.stroke();
  context.beginPath();
  context.moveTo(canvas_width / 2, 0);
  context.lineTo(canvas_width / 2, canvas_height);
  context.stroke();

  toRender = false;
}

function updateParams(variable) {

}

function initialize() {
  start_x = center_x - (half_width / scale);
  start_y = center_y - (half_height / scale);

  stop_x = center_x + (half_width / scale);
  stop_y = center_y + (half_height / scale);

  prec = (stop_x - start_x) / canvas_width;
  max_iterations = 100;
  fractal = [];

  // console.log("Centers: ", center_x, center_y);
  // console.log("X range: ", start_x, stop_x);
  // console.log("Y range: ", start_y, stop_y);
  // console.log("Step size: ", prec, " and scale: ", scale);
}

function initParams() {
  center_x = -0.75;
  center_y = 0;
  half_width = 1.75
  half_height = 1.2;

  scale = 1;

  toRender = true;
  initColors();
  generate();
}

function initColors() {
  colors.push("#421e0f");
  colors.push("#19071a");
  colors.push("#09012f");
  colors.push("#040449");
  colors.push("#000764");
  colors.push("#0c2c8a");
  colors.push("#185275");
  colors.push("#397dd1");
  colors.push("#86b5e5");
  colors.push("#d3ecf8");
  colors.push("#f1e9bf");
  colors.push("#f8c95f");
  colors.push("#ffaa00");
  colors.push("#cc8000");
  colors.push("#995700");
  colors.push("#6a3403");
}
