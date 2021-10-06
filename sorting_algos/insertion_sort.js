let sorted_index_i;
let scanning_index_i;
let backtrack_index_i;

let backtracking;

function updateInsertion() {
    if(sorted_index_i < num_numbers) {
        if(backtracking) {
            if(array[backtrack_index_i] < array[backtrack_index_i - 1]) {
                swap(backtrack_index_i - 1, backtrack_index_i);
                backtrack_index_i--;

                array_access += 2;
                swaps++;
            }
            else {
                backtracking = false;
            }
            comparisons++;
        }
        else if(array[scanning_index_i] < array[sorted_index_i]) {
            backtracking = true;
            backtrack_index_i = scanning_index_i;

            array_access += 2;
        }
        else {
            scanning_index_i++;
            sorted_index_i++;
        }
        comparisons++;
        iterations++;
    }
}

function renderInsertion() {
    for(let i = 0; i < num_numbers; i++) {
        if(backtracking && i == backtrack_index_i) {
            context.fillStyle = "#ffffff";
        }
        else if(i <= sorted_index_i + 1) {
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initInsertion() {
    makeArray();

    sorted_index_i = 0;
    scanning_index_i = 1;
    backtrack_index_i = -1;

    backtracking = false;
}