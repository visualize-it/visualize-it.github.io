let nodes = [], edges = [];
let n, k, p;

let network_radius, node_radius;
let num_bezier_points;

let updated;

function update() {
    if (updated) {
        render();
        updated = false;
    }
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

        if ((n - 1) % 2 == 0) {
            k_input.max = `${n - 1}`;
        }
        else {
            k_input.max = `${n - 2}`;
        }
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
        for (let j = 0; j < k / 2; j++) {
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
                if (noDuplicate(edge.source, new_target)) {
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

function noDuplicate(source, target) {
    for (let edge of edges) {
        if (edge.source == source && edge.target == target) {
            return false;
        }
        if (edge.source == target && edge.target == source) {
            return false;
        }
    }
    return true;

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