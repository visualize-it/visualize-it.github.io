function swarm() {
    num_boids = 100;

    repulsion_input.value = 1;
    orientation_input.value = 1;
    attraction_input.value = 15;

    moving_speed_input.value = 3;
    turning_speed_input.value = 8;
    noise_input.value = 10;

    blind_input.value = 90;
    reflect = false;

    if (reflect == false) {
        reflect_button.innerHTML = "Reflect: Off";
    }
    else {
        reflect_button.innerHTML = "Reflect: On";
    }

    initParams();
    window.scrollTo(0, 300);
}

function swirl() {
    num_boids = 100;

    repulsion_input.value = 1;
    orientation_input.value = 3;
    attraction_input.value = 15;

    moving_speed_input.value = 7;
    turning_speed_input.value = 8;
    noise_input.value = 10;

    blind_input.value = 90;
    reflect = false;

    if (reflect == false) {
        reflect_button.innerHTML = "Reflect: Off";
    }
    else {
        reflect_button.innerHTML = "Reflect: On";
    }

    initParams();
    window.scrollTo(0, 300);
}

function dynamicParallel() {
    num_boids = 100;

    repulsion_input.value = 1;
    orientation_input.value = 6;
    attraction_input.value = 7;

    moving_speed_input.value = 3;
    turning_speed_input.value = 4;
    noise_input.value = 10;

    blind_input.value = 90;
    reflect = false;

    if (reflect == false) {
        reflect_button.innerHTML = "Reflect: Off";
    }
    else {
        reflect_button.innerHTML = "Reflect: On";
    }

    initParams();
    window.scrollTo(0, 300);
}

function highlyParallel() {
    num_boids = 100;

    repulsion_input.value = 1;
    orientation_input.value = 12;
    attraction_input.value = 15;

    moving_speed_input.value = 3;
    turning_speed_input.value = 4;
    noise_input.value = 2;

    blind_input.value = 90;
    reflect = false;

    if (reflect == false) {
        reflect_button.innerHTML = "Reflect: Off";
    }
    else {
        reflect_button.innerHTML = "Reflect: On";
    }

    initParams();
    window.scrollTo(0, 300);
}