let heap_built_h, heap_builder_index_h;

let heap_h;

function updateHeap() {
    if (!heap_built_h) {
        if (heap_builder_index_h < num_numbers) {
            heap_h.insertElement(array[heap_builder_index_h]);
            heap_builder_index_h++;
        }
        else {
            heap_built_h = true;
            heap_builder_index_h--;
            array = zeroArray();
        }
        iterations++;
    }
    else if(heap_builder_index_h > -1) {
        let root_element = heap_h.getRoot();
        heap_h.deleteElement(root_element);
        array[heap_builder_index_h] = root_element;
        heap_builder_index_h--;
        iterations++;
    }
}

function renderHeap() {
    for(let i = 0; i < num_numbers; i++) {
        if(!heap_built_h) {
            if(i == heap_builder_index_h) {
                context.fillStyle = "#ffffff";
            }
            else {
                context.fillStyle = "#ff0000";
            }
            context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
        }
        else {
            if(array[i] == 0) {
                context.fillStyle = "#ff0000";
                context.fillRect(i * x_scale, canvas_height - heap_h.array[i] * y_scale, x_scale, heap_h.array[i] * y_scale);
            }
            else {
                context.fillStyle = "#0000ff"
                context.fillRect(i * x_scale, canvas_height - array[i] * y_scale, x_scale, array[i] * y_scale);
            }   
        }
    }
}

function initHeap() {
    makeArray();
    heap_h = new Heap();

    heap_built_h = false;
    heap_builder_index_h = 0;
}

function zeroArray() {
    array = [];
    for(let i = 0; i < num_numbers; i++) {
        array.push(0);
    }
    return array;
}