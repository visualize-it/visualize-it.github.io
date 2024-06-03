let nodes = [], edges = [];
let n, k, p;

let network_radius, node_radius;
let num_bezier_points;

let updated;

function update() {
    if (updated) {
        render();
        updated = false;

        // calculation of clustering coefficient
        let c_final = 0;
        let neighs_list = [];
        let num_neighs, num_max_nodes, num_act_nodes;
        for (let node of nodes) {
            neighs_list = getNeighsList(node);
            num_neighs = neighs_list.length;
            num_max_nodes = num_neighs * (num_neighs - 1) / 2;

            num_act_nodes = 0;
            for (let i = 0; i < num_neighs; i++) {
                for (let j = i + 1; j < num_neighs; j++) {
                    if (edgeBetween(neighs_list[i], neighs_list[j])) {
                        num_act_nodes++;
                    }
                }
            }

            if (num_max_nodes == 0) {
                num_max_nodes = 1;
            }

            c_final += num_act_nodes / num_max_nodes;
        }
        c_final /= n;
        c_display.innerHTML = `Clustering coefficient: ${c_final.toFixed(2)}`;

        // calculation of average path length
        let l_final = 0;
        let num_pairs = 0;
        let dist_between;

        for (let source = 0; source < n; source++) {
            let distances = shortestDistanceBetween(source);
            for (let target = source + 1; target < n; target++) {
                dist_between = distances[target];
                l_final += dist_between;
                num_pairs++;
            }
        }
        l_final /= num_pairs;
        l_display.innerHTML = `Characteristic length: ${l_final.toFixed(2)}`;
    }
}

function shortestDistanceBetween(source) {
    let distances = [];
    for (let i = 0; i < n; i++) {
        distances.push(Infinity);
    }
    distances[source] = 0;

    let unvisited = [];
    for (let i = 0; i < n; i++) {
        unvisited.push(i);
    }

    while (unvisited.length > 0 && !allInfinite(distances)) {
        let min_dist = Infinity;
        let min_node = -1;
        for (let i = 0; i < n; i++) {
            if (unvisited.includes(i) && distances[i] < min_dist) {
                min_dist = distances[i];
                min_node = i;
            }
        }

        unvisited.splice(unvisited.indexOf(min_node), 1);

        let neighs = getNeighsList(nodes[min_node]);
        for (let neigh of neighs) {
            if (unvisited.includes(neigh.index)) {
                let new_distance = distances[min_node] + 1;
                if (new_distance < distances[neigh.index]) {
                    distances[neigh.index] = new_distance;
                }
            }
        }
    }
    return distances;
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let node of nodes) {
        node.render();
    }

    for (let edge of edges) {
        edge.render();
    }
}

function updateParams(variable) {
    if (variable == "n") {
        n = n_input.value;
        n_display.innerHTML = `Number of nodes: ${n}`;

        k_input.max = `${n - 1}`;
        updateParams("k");
        k_display.innerHTML = `Number of edges per node: ${k} (max: ${k_input.max})`;
        
        constructNetwork();
        p_input.value = 0;
        updateParams("p");
    }
    if (variable == "k") {
        k = parseInt(k_input.value);
        k_display.innerHTML = `Number of edges per node: ${k} (max: ${k_input.max})`;
        constructNetwork();
        p_input.value = 0;
        updateParams("p");
    }
    if (variable == "p") {
        p = p_input.value;
        p_display.innerHTML = `Rewire propensity: ${p}`;
        rewireNetwork();
    }
}

function constructNetwork() {
    nodes = [];
    edges = [];

    for (let i = 0; i < n; i++) {
        nodes.push(new Node(i));
    }

    let source, target;
    for (let i = 0; i < n; i++) {
        source = nodes[i];
        for (let j = 0; j < Math.ceil(k / 2); j++) {
            target = nodes[(i + j + 1) % n];
            edges.push(new Edge(source, target));
        }
    }

    updated = true;
}

function rewireNetwork() {
    for (let edge of edges) {
        if (p > edge.rewire_propensity) {
            if (edge.target.index != edge.original_target.index) {
                continue;
            }
            while (true) {
                let new_target = nodes[Math.floor(Math.random() * n)];
                if (!edgeBetween(edge.source, new_target) && new_target.index != edge.source.index) {
                    edge.target = new_target;
                    break;
                }
            }
        }
        else {
            edge.target = edge.original_target;
        }
    }

    updated = true;
}

function edgeBetween(source, target) {
    for (let edge of edges) {
        if (edge.source == source && edge.target == target) {
            return true;
        }
        if (edge.source == target && edge.target == source) {
            return true;
        }
    }
    return false;
}

function getNeighsList(node) {
    let neighs = [];
    for (let edge of edges) {
        if (edge.source == node) {
            neighs.push(edge.target);
        }
        if (edge.target == node) {
            neighs.push(edge.source);
        }
    }
    return neighs;
}

function initParams() {
    updateParams("n");
    updateParams("k");
    updateParams("p");

    network_radius = canvas_width / 2.5;
    node_radius = 10;
    num_bezier_points = 100;

    constructNetwork();
    rewireNetwork();

    updated = true;
}

function allInfinite(distances) {
    for (let i = 0; i < distances.length; i++) {
        if (distances[i] != Infinity) {
            return false;
        }
    }

    return true;
}