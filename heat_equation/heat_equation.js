// simulation params
let temperatures = [], new_temperatures = [];
let num_points;
let highest_temp, lowest_temp, range;
let conductivity, difference;

// generation initParams
let temperature_seed;
let cursor_position;
let change, highest_change, lowest_change;
let increase_factor, discourage_factor;

// plotting initParams
let padding;
let x_scale, y_scale, y_offset;

// states
let simulating;

function update() {
  // intermediate
  for (let i = 1; i < temperatures.length - 1; i++) {
    new_temperatures.push(temperatures[i] + calculateChange(i));
  }

  // boundary
  difference = temperatures[1] - temperatures[0];
  new_temperatures.unshift(temperatures[0] + conductivity * difference);
  difference = temperatures[temperatures.length - 2] - temperatures[temperatures.length - 1];
  new_temperatures.push(temperatures[temperatures.length - 1] + conductivity * difference);

  temperatures = new_temperatures;
  new_temperatures = [];
}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(0, padding);
  context.lineTo(canvas_width, padding);
  context.stroke();

  context.beginPath();
  context.moveTo(0, canvas_height - padding);
  context.lineTo(canvas_width, canvas_height - padding);
  context.stroke();

  plotTemperatures();
}

function plotTemperatures() {
  context.beginPath();

  context.moveTo(0, (canvas_height - temperatures[0]) * y_scale - y_offset);
  let red_shade = Math.ceil((temperatures[0] - lowest_temp) * 255 / (highest_temp - lowest_temp));
  context.fillStyle = "#" + getHex(red_shade) + "0000";
  context.fillRect(0, 0, x_scale, canvas_height);

  for (let i = 1; i < temperatures.length; i++) {
    red_shade = Math.ceil((temperatures[i] - lowest_temp) * 255 / (highest_temp - lowest_temp));
    context.fillStyle = "#" + getHex(red_shade) + "0000";
    context.fillRect(i * x_scale, 0, x_scale, canvas_height);
    context.lineTo(i * x_scale, (canvas_height - temperatures[i]) * y_scale - y_offset);
  }
  context.stroke();
}

function updateParams(variable) {
  if (variable == "cond") {
    conductivity = Number.parseFloat(cond_slider.value);
    cond_display.innerHTML = `Conduction constant: ${conductivity.toFixed(2)}`;
  }
}

function generate() {
  let input_number = Number.parseInt(num_input.value);
  if (Number.isNaN(input_number) || input_number < 100) {
    num_points = 100;
    num_input.value = 100;
  }
  else {
    num_points = num_input.value;
  }

  simulating = false;
  temperatures = [];
  temperatures.push(temperature_seed);

  for (let i = 0; i < num_points / 2; i++) {
    change = getRandom(lowest_change, highest_change);
    if (Math.random() < increase_factor) {
      temperatures.unshift(temperatures[0] + change);
      increase_factor -= discourage_factor;
    }
    else {
      temperatures.unshift(temperatures[0] - change);
      increase_factor += discourage_factor;
    }

    if (increase_factor >= 1 || increase_factor <= 0) {
      increase_factor = 0.5;
    }
  }

  increase_factor = 0.5;
  for (let i = 0; i < num_points / 2; i++) {
    change = getRandom(lowest_change, highest_change);
    if (Math.random() < increase_factor) {
      temperatures.push(temperatures[temperatures.length - 1] + change);
      increase_factor -= discourage_factor;
    }
    else {
      temperatures.push(temperatures[temperatures.length - 1] - change);
      increase_factor += discourage_factor;
    }

    if (increase_factor >= 1 || increase_factor <= 0) {
      increase_factor = 0.5;
    }
  }
  preparePlot();
}

function initParams() {
  num_points = 100;
  num_input.value = 100;
  temperature_seed = 298;

  conductivity = 0.75;
  cond_slider.value = conductivity;
  cond_display.innerHTML = `Conduction constant: ${conductivity.toFixed(2)}`;

  highest_change = 5;
  lowest_change = 2;
  increase_factor = 0.5;
  discourage_factor = 0.03;

  padding = mobile ? 5 : 10;

  generate();
  simulating = true;
}

function calculateChange(index) {
  let average = (temperatures[index - 1] + temperatures[index + 1]) / 2;
  return conductivity * (average - temperatures[index]);
}

function preparePlot() {
  highest_temp = 0;
  lowest_temp = Infinity;

  for (let temperature of temperatures) {
    if (temperature > highest_temp) {
      highest_temp = temperature;
    }
    if (temperature < lowest_temp) {
      lowest_temp = temperature;
    }
  }

  range = highest_temp - lowest_temp;
  x_scale = canvas_width / num_points;
  y_scale = (canvas_height - 4 * padding) / range;
  y_offset = y_scale * (canvas_height - highest_temp) - 2 * padding;

  upper_line.innerHTML = `Upper line: ${highest_temp.toFixed(2)} K`;
  lower_line.innerHTML = `Lower line: ${lowest_temp.toFixed(2)} K`;
}

function preset_rods() {
  temperatures = [];
  simulating = false;

  num_points = 101;
  rod_1 = 250;
  rod_2 = 350;

  for (let i = 0; i < num_points; i++) {
    if (i < num_points / 2) {
      temperatures.push(rod_1);
    }
    else {
      temperatures.push(rod_2);
    }
  }
  preparePlot();
}

function preset_linear() {
  temperatures = [];
  simulating = false;

  num_points = 100;
  for (let i = 250; i < 350; i++) {
    temperatures.push(i);
  }
  preparePlot();
}

function getHex(shade) {
  return shade.toString(16);
}
