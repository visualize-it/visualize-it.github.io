function setPattern(pattern_input) {
    if(pattern_input == "squares") {
        let square_length = 10;
        let num_squares = 100;

        for(let square = 0; square < num_squares; square++) {
            let x = randInt(square_length, canvas_width - square_length);
            let y = randInt(square_length, canvas_height - square_length);

            console.log(x, y);
            for(let i = y; i < y + square_length; i++) {
                for(let j = x; j < x + square_length; j++) {
                    old_grid[i][j].b = 1;
                }
            }
        }
    }
    else if(pattern_input == "frame") {
        let square_half_length = 0.35 * canvas_width;
        
        for(let i = canvas_height / 2 - square_half_length; i < canvas_height / 2 + square_half_length; i++) {
            for(let j = canvas_width / 2 - square_half_length; j < canvas_width / 2 + square_half_length; j++) {
                old_grid[Math.floor(i)][Math.floor(j)].b = 1;
            }
        }
    }
    else if(pattern_input == "coral") {
        let square_half_length = 5;

        for(let i = canvas_height / 2 - square_half_length; i < canvas_height / 2 + square_half_length; i++) {
            for(let j = canvas_width / 2 - square_half_length; j < canvas_width / 2 + square_half_length; j++) {
                old_grid[Math.floor(i)][Math.floor(j)].b = 1;
            }
        }
    }
    else if(pattern_input == "mitosis") {
        for(let i = 0; i < canvas_height; i++) {
            for(let j = 0; j < canvas_width; j++) {
                if(distance(canvas_width / 2, canvas_height / 2, j, i) < 16) {
                    old_grid[i][j].b = 1;
                }
            }
        }
        increase_a_input.value = 0.0367;
        decrease_b_input.value = 0.0649;
        updateValues();
    }
    else if(pattern_input == "flower") {
        for(let i = 0; i < canvas_height; i++) {
            for(let j = 0; j < canvas_width; j++) {
                if(distance(canvas_width / 2, canvas_height / 2, j, i) < 5) {
                    old_grid[i][j].b = 1;
                }
            }
        }
        increase_a_input.value = 0.0545;
        decrease_b_input.value = 0.062;
        updateValues();
    }
}