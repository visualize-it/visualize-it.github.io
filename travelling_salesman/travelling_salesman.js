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
        // console.log(current_path_length);
        if (current_path_length < shortest_path_length) {
            shortest_path = permutation_set[current_permutation];
            shortest_path_length = current_path_length;
        }

        current_permutation++;
        if (current_permutation == permutation_set.length - 1) {
            solving = false;
            solved = true;

            add_button.disabled = false;
            remove_button.disabled = false;
            insert_button.disabled = false;

            displaySolution();
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

    renderTarget();
}

function displaySolution()
{
    let solution_string = "<b>Solution</b>: ";

    for(let i = 0; i < coords.length; i++)
    {
        solution_string += `(${coords[shortest_path[i]].x}, ${100 - coords[shortest_path[i]].y}) &rarr; `;
    }
    solution_string += `(${coords[shortest_path[0]].x}, ${100 - coords[shortest_path[0]].y}) `;
    solution.style.display = "block";
    solution.innerHTML = solution_string + ` with distance ${shortest_path_length.toFixed(2)} units`;
}

function updateParams(variable) {

}

function initParams() {
    x_bar.value = 50;
    y_bar.value = 50;

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
    let ideal;
    let new_x, new_y;

    for (let i = 0; i < number; i++) {

        if (coords.length == 0) {
            new_x = Math.floor(Math.random() * 100);
            new_y = Math.floor(Math.random() * 100);
        }

        else {
            ideal = false;
            while (!ideal) {
                new_x = Math.floor(Math.random() * 100);
                new_y = Math.floor(Math.random() * 100);

                ideal = true;
                for (let i = 0; i < coords.length; i++) {
                    if (Math.pow(coords[i].x - new_x, 2) + Math.pow(coords[i].y - new_y, 2) < 100) {
                        ideal = false;
                    }
                }

                if(new_x < 5 || new_x > 95 || new_y < 5 || new_y > 95)
                {
                    ideal = false;
                }
            }
        }

        coords.push(
            {
                x: new_x,
                y: new_y,
            }
        );
    }
}

function insert()
{
    coords.push(
        {
            x: x_bar.value,
            y: 100 - y_bar.value,
        }
    )
}

function solve() {
    if (!solving && coords.length > 1) {
        solving = true;
        solution.style.display = "none";

        let array = [];
        for (let i = 0; i < coords.length; i++) {
            array.push(i);
        }

        let permutations = getPermutations(array);
        for(let permutation of permutations)
        {
            permutation.push(permutation[0]);
        }
        permutation_set = permutations;

        current_permutation = 0;
        shortest_path = permutation_set[current_permutation]
        shortest_path_length = calcPathLength(shortest_path);

        add_button.disabled = true;
        remove_button.disabled = true;
        insert_button.disabled = true;
    }
}

