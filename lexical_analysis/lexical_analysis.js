// States
let previous_state, current_state;

// Stack
let character_stack = "";
let value_stack = [];
let type_stack = [];

// records
let trace_back = [];

// Character lists
let operators = [];
let syntax = [];

function lexical_analyser(text) {
    prepare();

    for (let i = 0; i < text.length; i++) {
        trace_back.push(get_state(text[i]));
    }
    console.log("Trace back: ", trace_back);

    for (let i = 0; i < text.length; i++) {
        previous_state = current_state
        current_state = get_state(text[i]);

        if (previous_state != current_state) {
            unload_stack();
            character_stack = text[i];
        }
        else {
            character_stack += text[i];
        }
    }

    clear_stack();

    console.log("Value stack: ", value_stack);
    console.log("Type stack:", type_stack);

    output = [];

    for (let i = 0; i < value_stack.length; i++) {
        output.push({
            value: value_stack[i],
            type: type_stack[i],
        })
    }

    prepare();
    return output;
}

function unload_stack() {
    if (character_stack.length > 0) {
        if (previous_state == "number") {
            value_stack.push(Number.parseFloat(character_stack));
            if (previous_state !== undefined) {
                type_stack.push(previous_state);
            }
        }
        else if (previous_state == "text") {
            value_stack.push(character_stack);
            if (previous_state !== undefined) {
                type_stack.push(previous_state);
            }
        }
        else if (previous_state == "operator" || previous_state == "syntax") {
            for (character of character_stack) {
                value_stack.push(character);
                if (previous_state !== undefined) {
                    type_stack.push(previous_state)
                }
            }
        }
    }
}

function clear_stack() {
    if (character_stack.length > 0) {
        if (current_state == "number") {
            value_stack.push(Number.parseFloat(character_stack));
            type_stack.push(current_state);
        }
        else if (current_state == "text") {
            value_stack.push(character_stack);
            type_stack.push(current_state);
        }
        else if (current_state == "operator" || current_state == "syntax") {
            for (character of character_stack) {
                value_stack.push(character);
                type_stack.push(current_state);
            }
        }
    }
}

function get_state(character) {
    let ascii_code = character.charCodeAt(0);

    if (47 < ascii_code && ascii_code < 58) {
        return "number";
    }
    else if (current_state == "number" && character == ".") {
        return "number";
    }
    else if ((64 < ascii_code && ascii_code < 91) || (96 < ascii_code && ascii_code < 123)) {
        return "text";
    }
    else if (operators.includes(character)) {
        return "operator";
    }
    else if (syntax.includes(character)) {
        return "syntax";
    }
    else if (character == " ") {
        return "space";
    }
}

function initialise_lexical_analyser() {
    operators.push("=", "+", "-", "*", "/", "^", "%", "!", "&", "|");
    syntax.push("(", ")", ";");
}

function prepare() {
    character_stack = "";
    value_stack = [];
    type_stack = [];
    trace_back = [];

    previous_state = undefined;
    current_state = undefined;
}

