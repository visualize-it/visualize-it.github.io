function drawGraph() {

    for(let animal of animals) {
        positions.push(animal.x);
    }
    let min = Math.min.apply(null, positions), max = Math.max.apply(null, positions);

    let positive_intervals, negative_intervals;

    positive_intervals = Math.floor(max / interval_length) + 1;
    negative_intervals = Math.floor(-min / interval_length) + 1;

    let positive_section = [], negative_section = [];

    for(let i = 0; i < positive_intervals; i++) {
        positive_section.push(0);
    }

    for(let i = 0; i < negative_intervals; i++) {
        negative_section.push(0);
    }

    for(let position of positions) {
        if(position > 0) {
            positive_section[Math.floor(position / interval_length)]++;
        }
        else if(position < 0) {
            negative_section[Math.floor(-position / interval_length)]++;
        }
        else if(position == 0) {
            if(Math.random() > 0.5) {
                positive_section[0]++;
            }
            else {
                negative_section[0]++;
            }
        }
    }

    let max_freq = Math.max(Math.max.apply(null, positive_section), Math.max.apply(null, negative_section));
    let scale = graph_canvas.height / max_freq;

    graph_context.fillStyle = "#000000";
    graph_context.fillRect(0, 0, graph_canvas.width, graph_canvas.height);

    
    for(let i = 0; i < positive_section.length; i++) {
        if(i % 2 == 0) {
            graph_context.fillStyle = "#1f51ff";
        }
        else {
            graph_context.fillStyle = "#ff5f1f"
        }
        graph_context.fillRect(graph_canvas.width / 2 + separation_multiplier * i * interval_length, graph_canvas.height - positive_section[i] * scale, separation_multiplier * interval_length, positive_section[i] * scale);
    }

    for(let i = 0; i < negative_section.length; i++) {
        if(i % 2 == 1) {
            graph_context.fillStyle = "#1f51ff";
        }
        else {
            graph_context.fillStyle = "#ff5f1f"
        }
        graph_context.fillRect(graph_canvas.width / 2 - separation_multiplier * (i + 1) * interval_length, graph_canvas.height - negative_section[i] * scale, separation_multiplier * interval_length, negative_section[i] * scale);
    }
}

function drawCurve() {
    graph_context.strokeStyle = "#ffffff";

    let scale = graph_canvas.height / Gaussian(0);
    graph_context.beginPath();
    graph_context.moveTo(graph_canvas.width / 2, graph_canvas.height - scale * Gaussian(0));

    for(let i = 1; i < 100; i++) {
        graph_context.lineTo(graph_canvas.width / 2 + 2 * separation_multiplier * i, graph_canvas.height - scale * Gaussian(separation_multiplier * i));
    }
    graph_context.stroke();

    graph_context.beginPath();
    graph_context.moveTo(graph_canvas.width / 2, graph_canvas.height - scale * Gaussian(0));
    for(let i = 1; i < 100; i++) {
        graph_context.lineTo(graph_canvas.width / 2 - 2 * separation_multiplier * i, graph_canvas.height - scale * Gaussian(-separation_multiplier * i));
    }
    graph_context.stroke();
}