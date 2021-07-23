let limit;
let x_scale, y_scale;
let current_num, speed;
let num_primes;

let intervals = [];
let frequencies = [];

function update() {
    for (let i = 0; i < speed && current_num <= limit; i++, current_num++) {
        if (isPrime(current_num)) {
            num_primes++;
        }
        if (intervals.includes(current_num)) {
            frequencies.push(num_primes);
            report();
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    y_scale = canvas_height / frequencies[frequencies.length - 1]

    context.fillStyle = "#ffffff";
    for (let i = 0; i < frequencies.length; i++) {
        context.fillRect(i * x_scale, canvas_height - frequencies[i] * y_scale, x_scale, frequencies[i] * y_scale);
    }
}

function initParams() {
    limit_input.value = 1000;
    limit = 1000;
    initialise();
}

function initialise() {
    intervals = [];
    frequencies = [];

    for (step_size = 1; canvas_width * step_size / limit < 1; step_size++);

    for (let i = limit; i > 0; i -= step_size) {
        intervals.push(i);
    }

    speed = Math.ceil(limit / 100);
    x_scale = canvas_width * step_size / limit;
    current_num = 1;
    num_primes = 0;
}

function isPrime(num) {
    if (num == 1) {
        return false;
    }
    else if (num == 2 || num == 3) {
        return true;
    }
    else if (num % 2 == 0 || num % 3 == 0) {
        return false;
    }
    else {
        let stop = Math.ceil(Math.sqrt(num)) + 1;
        for (let possible_factor = 5; possible_factor < stop; possible_factor++) {
            if (num % possible_factor == 0) {
                return false;
            }
        }
        return true;
    }
}