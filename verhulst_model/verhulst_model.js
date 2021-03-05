// transitive params
let n, i;

// simulation constants
let initial_pop, carrying_capacity, growth_rate, num_gen;

// graphical params
let y_offset, padding;

// plotting params
let x_scale, y_scale_num, y_scale_rate, graph_width, graph_height;
let highest_i, highest_num, highest_rate;

// lists;
let numbers, rates, iterations;

// states
let updated, scatter;

function plot() {
  simulate();
  calcScale();

  // console.log(numbers);
  // console.log(rates);
  // console.log(iterations);

  updated = true;
}

function simulate() {
  n = initial_pop;
  i = 0;

  console.log("Simulating with ", initial_pop, carrying_capacity, growth_rate, num_gen);

  while (i < num_gen) {
    numbers.push(n);
    rates.push(growth_rate * n * (1 - (n / carrying_capacity)));
    iterations.push(i);

    n += rates[rates.length - 1];
    i += 1;
  }
}

function drawPlots() {
  if(scatter) {
    context.fillStyle = "#ffffff";
    for(let i = 0; i < iterations.length; i++) {
      context.fillRect(padding + x_scale * iterations[i],
                       canvas_height - padding - y_scale_num * numbers[i], 2, 2,);
    }
    for(let i = 0; i < iterations.length; i++) {
      context.fillRect(graph_offset + x_scale * iterations[i],
                       canvas_height - padding - y_scale_rate * rates[i], 2, 2,);
    }
  }
  else if(iterations.length) {
    context.strokeStyle = "#ffffff";
    for(let i = 0; i < iterations.length; i++) {
      if(iterations[i] == 0) {
        context.stroke();
        context.beginPath();
        context.moveTo(padding + x_scale * iterations[i],
                       canvas_height - padding - y_scale_num * numbers[i]);
      }
      else {
        context.lineTo(padding + x_scale * iterations[i],
                       canvas_height - padding - y_scale_num * numbers[i]);
      }
    }
    context.stroke();

    for(let i = 0; i < iterations.length; i++) {
      if(iterations[i] == 0) {
        context.stroke();
        context.beginPath();
        context.moveTo(graph_offset + x_scale * iterations[i],
                       canvas_height - padding - y_scale_rate * rates[i]);
      }
      else {
        context.lineTo(graph_offset + x_scale * iterations[i],
                       canvas_height - padding - y_scale_rate * rates[i]);
      }
    }
    for(let i = 0; i < iterations.length; i++) {
      if(iterations[i] == 0) {
        context.stroke();
        context.beginPath();
        context.moveTo(graph_offset + x_scale * iterations[i],
                       canvas_height - padding - y_scale_rate * rates[i]);
      }
      else {
        context.lineTo(graph_offset + x_scale * iterations[i],
                       canvas_height - padding - y_scale_rate * rates[i]);
      }
    }
  }
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  drawLines();
  drawPlots();

  context.fillStyle = "#ffffff";
  context.fillText("Population Size", canvas_width / 4, y_offset);
  context.fillText("Rate of Growth", 3 * canvas_width / 4, y_offset);

  updated = false;
}

function updateParams(variable) {
  let input;
  if (variable == "n") {
    input = Number.parseInt(n_input.value);
    if (!isNaN(input)) {
      initial_pop = input;
    }
  } else if (variable == "k") {
    input = Number.parseInt(k_input.value);
    if (!isNaN(input)) {
      carrying_capacity = input;
    }
  } else if (variable == "r") {
    input = Number.parseFloat(r_input.value);
    if (!isNaN(input)) {
      growth_rate = input;
    }
  } else if (variable == "i") {
    input = Number.parseInt(i_input.value);
    if (!isNaN(input)) {
      num_gen = input;
    }
  }
}

function initParams() {

  if (mobile) {
    context.font = "15px Arial";
    y_offset = 15;
  } else {
    context.font = "20px Arial";
    y_offset = 20;
  }
  context.textAlign = "center";
  padding = y_offset + 10;

  initial_pop = 100;
  carrying_capacity = 1000;
  growth_rate = 1.1;
  num_gen = 10;

  n_input.value = initial_pop;
  k_input.value = carrying_capacity;
  r_input.value = growth_rate;
  i_input.value = num_gen;

  numbers = [];
  rates = [];
  iterations = [];

  graph_width = canvas_width / 2 - 2 * padding;
  graph_height = canvas_height - 2 * padding;
  graph_offset = canvas_width / 2 + padding;

  // console.log("Graph dimensions: ", graph_width, graph_height);

  scatter = false;
  plot();
}

function calcScale() {
  highest_i = 0;
  highest_num = 0;
  highest_rate = 0;

  for(let x of iterations) {
    if(x > highest_i) {
      highest_i = x;
    }
  }

  for(let y of numbers) {
    if(y > highest_num) {
      highest_num = y;
    }
  }

  for(let y of rates) {
    if(y > highest_rate) {
      highest_rate = y;
    }
  }

  // console.log("Highest params: ", highest_i, highest_num, highest_rate);

  x_scale = graph_width / highest_i;
  y_scale_num = graph_height / highest_num;
  y_scale_rate = graph_height / highest_rate;

  // console.log("Scales: ", x_scale, y_scale_num, y_scale_rate);
}

function drawLines() {
  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(canvas_width / 2, 0);
  context.lineTo(canvas_width / 2, canvas_height);
  context.stroke();

  context.beginPath();
  context.moveTo(padding, padding);
  context.lineTo(padding, padding + graph_height);
  context.lineTo(padding + graph_width, padding + graph_height);
  context.stroke();

  context.beginPath();
  context.moveTo(padding, padding);
  context.lineTo(padding, padding + graph_height);
  context.lineTo(padding + graph_width, padding + graph_height);
  context.stroke();

  context.beginPath();
  context.moveTo(graph_offset, padding);
  context.lineTo(graph_offset, padding + graph_height);
  context.lineTo(graph_offset + graph_width, padding + graph_height);
  context.stroke();
}

function togglePlots() {
  if(scatter) {
    scatter = false;
    plot_toggle.innerHTML = "Draw scatter plot";
  }
  else {
    scatter = true;
    plot_toggle.innerHTML = "Draw line plot";
  }
  updated = true;
}

function clearPlots() {
  numbers = [];
  rates = [];
  iterations = [];

  x_scale = 0;
  y_scale_num = 0;
  y_scale_rate = 0;

  updated = true;
}
