// simulation params
let temperatures = [];
let num_points;
let highest_temp, lowest_temp, range;

// generation initParams
let temperature_seed;
let cursor_position;
let change, highest_change, lowest_change;
let increase_factor, discourage_factor;

// plotting initParams
let padding, lowest_y, highest_y;
let x_scale, y_scale, y_offset;

function update() {

}

function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas_width, canvas_height);

  plotTemperatures();
}

function plotTemperatures() {
  context.strokeStyle = "#ffffff";

  context.beginPath();
  context.moveTo(0, padding);
  context.lineTo(canvas_width, padding);
  context.stroke();

  context.beginPath();
  context.moveTo(0, canvas_height - padding);
  context.lineTo(canvas_width, canvas_height - padding);
  context.stroke();

//  context.fillStyle = "#ffffff";
//  for(let i = 0; i < temperatures.length; i++) {
//    context.fillRect(i * x_scale, (canvas_height - temperatures[i]) * y_scale - y_offset, 1, 1);
//  }

  context.beginPath();
  context.moveTo(0, (canvas_height - temperatures[0]) * y_scale - y_offset);
  for(let i = 1; i < temperatures.length; i++) {
    context.lineTo(i * x_scale, (canvas_height - temperatures[i]) * y_scale - y_offset);
  }
  context.stroke();
}

function updateParams(variable) {

}

function generateTemperatures() {
  temperatures.push(temperature_seed);

  for(let i = 0; i < num_points / 2; i++) {
    change = getRandom(lowest_change, highest_change);
    if(Math.random() < increase_factor) {
      temperatures.unshift(temperatures[0] + change);
      increase_factor -= discourage_factor;
    }
    else {
      temperatures.unshift(temperatures[0] - change);
      increase_factor += discourage_factor;
    }

    if(increase_factor >= 1 || increase_factor <= 0) {
      increase_factor = 0.5;
    }
  }

  increase_factor = 0.5;

  for(let i = 0; i < num_points / 2; i++) {
    change = getRandom(lowest_change, highest_change);
    if(Math.random() < increase_factor) {
      temperatures.push(temperatures[temperatures.length - 1] + change);
      increase_factor -= discourage_factor;
    }
    else {
      temperatures.push(temperatures[temperatures.length - 1] - change);
      increase_factor += discourage_factor;
    }

    if(increase_factor >= 1 || increase_factor <= 0) {
      increase_factor = 0.5;
    }
  }

  console.log(temperatures);
  preparePlot();
}

function preparePlot() {
  highest_temp = 0;
  lowest_temp = Infinity;

  for(let temperature of temperatures) {
    if(temperature > highest_temp) {
      highest_temp = temperature;
    }
    else if(temperature < lowest_temp) {
      lowest_temp = temperature;
    }
  }

  range = highest_temp - lowest_temp;
  x_scale = canvas_width / num_points;
  y_scale = (canvas_height - 2 * padding) / range;
  y_offset = y_scale * (canvas_height - highest_temp) - padding;

  console.log(lowest_temp, highest_temp, range);
}

function initParams() {
  num_points = 10000;
  temperature_seed = 298;

  highest_change = 10;
  lowest_change = 2;
  increase_factor = 0.5;
  discourage_factor = 0.03;

  padding = mobile ? 5 : 10;

  generateTemperatures();
}
