let pivot_q;

let series_record_q = [];

let series_start_q, series_end_q;

let left_pointer_q, right_pointer_q;

let left_moving_q, right_moving_q, completed_q;

function updateQuick() {
    if (left_pointer_q < right_pointer_q) {
        if (left_moving_q) {
            if (array[left_pointer_q] > array[pivot_q]) {
                left_moving_q = false;
                right_moving_q = true;
            }
            else {
                left_pointer_q++;
            }

            comparisons++;
            array_access += 2;
        }
        else if (right_moving_q) {
            if (array[right_pointer_q] < array[pivot_q]) {
                right_moving_q = false;
            }
            else {
                right_pointer_q--;
            }

            comparisons++;
            array_access += 2;
        }
        else {
            swap(left_pointer_q, right_pointer_q);
            left_moving_q = true;

            swaps++;
        }
        iterations++;
    }
    else if(!completed_q) {
        swap(left_pointer_q, pivot_q);
        series_record_q.unshift({
            left: series_start_q,
            right: left_pointer_q - 1
        });
        series_record_q.unshift({
            left: right_pointer_q + 1,
            right: series_end_q
        });

        initNewSeriesQuick();

        swaps++;
        iterations++;
    }
    else {
        for(let i = 1; i < num_numbers; i++) {
            if(array[i-1] > array[i]) {
                swap(i-1, i);
            }
        }
    }
}

function renderQuick() {
    for (let i = 0; i < num_numbers; i++) {
        if(completed_q) {
            context.fillStyle = "#0000ff";
        }
        else if (i == pivot_q) {
            context.fillStyle = "#00008b";
        }
        else if (i == left_pointer_q) {
            if (left_moving_q) {
                context.fillStyle = "#ffffff";
            }
            else {
                context.fillStyle = "#ffff00";
            }
        }
        else if (i == right_pointer_q) {
            if (right_moving_q) {
                context.fillStyle = "#ffffff";
            }
            else {
                context.fillStyle = "#ffff00";
            }
        }
        else if (series_start_q <= i && i <= series_end_q) {
            context.fillStyle = "#ff0000";
        }
        else {
            context.fillStyle = "#666666";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initQuick() {
    makeArray();

    pivot_q = num_numbers - 1;
    left_pointer_q = 0;
    right_pointer_q = pivot_q - 1;

    left_moving_q = true;
    right_moving_q = false;

    series_start_q = -1;
    series_end_q = num_numbers;

    completed_q = false;

    series_record_q = [];
}

function initNewSeriesQuick() {
    let series;
    do {
        if(series_record_q.length == 0) {
            completed_q = true;
            break;
        }
        else {
            series = series_record_q.pop();
        }
        
        series_start_q = series.left;
        series_end_q = series.right;

        if(series_end_q - series_start_q >= 2) {
            left_pointer_q = series_start_q - 1;
            pivot_q = series_end_q;
            right_pointer_q = series_end_q;

            left_moving_q = true;
            right_moving_q = false;
            break;
        }
    } while(true);
}