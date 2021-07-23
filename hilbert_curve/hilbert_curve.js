let order, num_points;
let counter, speed;
let res, translate;
let hue_start;

function update() {

}

function render() {
    let point1, point2;
    let hue;

    for (let i = 0; i < speed && counter < num_points; i++, counter++) {
        hue = hue_start + counter * 255 / num_points;
        if (hue > 255) {
            hue_start -= 255;
        }
        console.log(hue);

        point1 = getPoint(counter - 1);
        point2 = getPoint(counter);
        context.strokeStyle = `hsl(${hue}, 50%, 50%)`;
        context.beginPath()
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.stroke();
    }
}

function getPoint(index) {
    let vector;
    let primary_index = index & 3;

    switch (primary_index) {
        case 0:
            vector = {
                x: 0,
                y: 0
            }
            break;
        case 1:
            vector = {
                x: 0,
                y: 1
            }
            break;
        case 2:
            vector = {
                x: 1,
                y: 1
            }
            break;
        case 3:
            vector = {
                x: 1,
                y: 0
            }
            break;
    }

    let temp, secondary_index, shift;
    for (let iteration = 1; iteration < order; iteration++) {
        index = index >> 2
        secondary_index = index & 3;
        shift = Math.pow(2, iteration);

        switch (secondary_index) {
            case 0:
                temp = vector.x;
                vector.x = vector.y;
                vector.y = temp;
                break;
            case 1:
                vector.y += shift;
                break;
            case 2:
                vector.x += shift;
                vector.y += shift;
                break;
            case 3:
                temp = shift - 1 - vector.x;
                vector.x = shift - 1 - vector.y;
                vector.y = temp;
                vector.x += shift;
                break;
        }
    }

    vector.x *= res;
    vector.x += translate;
    vector.y *= res;
    vector.y += translate;

    return vector;
}

function updateParams(variable) {

}

function initParams() {
    order = 6;
    initialise();
}

function initialise() {
    res = canvas_width / Math.pow(2, order);
    num_points = Math.pow(4, order);
    translate = res / 2;
    hue_start = Math.random() * 255;

    if (order <= 4) {
        speed = Math.pow(2, order);
    }
    else if (order <= 8) {
        speed = Math.pow(2, order + 1);
    }
    else if (order <= 12) {
        speed = Math.pow(2, order + 2);
    }
    else if (order <= 16) {
        speed = Math.pow(2, order + 3);
    }

    counter = 1;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    order_display.innerHTML = `Order of Hilbert Curve: ${order}`;
}