// coordinates
let coords = [];

// display params
let scale, padding, radius, bar_length;

// paths
let shortest_path, shortest_path_length;

// permutations;
let permutation_set;
let current_permutation;

// states
let solving, solved;

function update() {
    if (solving) {
        let current_path_length = calcPathLength(permutation_set[current_permutation]);
        if (current_path_length < shortest_path_length) {
            shortest_path = permutation_set[current_permutation];
            shortest_path_length = current_path_length;
        }

        current_permutation++;
        if (current_permutation == permutation_set.length - 1) {
            solving = false;
            solved = true;
            console.log("Shortest Path Length: ", shortest_path_length);
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    renderPoints();
    renderShortestPath();
    renderCurrentPath();
    renderProgressBar();
}

function calcPathLength(path) {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
        length += distanceBetween(permutation_set[current_permutation][i-1], permutation_set[current_permutation][i]);
    }
    console.log("Path Length: ", length);
    return length;
}

function updateParams(variable) {

}

function initParams() {
    radius = 2 ? mobile : 4;
    padding = 2 * radius;
    scale = (canvas_width - 2 * padding) / 100;
    bar_length = canvas_width - 2 * padding;

    addRandom(6);
    solve();
}

function getPermutations(array) {
    let permutations = [];

    for (let i = 0; i < array.length; i++) {
        let rest = getPermutations(array.slice(0, i).concat(array.slice(i + 1)));

        if (!rest.length) {
            permutations.push([array[i]])
        }
        else {
            for (let j = 0; j < rest.length; j++) {
                permutations.push([array[i]].concat(rest[j]))
            }
        }
    }
    return permutations;
}

function addRandom(number) {
    for (let i = 0; i < number; i++) {
        coords.push(
            {
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100),
            }
        )
    }
}

function removeLast(number) {
    for (let i = 0; i < number && coords.length > 0; i++) {
        coords.pop();
    }
}

function clearCoords() {
    coords = [];
    solving = false;
    solved = false;
    shortest_path = [];
}

function solve() {
    if (!solving) {
        solving = true;

        let array = [];
        for (let i = 0; i < coords.length; i++) {
            array.push(i);
        }

        let start = performance.now();
        let permutations = getPermutations(array);
        console.log(permutations);
        console.log(performance.now() - start, " ms");
        permutation_set = permutations;

        current_permutation = 0;
        shortest_path_length = Infinity;
    }
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(coords[point2].x - coords[point1].x, 2) + Math.pow(coords[point2].y - coords[point1].y, 2));
}