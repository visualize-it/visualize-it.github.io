let records = [];

let freq_canvas = document.getElementById("frequency-canvas");
freq_canvas.width = freq_canvas.height = canvas_width / 3;
let unit_width = canvas_width / 30;

let freq_context = freq_canvas.getContext("2d");
freq_context.fillStyle = "#000000";
freq_context.fillRect(0, 0, freq_canvas.width, freq_canvas.height);

// for(let i = 0; i < 100; i++) {
//     console.log(gaussianNoise(0, 5.7));
// }

function drawFrequencies() {
    let frequencies = [];

    for(let i = 0; i < 10; i++) {
        frequencies.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    for(let record of records) {
        frequencies[Math.floor(record.y / 0.1)][Math.floor(record.x / 0.1)]++;
    }
    console.log(frequencies);

    let max = 0;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(frequencies[i][j] > max) {
                max = frequencies[i][j];
            }
        }
    }

    let unit_scale = 100 / max;

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            freq_context.fillStyle = getValue(frequencies[j][i] * unit_scale);
            freq_context.fillRect(i * unit_width, freq_canvas.height - j * unit_width, unit_width, unit_width);
        }
    }
}

function getValue(num) {
    return `#${num.toString(16)}${num.toString(16)}${num.toString(16)}`;
}