let last_position_s;
let scanning_index_s;
let max_number_s, max_position_s;

function updateSelection() {
    if(last_position_s > 0) {
        if(scanning_index_s <= last_position_s) {
            if(array[scanning_index_s] > max_number_s) {
                max_number_s = array[scanning_index_s];
                max_position_s = scanning_index_s;
            }
            scanning_index_s++;

            comparisons++;
            array_access += 2;
        }
        else {
            swap(max_position_s, last_position_s);

            last_position_s--;
            scanning_index_s = 0;
            max_number_s = 0;
            max_position_s = -1;

            swaps++;
        }
        iterations++;
    }
    else {
        last_position_s = -1;
        scanning_index_s = -1;
    }
}

function renderSelection() {
    for(let i = 0; i < num_numbers; i++) {
        if(i == scanning_index_s && i != max_position_s) {
            context.fillStyle = "#ffffff";
        }
        else if(i == max_position_s) {
            context.fillStyle = "#ffff00";
        }
        else if(last_position_s < i) {
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initSelection() {
    makeArray();
    
    last_position_s = num_numbers - 1;
    scanning_index_s = 0;

    max_number_s = 0;
    max_position_s = -1;
}