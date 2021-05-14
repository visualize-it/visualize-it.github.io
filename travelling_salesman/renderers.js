function renderPoints() {
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 1;
    for (let coord of coords) {
        context.beginPath();
        context.arc(padding + scale * coord.x, padding + scale * coord.y, 5, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
}

function renderShortestPath() {
    if ((solving || solved) && coords.length) {
        context.strokeStyle = "#0000ff";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(padding + scale * coords[shortest_path[0]].x, padding + scale * coords[shortest_path[0]].y);
        for (let i = 1; i < shortest_path.length; i++) {
            context.lineTo(padding + scale * coords[shortest_path[i]].x, padding + scale * coords[shortest_path[i]].y);
        }

        context.stroke();
    }
}

function renderCurrentPath()
{
    if (solving && coords.length) {
        context.strokeStyle = "#aaaaaa";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(padding + scale * coords[permutation_set[current_permutation][0]].x, padding + scale * coords[permutation_set[current_permutation][0]].y);
        for (let i = 1; i < permutation_set[current_permutation].length; i++) {
            context.lineTo(padding + scale * coords[permutation_set[current_permutation][i]].x, padding + scale * coords[permutation_set[current_permutation][i]].y);
        }

        context.stroke();
    }
}

function renderProgressBar()
{
    if(solving && coords.length)
    {
        context.fillStyle = "#ffffff";
        context.fillRect(padding, 0, bar_length * current_permutation / permutation_set.length, 2);
    }
}

function renderTarget()
{
    if(!solving)
    {
        context.strokeStyle = "#999999";
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(padding + scale * x_bar.value, 0);
        context.lineTo(padding + scale * x_bar.value, canvas_height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, padding + scale * (100 - y_bar.value));
        context.lineTo(canvas_width, padding + scale * (100 - y_bar.value));
        context.stroke();
    }
}