let particles = [];

let num_red, num_blue, num_green, num_white;

let cutoff_length, damping;

let particle_size = 4;

let colors = ["red", "blue", "orange", "white"];

let statuses = {
    "red": true,
    "blue": true,
    "orange": true,
    "white": true,
}

let interactions = {
    "red": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "blue": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "orange": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    },
    "white": {
        "red": 0,
        "blue": 0,
        "orange": 0,
        "white": 0,
    }
}

function update() {
    for (let particle of particles) {
        if (statuses[particle.color]) {
            let fx = 0, fy = 0;

            for (let other_particle of particles) {
                let dx = particle.x - other_particle.x;
                let dy = particle.y - other_particle.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0 && dist < cutoff_length) {
                    let force = interactions[particle.color][other_particle.color] / dist;
                    fx += force * dx;
                    fy += force * dy;
                }
            }
            particle.applyForce(fx, fy);
        }
    }

    for (let particle of particles) {
        particle.update();
    }
}

function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let particle of particles) {
        if (statuses[particle.color]) {
            particle.render();
        }
    }
}

function updateInteraction(color1, color2) {
    element = interaction_elements[color1][color2];
    value = parseFloat(element.value);

    console.log(value);

    if (!Number.isNaN(value)) {
        console.log("assigning");
        interactions[color1][color2] = value;
        interaction_displays[color1][color2].innerHTML = `${color1} with ${color2}: ${interactions[color1][color2]}`;
    }
}

function updateStatus(color) {
    if (status_elements[color].checked) {
        statuses[color] = true;
    }
    else {
        statuses[color] = false;
        for (let color1 of colors) {
            for (let color2 of colors) {
                if (color1 == color || color2 == color) {
                    interactions[color1][color2] = 0;
                    interactions[color2][color1] = 0;

                    interaction_elements[color1][color2].value = 0;
                    interaction_elements[color2][color1].value = 0;
                }
            }
        }
    }

}

function updateParams(variable) {
    if (variable == "damping") {
        damping = damping_input.value;
        damping_display.innerHTML = `Damping: ${damping}`;
    }
    if (variable == "cutoff") {
        cutoff_length = cutoff_input.value;
        cutoff_display.innerHTML = `Cutoff: ${cutoff_length}`;

        console.log(cutoff_input);
    }
}

function makeParticles(num, color) {
    for (let i = 0; i < num; i++) {
        let x = 0.1 * canvas_width + 0.8 * (Math.random() * canvas_width);
        let y = 0.1 * canvas_height + 0.8 * (Math.random() * canvas_height);
        particles.push(new Particle(x, y, color));
    }
}

function initParams() {
    particles = [];

    updateParams('cutoff');
    updateParams('damping');

    makeParticles(num_red, "red");
    makeParticles(num_blue, "blue");
    makeParticles(num_green, "orange");
    makeParticles(num_white, "white");

    for (let color1 of colors) {
        for (let color2 of colors) {
            interaction_elements[color1][color2].value = interactions[color1][color2];
            interaction_displays[color1][color2].innerHTML = `${color1} with ${color2}: ${interactions[color1][color2]}`;
        }
    }

    for (let color of colors) {
        status_elements[color].checked = statuses[color];
    }
}

function presets(name) {
    if (name == "cell") {
        interactions = {
            "red": {
                "red": -0.1,
                "blue": -0.01,
                "orange": 0,
                "white": 0,
            },
            "blue": {
                "red": 0.01,
                "blue": 0,
                "orange": 0,
                "white": 0,
            },
            "orange": {
                "red": 0,
                "blue": 0,
                "orange": 0,
                "white": 0,
            },
            "white": {
                "red": 0,
                "blue": 0,
                "orange": 0,
                "white": 0,
            }
        }
        statuses = {
            "red": true,
            "blue": true,
            "orange": false,
            "white": false,
        }
        num_red = 200;
        num_blue = 400;

        damping_input.value = 0.2;
        cutoff_input.value = canvas_width / 10;

        initParams();
    }
    else if (name == "propulsion") {
        interactions = {
            "red": {
                "red": -0.1,
                "blue": -0.34,
                "orange": 0,
                "white": 0,
            },
            "blue": {
                "red": -0.17,
                "blue": -0.32,
                "orange": 0.34,
                "white": 0,
            },
            "orange": {
                "red": 0,
                "blue": -0.2,
                "orange": 0.15,
                "white": 0,
            },
            "white": {
                "red": 0,
                "blue": 0,
                "orange": 0,
                "white": 0,
            }
        }
        statuses = {
            "red": true,
            "blue": true,
            "orange": true,
            "white": false,
        }

        num_red = 200;
        num_blue = 200;
        num_orange = 200;

        damping_inputt.value = 0.2;
        cutoff_input.value = canvas_width / 2;

        initParams();
    }
}