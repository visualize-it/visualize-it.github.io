let sorted_position_b;
let scanning_index_b;

function updateBubble() {
    if(sorted_position_b > 0) {
        if(scanning_index_b < sorted_position_b) {
            if(array[scanning_index_b - 1] > array[scanning_index_b]) {
                swap(scanning_index_b - 1, scanning_index_b);

                swaps++;
                array_access += 2;
            }
            scanning_index_b++;

            comparisons++;
        }
        else {
            scanning_index_b = 1;
            sorted_position_b--;
        }
        iterations++;
    }
    else {
        scanning_index_b = -2;
    }
}

function renderBubble() {
    for(let i = 0; i < num_numbers; i++) {
        if(i == scanning_index_b - 1 || i == scanning_index_b) {
            context.fillStyle = "#ffffff";
        }
        else if(i >= sorted_position_b) {
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initBubble() {
    makeArray();
    
    sorted_position_b = num_numbers;
    scanning_index_b = 1;
}