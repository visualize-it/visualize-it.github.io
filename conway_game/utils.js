function resetCells() {
    cells = new2dArray(num_cells);
    neighbours = new2dArray(num_cells);
    next_state = new2dArray(num_cells);
}


function new2dArray(num) {
    array = new Array(num);

    for (let i = 0; i < num; i++) {
        array[i] = new Array(num);
    }

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}

function prepareNextState() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            next_state[i][j] = 0;
        }
    }
}

function copyNextState() {
    for (let i = 0; i < num_cells; i++) {
        for (let j = 0; j < num_cells; j++) {
            cells[i][j] = next_state[i][j];
        }
    }
}