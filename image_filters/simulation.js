let image_data;
let kernel_matrix;
let image;

function update() {
    getImage();
    left_context.fillStyle = "#000000";
    left_context.fillRect(0, 0, canvas_width, canvas_height);
    drawImageScaled(image, left_context);

    image_data = left_context.getImageData(0, 0, canvas_width, canvas_height).data;

    console.log(image_data);

    let r, g, b;
    let index;

    applyKernel();
    console.log(image_data);

    for (let i = 1; i < canvas_height - 1; i++) {
        for (let j = 1; j < canvas_width - 1; j++) {
            index = Math.floor(4 * ((i * canvas_width) + j));
            r = image_data[index];
            g = image_data[index + 1];
            b = image_data[index + 2];
            right_context.fillStyle = `rgb(${r}, ${g}, ${b})`;
            right_context.fillRect(j, i, 1, 1);
        }
    }
    paused = true;
}

function getImage() {
    image = document.getElementById(`${image_select.value}`);
}

function applyKernel() {
    let final_value, index;
    let new_image_data = Array.from(image_data);

    for (let i = 1; i < canvas_height - 1; i++) {
        for (let j = 1; j < canvas_width - 1; j++) {
            index = Math.floor(4 * (i * canvas_width + j));
            for (let k = 0; k < 4; k++) {
                final_value = 0;
                final_value += kernel_matrix[0][0] * getValue(i - 1, j - 1, k);
                final_value += kernel_matrix[0][1] * getValue(i - 1, j, k);
                final_value += kernel_matrix[0][2] * getValue(i - 1, j + 1, k);
                final_value += kernel_matrix[1][0] * getValue(i, j - 1, k);
                final_value += kernel_matrix[1][1] * getValue(i, j, k);
                final_value += kernel_matrix[1][2] * getValue(i, j + 1, k);
                final_value += kernel_matrix[2][0] * getValue(i + 1, j - 1, k);
                final_value += kernel_matrix[2][1] * getValue(i + 1, j, k);
                final_value += kernel_matrix[2][2] * getValue(i + 1, j + 1, k);
                new_image_data[index + k] = Math.floor(final_value);
            }
        }
    }
    image_data = new_image_data;
}

function getValue(i, j, k) {
    return image_data[Math.floor(4 * (i * canvas_width + j) + k)];
}

function render() {

}

function updateParams(variable) {
    if (variable == "kernel") {
        kernel_matrix[0][0] = Number.parseFloat(kernel_inputs[0].value);
        kernel_matrix[0][1] = Number.parseFloat(kernel_inputs[1].value);
        kernel_matrix[0][2] = Number.parseFloat(kernel_inputs[2].value);
        kernel_matrix[1][0] = Number.parseFloat(kernel_inputs[3].value);
        kernel_matrix[1][1] = Number.parseFloat(kernel_inputs[4].value);
        kernel_matrix[1][2] = Number.parseFloat(kernel_inputs[5].value);
        kernel_matrix[2][0] = Number.parseFloat(kernel_inputs[6].value);
        kernel_matrix[2][1] = Number.parseFloat(kernel_inputs[7].value);
        kernel_matrix[2][2] = Number.parseFloat(kernel_inputs[8].value);
        update();
    }
    else if (variable == "kernel-option") {
        setKernel(kernel_select.value);
    }
    else if (variable == "image-option") {
        update();
    }
}

function updateInputKernel(new_kernel) {
    if (new_kernel !== undefined) {
        for (let i = 0; i < 9; i++) {
            kernel_inputs[i].value = new_kernel[i].toFixed(4);
        }
    }
    updateParams('kernel');
}

function setKernel(name) {
    if (name == "identity") {
        updateInputKernel([0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
    else if (name == "edge1") {
        updateInputKernel([1, 0, -1, 0, 0, 0, -1, 0, 1]);
    }
    else if (name == "edge2") {
        updateInputKernel([0, -1, 0, -1, 4, -1, 0, -1, 0]);
    }
    else if (name == "edge3") {
        updateInputKernel([-1, -1, -1, -1, 8, -1, -1, -1, -1]);
    }
    else if (name == "gaussianblur") {
        updateInputKernel([1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16]);
    }
    else if (name == "boxblur") {
        updateInputKernel([1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
    }
    else if (name == "sharpen1") {
        updateInputKernel([0, -1, 0, -1, 5, -1, 0, -1, 0]);
    }
    else if (name == "sharpen2") {
        updateInputKernel([-1, -1, -1, -1, 9, -1, -1, -1, -1]);
    }
    else if (name == "topsobel") {
        updateInputKernel([1, 2, 1, 0, 0, 0, -1, -2, -1]);
    }
    else if (name == "rightsobel") {
        updateInputKernel([-1, 0, 1, -2, 0, 2, -1, 0, 1]);
    }
    else if (name == "bottomsobel") {
        updateInputKernel([-1, -2, -1, 0, 0, 0, 1, 2, 1]);
    }
    else if (name == "leftsobel") {
        updateInputKernel([1, 0, -1, 2, 0, -2, 1, 0, -1]);
    }
    else if (name == "horizontallines") {
        updateInputKernel([-1, -1, -1, 2, 2, 2, -1, -1, -1]);
    }
    else if (name == "verticallines") {
        updateInputKernel([-1, 2, -1, -1, 2, -1, -1, 2, -1]);
    }
    else if (name == "45diagonal") {
        updateInputKernel([-1, -1, 2, -1, 2, 1, 2, -1, -1]);
    }
    else if (name == "135diagonal") {
        updateInputKernel([2, -1, -1, -1, 2, -1, -1, 2]);
    }
    else if (name == "emboss") {
        updateInputKernel([-2, -1, 0, -1, 1, 1, 0, 1, 2]);
    }
}

function initParams() {
    image_select.value = "building";

    kernel_matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    kernel_select.value = "sharpen2";
    updateParams("kernel-option");
}

function drawImageScaled(img, ctx) {
    let canvas = ctx.canvas;
    let scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width / 2) - (img.width / 2) * scale;
    let y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}