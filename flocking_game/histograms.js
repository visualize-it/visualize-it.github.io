let histogram_canvas = document.getElementById("histogram-canvas");
let histogram_context = histogram_canvas.getContext("2d");

histogram_canvas.width = canvas_width;
histogram_canvas.height = 200;

let bar_thickness = canvas_width / 30;

let tortuosity_canvas = document.getElementById("tortuosity-canvas");
let tortuosity_context = tortuosity_canvas.getContext("2d");

tortuosity_canvas.width = canvas_width;
tortuosity_canvas.height = 200;

let attraction_histogram = [], orientation_histogram = [], persistence_histogram = [];
let means = [];

let tortuosity_bar_length = tortuosity_canvas.width / 10;
let tortuosity_histogram = [];

function updateHistograms() {
    attraction_histogram = [];
    orientation_histogram = [];
    persistence_histogram = [];
    means = [];

    for (let i = 0; i < 10; i++) {
        attraction_histogram.push(0);
        orientation_histogram.push(0);
        persistence_histogram.push(0);
    }

    let attraction_sum = 0, orientation_sum = 0, persistence_sum = 0;
    let num_alive_boids = numAliveBoids();

    for (let boid of boids) {
        if (boid.isAlive) {
            attraction_histogram[Math.floor(boid.attraction / 0.1)]++;
            orientation_histogram[Math.floor(boid.orientation / 0.1)]++;
            persistence_histogram[Math.floor(boid.persistence / 0.1)]++;

            attraction_sum += boid.attraction;
            orientation_sum += boid.orientation;
            persistence_sum += boid.orientation;
        }
    }

    means.push(attraction_sum / num_alive_boids);
    means.push(orientation_sum / num_alive_boids);
    means.push(persistence_sum / num_alive_boids);
}

function drawHistograms() {
    updateHistograms();

    histogram_context.fillStyle = "#000000";
    histogram_context.fillRect(0, 0, histogram_canvas.width, histogram_canvas.height);

    let num_alive_boids = numAliveBoids();
    if (num_alive_boids > 0) {
        for (let i = 0; i < 10; i++) {
            histogram_context.fillStyle = "#ff0000";
            histogram_context.fillRect(i * bar_thickness, (num_alive_boids - attraction_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, attraction_histogram[i] * histogram_canvas.height / num_alive_boids);
            histogram_context.fillStyle = "#00ff00";
            histogram_context.fillRect((10 + i) * bar_thickness, (num_alive_boids - orientation_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, orientation_histogram[i] * histogram_canvas.height / num_alive_boids);
            histogram_context.fillStyle = "#0000ff";
            histogram_context.fillRect((20 + i) * bar_thickness, (num_alive_boids - persistence_histogram[i]) * histogram_canvas.height / num_alive_boids, bar_thickness, persistence_histogram[i] * histogram_canvas.height / num_alive_boids);
        }
    }

    histogram_context.strokeStyle = "#ffffff";

    histogram_context.beginPath();
    histogram_context.moveTo(10 * bar_thickness, 0);
    histogram_context.lineTo(10 * bar_thickness, histogram_canvas.height);
    histogram_context.stroke();

    histogram_context.beginPath();
    histogram_context.moveTo(20 * bar_thickness, 0);
    histogram_context.lineTo(20 * bar_thickness, histogram_canvas.height);
    histogram_context.stroke();

    histogram_context.fillStyle = "#aaaaaa";
    histogram_context.fillRect(means[0] * canvas_width / 3, 0, 5, histogram_canvas.height);
    histogram_context.fillRect((means[1] + 1) * canvas_width / 3, 0, 5, histogram_canvas.height);
    histogram_context.fillRect((means[2] + 2) * canvas_width / 3, 0, 5, histogram_canvas.height);
}

function drawTortuosityHistogram() {
    tortuosity_histogram = [];

    for(let i = 0; i < 10; i++) {
        tortuosity_histogram.push(0);
    }

    let sum = 0, num = 0;

    for(let boid of boids) {
        if(boid.tortuosity !== undefined) {
            tortuosity_histogram[Math.floor(boid.tortuosity / 0.1)]++;

            sum += boid.tortuosity;
            num += 1;
        }   
    }

    let mean = sum / num;
    let max_frequency = 0;

    for(let i = 0; i < 10; i++) {
        if(tortuosity_histogram[i] > max_frequency) {
            max_frequency = tortuosity_histogram[i];
        }
    }

    tortuosity_context.fillStyle = "#000000";
    tortuosity_context.fillRect(0, 0, tortuosity_canvas.width, tortuosity_canvas.height);

    tortuosity_context.fillStyle = "#666666";
    for(let i = 0; i < 10; i++) {
        tortuosity_context.fillRect(i * tortuosity_bar_length, (max_frequency - tortuosity_histogram[i]) * tortuosity_canvas.height / max_frequency, tortuosity_bar_length, tortuosity_histogram[i] * tortuosity_canvas.height / max_frequency);
    }
    tortuosity_context.fillStyle = "#aaaaaa";
    tortuosity_context.fillRect(mean * tortuosity_canvas.width, 0, 5, tortuosity_canvas.height);

    tortuosity_context.font = "30px Arial";
    tortuosity_context.textAlign = "center";
    tortuosity_context.fillStyle = "#ffffff";

    for(let i = 0; i < 10; i++) {
        tortuosity_context.fillText(`${tortuosity_histogram[i]}`, (i + 0.5) * tortuosity_bar_length, (tortuosity_canvas.height / 2) + 25, tortuosity_bar_length, 50);
    }
}