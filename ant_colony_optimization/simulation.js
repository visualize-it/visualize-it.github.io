let points = [];
let near_cutoff;

let num_ants;
let pheromone_matrix, apriori_matrix;
let ant_paths;

let eva_factor, pheromone_influcene, apriori_influence, rate;

let running, iteration;
let num_iterations;

function update() {
    if (running) {
        // put ants in initial position
        placeAnts();

        // make them move one by one
        for (let ant = 0; ant < num_ants; ant++) {
            let current_node, possible_nodes;
            let probability, probabilities, normalization;
            let choose_random, cum_prob;

            // make ant move until it has visited all nodes
            while (ant_paths[ant].length < points.length) {
                current_node = ant_paths[ant][ant_paths[ant].length - 1];
                possible_nodes = [];

                // consider only those nodes which it hasn't visited
                for (let node = 0; node < points.length; node++) {
                    if (!pathContainsNode(ant_paths[ant], node)) {
                        possible_nodes.push(node);
                    }
                }

                // calculate probabilities
                probabilities = [];
                for (let possible_node of possible_nodes) {
                    probability = pheromone_matrix[current_node][possible_node] * apriori_matrix[current_node][possible_node];
                    probabilities.push(probability);
                }

                // normalize probabilities to each node
                normalization = 0;
                for (let probability of probabilities) {
                    normalization += probability;
                }
                for (let i = 0; i < probabilities.length; i++) {
                    probabilities[i] /= normalization;
                }

                // choose next node based on probabilities
                choose_random = Math.random();
                cum_prob = 0;
                for (let i = 0; i < probabilities.length; i++) {
                    cum_prob += probabilities[i];
                    if (choose_random <= cum_prob) {
                        ant_paths[ant].push(possible_nodes[i]);
                        break;
                    }
                }
            }
        }

        // calculate path distance for each ant
        let ant_distances = [];
        let distance, current_node, next_node
        for (let ant = 0; ant < num_ants; ant++) {
            distance = 0;
            for (let i = 0; i < ant_paths[ant].length - 1; i++) {
                current_node = ant_paths[ant][i];
                next_node = ant_paths[ant][i + 1];
                distance += getDistance(points[current_node].x, points[current_node].y, points[next_node].x, points[next_node].y);
            }

            // wrap around to form circular path
            current_node = ant_paths[ant][ant_paths[ant].length - 1];
            next_node = ant_paths[ant][0];
            distance += getDistance(points[current_node].x, points[current_node].y, points[next_node].x, points[next_node].y);
            
            ant_distances.push(distance);
        }

        // update pheromone matrix
        let pheromone_trails;
        for (let i = 0; i < pheromone_matrix.length; i++) {
            for (let j = i + 1; j < pheromone_matrix[i].length; j++) {
                pheromone_trails = 0;

                for (let ant = 0; ant < num_ants; ant++) {
                    if (hasAntTakenEdge(ant_paths[ant], i, j) || hasAntTakenEdge(ant_paths[ant], j, i)) {
                        pheromone_trails += rate / ant_distances[ant];
                    }
                }

                pheromone_matrix[i][j] = (1 - eva_factor) * pheromone_matrix[i][j] + pheromone_trails;
                pheromone_matrix[j][i] = pheromone_matrix[i][j];
            }
        }

        // update iteration
        iteration += 1
        console.log(iteration);
        console.log(pheromone_matrix);
        if (iteration >= num_iterations) {
            running = false;
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderPoints();
    if (running) {
        renderTrails();

        // draw progress bar on top
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas_width * iteration / num_iterations, 5);
    }
}

function updateParams(variable) {

}

function initSimulation() {
    if (points.length > 3) {
        apriori_matrix = new2dArray(points.length, points.length);
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i != j) {
                    apriori_matrix[i][j] = 1 / getDistance(points[i].x, points[i].y, points[j].x, points[j].y);
                }
                else {
                    apriori_matrix[i][j] = 0;
                }
            }
        }

        pheromone_matrix = new2dArray(points.length, points.length);
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                pheromone_matrix[i][j] = 1;
            }
        }

        ant_paths = [];
        for (let i = 0; i < num_ants; i++) {
            ant_paths.push([]);
        }

        iteration = 0;
        running = true;
    }
}

function placeAnts() {
    let node;
    for (let i = 0; i < num_ants; i++) {
        node = randInt(0, points.length);
        ant_paths[i].push(node);
    }
}

function hasAntTakenEdge(path, node1, node2) {
    for (let i = 0; i < path.length - 1; i++) {
        if (path[i] == node1 && path[i + 1] == node2) {
            return true;
        }

    }

    if (path[path.length - 1] == node1 && path[0] == node2) {
        return true;
    }

    return false;
}

function initParams() {
    points = [];
    near_cutoff = 7;
    num_ants = 5;
    running = false;
    num_iterations = 100;

    eva_factor = 0.9;
    pheromone_influcene = 1;
    apriori_influence = 1;
    rate = 1;

    for (let i = 0; i < 20; i++) {
        randomPoint();
    }
    initSimulation();
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
                total_strength += pheromone_matrix[i][j] * apriori_matrix[i][j];
            }
        }

        for (let j = 0; j < pheromone_matrix[i].length; j++) {
            if (i != j) {
                relative_strength = (pheromone_matrix[i][j] * apriori_matrix[i][j] / total_strength) ** 0.9;
                context.beginPath();
                context.moveTo(points[i].x, points[i].y);
                context.lineTo(points[j].x, points[j].y);
                context.strokeStyle = "rgba(255, 255, 255, " + relative_strength + ")";
                context.stroke();
            }
        }
    }
}

function clickedAt(x, y) {
    if (!running) {
        let distance = 0;
        let point_nearby = false;
        for (let point of points) {
            distance = getDistance(x, y, point.x, point.y);
            if (distance < near_cutoff) {
                points = removeElement(points, point);
                point_nearby = true;
                break;
            }
        }

        if (!point_nearby) {
            points.push({ x: Math.round(x), y: Math.round(y)});
        }
    }
}

function randomPoint() {
    if (!running) {
        let x = randInt(0, canvas_width);
        let y = randInt(0, canvas_height);
        points.push({ x: x, y: y });
    }
}

function pathContainsNode(path, node) {
    for (let i = 0; i < path.length; i++) {
        if (path[i] == node) {
            return true;
        }
    }
    return false;
}

function clearPoints() {
    if (!running) {
        points = [];
    }
}