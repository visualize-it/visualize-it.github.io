function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderPoints();
    if (running) {
        renderTrails();

        // draw progress bar on top
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas_width * iteration / num_iterations, 3);
    }

    if (!running && optimum_solution !== undefined && optimum_solution.length != 0) {
        console.log("Hello");
        renderMinPath();
    }
}

function renderPoints() {
    for (let point of points) {
        context.beginPath();
        context.arc(point.x, point.y, near_cutoff, 0, 2 * Math.PI, false);
        context.fillStyle = "#ffffff";
        context.fill();
    }
}

function renderTrails() {
    let total_strength, relative_strength;
    for (let i = 0; i < pheromone_matrix.length; i++) {
        total_strength = 0;
        for (let j = 0; j < pheromone_matrix[i].length; j++) {
            if (i != j) {
                total_strength += Math.pow(pheromone_matrix[i][j], pheromone_influence) * Math.pow(apriori_matrix[i][j], apriori_influence);
            }
        }

        for (let j = 0; j < pheromone_matrix[i].length; j++) {
            if (i != j) {
                relative_strength = Math.pow(pheromone_matrix[i][j], pheromone_influence) * Math.pow(apriori_matrix[i][j], apriori_influence) ** 0.8;
                context.lineWidth = 1;
                context.strokeStyle = "rgba(255, 255, 255, " + relative_strength + ")";
                context.beginPath();
                context.moveTo(points[i].x, points[i].y);
                context.lineTo(points[j].x, points[j].y);
                context.stroke();
            }
        }
    }
}

function renderMinPath() {
    context.lineWidth = 2;
    context.strokeStyle = "#0000ff";
    context.beginPath();
    context.moveTo(points[optimum_solution[0]].x, points[optimum_solution[0]].y);
    for (let i = 1; i < optimum_solution.length; i++) {
        context.lineTo(points[optimum_solution[i]].x, points[optimum_solution[i]].y);
    }
    context.lineTo(points[optimum_solution[0]].x, points[optimum_solution[0]].y);
    context.stroke();
}