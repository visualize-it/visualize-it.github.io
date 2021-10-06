let left_sorted_index_c, right_sorted_index_c;
let scanning_index_c;

let num_interest_c, num_position_c;

let state_c;

function updateCocktail() {
    if(left_sorted_index_c < right_sorted_index_c) {
        if(state_c == "max") {
            if(scanning_index_c <= right_sorted_index_c) {
                if(array[scanning_index_c] > num_interest_c) {
                    num_interest_c = array[scanning_index_c];
                    num_position_c = scanning_index_c;
                }
                scanning_index_c++;

                array_access++;
            }
            else {
                swap(num_position_c, right_sorted_index_c);
                right_sorted_index_c--;

                state_c = "min";
                scanning_index_c = right_sorted_index_c;

                num_interest_c = num_numbers;

                swaps++;
            }
            comparisons++;
        }
        else if(state_c == "min") {
            if(scanning_index_c >= left_sorted_index_c) {
                if(array[scanning_index_c] < num_interest_c) {
                    num_interest_c = array[scanning_index_c];
                    num_position_c = scanning_index_c;
                }
                scanning_index_c--;

                comparisons++;
                array_access += 2;
            }
            else {
                swap(num_position_c, left_sorted_index_c);
                left_sorted_index_c++;

                state_c = "max";
                scanning_index_c = left_sorted_index_c;

                num_interest_c = 0;

                swaps++;
            }
        }
        iterations++;
    }
    else {
        num_position_c = -1;
        scanning_index_c = -1;
    }
}

function renderCocktail() {
    for(let i = 0; i < num_numbers; i++) {
        if(left_sorted_index_c >= right_sorted_index_c) {
            context.fillStyle = "#0000ff";
        }
        else if(i == num_position_c) {
            context.fillStyle = "#ffff00";
        }
        else if(i == scanning_index_c) {
            context.fillStyle = "#ffffff";
        }
        else if(i < left_sorted_index_c || right_sorted_index_c < i) {
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initCocktail() {
    makeArray();

    left_sorted_index_c = 0;
    right_sorted_index_c = num_numbers - 1;
    scanning_index_c = 0;

    state_c = "max";
    num_interest_c = 0;
    num_position_c = -1;
}