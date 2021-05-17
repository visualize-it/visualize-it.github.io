input_text = document.getElementById("input-text");
output_text = document.getElementById("output-text");

window.onload = function () {
    initialise_lexical_analyser();
    input_text.value = "y = amp * cos(omega * t - k * x);";
    analyse();
}

function analyse() {
    output = lexical_analyser(input_text.value);
    output_string = "";

    for (let i = 0; i < output.length; i++) {
        if (output[i].type == "number") {
            output_string += `[number: ${output[i].value}] `;
        }
        else {
            output_string += `[${output[i].type}: "${output[i].value}"] `;
        }
    }
    console.log(output_string);
    output_text.innerHTML = output_string;
}