let intervals_m = [];
let left_interval_m, right_interval_m, interval_length_m;
let left_array_m, right_array_m;
let left_pointer_m, right_pointer_m, final_pointer_m;

let completed_m;

function updateMerge() {
    if (!completed_m) {
        if (left_pointer_m < interval_length_m && right_pointer_m < interval_length_m) {
            if (left_array_m[left_pointer_m] <= right_array_m[right_pointer_m]) {
                array[final_pointer_m++] = left_array_m[left_pointer_m++];

                array_access += 4;
                comparisons++;
            }
            else {
                array[final_pointer_m++] = right_array_m[right_pointer_m++];

                array_access += 2;
            }
        }
        else if (left_pointer_m < interval_length_m) {
            array[final_pointer_m++] = left_array_m[left_pointer_m++];

            array_access += 2;
        }
        else if (right_pointer_m < interval_length_m) {
            array[final_pointer_m++] = right_array_m[right_pointer_m++];

            array_access += 2;
        }
        else {
            console.log("New interval: ", left_interval_m.start, right_interval_m.end);
            intervals_m.unshift({
                start: left_interval_m.start,
                end: right_interval_m.end,
                length: 2 * interval_length_m
            });

            initNewIntervalMerge();
        }
        iterations++;
    }
    else {
        completed_m = true;
    }
}

function renderMerge() {
    for (let i = 0; i < num_numbers; i++) {
        if (completed_m) {
            context.fillStyle = "#0000ff";
        }
        else if (i == left_interval_m.start + left_pointer_m || i == right_interval_m.start + right_pointer_m) {
            context.fillStyle = "#ffffff";
        }
        else if (left_interval_m.start <= i && i <= right_interval_m.end) {
            context.fillStyle = "#ff0000";
        }
        else {
            context.fillStyle = "#666666";
        }
        context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
    }
}

function initMerge() {
    console.log("started merge sort");

    makeArray();
    console.log(array);

    intervals_m = [];
    for (let i = 0; i < num_numbers; i += 1) {
        intervals_m.unshift({
            start: i,
            end: i,
            length: 1
        });
    }

    initNewIntervalMerge()
}

function initNewIntervalMerge() {
    left_interval_m = intervals_m.pop();
    right_interval_m = intervals_m.pop();
    interval_length_m = left_interval_m.length;

    left_pointer_m = 0;
    right_pointer_m = 0;
    final_pointer_m = left_interval_m.start;

    completed_m = false;

    if (left_interval_m === undefined || right_interval_m === undefined) {
        completed_m = true;
    }
    else {
        loadTempArrayMerge();
    }
}

function loadTempArrayMerge() {
    left_array_m = [];
    for (let i = left_interval_m.start; i <= left_interval_m.end; i++) {
        left_array_m.push(array[i]);
    }

    right_array_m = [];
    for (let i = right_interval_m.start; i <= right_interval_m.end; i++) {
        right_array_m.push(array[i]);
    }

    array_access += 2 * interval_length_m;
}