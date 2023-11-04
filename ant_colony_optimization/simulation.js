let points = [];
let near_cutoff;

let num_ants;
let pheromone_matrix, apriori_matrix;
let ant_paths;

let eva_factor, pheromone_influence, apriori_influence, rate;

let running, iteration;
let num_iterations;

let optimum_solution;

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
                    probability = Math.pow(pheromone_matrix[current_node][possible_node], pheromone_influence) * Math.pow(apriori_matrix[current_node][possible_node], apriori_influence);
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
        let distance, current_node, next_node;
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

        let min_distance = Math.min(...ant_distances);
        let min_ant = -1;
        for (let ant = 0; ant < num_ants; ant++) {
            if (ant_distances[ant] == min_distance) {
                min_ant = ant;
                break;
            }
        }

        console.log(ant_distances);

        // update optimum solution
        optimum_solution = ant_paths[min_ant];

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
        if (iteration >= num_iterations) {
            running = false;
        }
    }
}

function updateParams(variable) {
    if (variable == "num") {
        num_ants = num_input.value;
        num_display.innerHTML = `Number of ants: ${num_ants}<br>(if changed, simulation will restart)`;

        if (running) {
            initSimulation();
        }
    }
    if (variable == "eva") {
        eva_factor = eva_input.value;
        eva_display.innerHTML = `Evaporation factor (&rho;): ${eva_factor}`;
    }
    if (variable == "phe") {
        pheromone_influence = phe_input.value;
        phe_display.innerHTML = `Pheromone influence (&alpha;): ${pheromone_influence}`;
    }
    if (variable == "apr") {
        apriori_influence = apr_input.value;
        apr_display.innerHTML = `Apriori influence (&beta;): ${apriori_influence}`;
    }
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

        optimum_solution = [];

        iteration = 0;
        running = true;
    }
}

function placeAnts() {
    ant_paths = []

    let node;
    for (let i = 0; i < num_ants; i++) {
        node = randInt(0, points.length);
        ant_paths.push([node]);
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
    optimum_solution = [];

    near_cutoff = 7;
    running = false;
    num_iterations = 200;
    rate = canvas_width;

    updateParams("num");
    updateParams("eva");
    updateParams("phe");
    updateParams("apr");

    for (let i = 0; i < 20; i++) {
        randomPoint();
    }
    initSimulation();
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
            points.push({ x: Math.round(x), y: Math.round(y) });
            optimum_solution = [];
        }
    }
}

function randomPoint() {
    if (!running) {
        let x = randInt(0, canvas_width);
        let y = randInt(0, canvas_height);
        points.push({ x: x, y: y });
        optimum_solution = [];
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
        optimum_solution = [];
    }
}