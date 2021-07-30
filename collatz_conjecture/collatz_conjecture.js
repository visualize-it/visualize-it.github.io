let series = [];
let starting_number, current_number;
let speed, max_value;

// states
let completed;

function update() {
    for (let iteration = 0; iteration < speed && current_number != 1; iteration++, stopping_time++) {
        if (current_number % 2 == 0) {
            current_number /= 2;
        }
        else {
            current_number = 3 * current_number + 1;
        }
        series.push(current_number);
    }
    
    if(current_number == 1) {
        completed = true;
        max_value = getMax();

        max_value_display.innerHTML = `Maximum value attained: ${max_value}`;
        stoptime_display.innerHTML = `Stopping time: ${stopping_time}`; 
    }
}

function render() {
    if (!completed) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas_width, canvas_height);

        let x_scale = canvas_width / series.length;
        let y_scale = canvas_height / getMax();

        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(0, canvas_height - series[0] * y_scale);
        for (let i = 1; i < series.length; i++) {
            context.lineTo(i * x_scale, canvas_height - series[i] * y_scale);
        }
        context.stroke();
    }
}

function updateParams(variable) {

}

function iterate() {
    current_number = number_input.value;
    stopping_time = 0;
    speed = Math.floor(Math.log(current_number));
    series = [starting_number];
    completed = false;
}

function initParams() {
    number_input.value = 27;
    iterate();
}

function getMax() {
    let max = 0;
    for (let number of series) {
        if (number > max) {
            max = number;
        }
    }
    return max;
}