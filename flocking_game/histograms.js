let histogram_canvas = document.getElementById("histogram-canvas");
let histogram_context = histogram_canvas.getContext("2d");

histogram_canvas.width = canvas_width;
histogram_canvas.height = 200;
let bar_thickness = canvas_width / 32;

let attraction_histogram = [], orientation_histogram = [], persistence_histogram = [];

function updateHistograms() {
    attraction_histogram = [];
    orientation_histogram = [];
    persistence_histogram = [];

    for (let i = 0; i < 10; i++) {
        attraction_histogram.push(0);
        orientation_histogram.push(0);
        persistence_histogram.push(0);
    }

    for (let boid of boids) {
        if (boid.isAlive) {
            attraction_histogram[Math.floor(boid.attraction / 0.1)]++;
            orientation_histogram[Math.floor(boid.orientation / 0.1)]++;
            persistence_histogram[Math.floor(boid.persistence / 0.1)]++;
        }
    }
}

function drawHistograms() {
    updateHistograms();

    histogram_context.fillStyle = "#000000";
    histogram_context.fillRect(0, 0, histogram_canvas.width, histogram_canvas.height);

    if (numAliveBoids()) {
        for (let i = 0; i < 10; i++) {
            histogram_context.fillStyle = "#ff0000";
            histogram_context.fillRect(i * bar_thickness, (numAliveBoids() - attraction_histogram[i]) * histogram_canvas.height / numAliveBoids(), bar_thickness, attraction_histogram[i] * histogram_canvas.height / numAliveBoids());
            histogram_context.fillStyle = "#00ff00";
            histogram_context.fillRect((11 + i) * bar_thickness, (numAliveBoids() - orientation_histogram[i]) * histogram_canvas.height / numAliveBoids(), bar_thickness, orientation_histogram[i] * histogram_canvas.height / numAliveBoids());
            histogram_context.fillStyle = "#0000ff";
            histogram_context.fillRect((22 + i) * bar_thickness, (numAliveBoids() - persistence_histogram[i]) * histogram_canvas.height / numAliveBoids(), bar_thickness, persistence_histogram[i] * histogram_canvas.height / numAliveBoids());
        }
    }
}