let ship_position, ship_speed, orbit_radius;
let normal_time, normal_time_speed, dilated_time, dilated_time_speed, clock_length;
let length, length_decreased, thickness;
let angular_freq, angular_freq_decreased, amplitude, iteration;
let normal_wave = [], shifted_wave = [], wave_start_x, wave_stop_x;
let gamma, typed_value;

function update() {
    ship_position += ship_speed;
    if (ship_position >= 360) {
        ship_position -= 360;
    }

    normal_time -= normal_time_speed;
    if (normal_time >= 360) {
        normal_time -= 360;
    }

    dilated_time -= dilated_time_speed;
    while (dilated_time >= 360) {
        dilated_time -= 360;
    }

    iteration++;
}

function render() {
    basicDisplay();
    planetDisplay();
    timeDisplay();
    lengthDisplay();
    dopplerDisplay();
    captionsDisplay();
}

function updateParams(value) {
    if (value == "speed-slide") {
        ship_speed = getAngularSpeed(speed_slider.value);
        gamma = getGamma(speed_slider.value / 1000);
        speed_display.innerHTML = `Satellite speed: ${(speed_slider.value / 10).toFixed(1)}% of speed of light or ${(speed_slider.value * 299792458 / 1000).toFixed()} m/s.<br/><b>&gamma; = ${gamma.toFixed(4)}</b>`;
        speed_input.value = `${(speed_slider.value / 10).toFixed(1)}`;

        dilated_time_speed = normal_time_speed / gamma;
        length_decreased = length / gamma;
        angular_freq_decreased = angular_freq * getDoppler(speed_slider.value / 1000);

        shifted_wave.shift();
        shifted_wave.shift();
        shifted_wave.shift();
        shifted_wave.shift();
    }
    else if (value == "speed-typed") {
        typed_value = Number.parseFloat(speed_input.value);
        if (Number.isNaN(typed_value) || typed_value === undefined || typed_value < 0.0) {
            typed_value = 0;
        }
        else if (typed_value > 100) {
            updateParams("speed-typed");
            alert("You can't travel faster than the speed of light!");
        }
        console.log(typed_value);
        speed_slider.value = typed_value * 10;

        ship_speed = getAngularSpeed(typed_value * 10);
        gamma = getGamma(typed_value / 100);
        speed_display.innerHTML = `Satellite speed: ${(typed_value)}% of speed of light or ${(typed_value * 299792458 / 1000).toFixed()} m/s.<br/><b>&gamma; = ${gamma.toFixed(4)}</b>`;

        dilated_time_speed = normal_time_speed / gamma;
        length_decreased = length / gamma;
        angular_freq_decreased = angular_freq * getDoppler(typed_value / 100);

        shifted_wave.shift();
    }
}

function initParams() {
    iteration = 0;
    clock_length = canvas_height / 9;
    normal_time = 0;
    dilated_time = 0;
    normal_time_speed = 360 / fps;

    length = 3 * canvas_width / 8;
    thickness = canvas_height / 20;

    amplitude = canvas_height / 20;
    angular_freq = 5;
    wave_start_x = 9 * canvas_width / 16;
    wave_stop_x = 15 * canvas_width / 16;

    speed_slider.value = 700;
    updateParams("speed-slide");

    ship_position = 0;
    ship_speed = getAngularSpeed(speed_slider.value);
    orbit_radius = canvas_height / 5;
}

function step() {
    update();
    render();
    animate(step);
}

function basicDisplay() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(canvas_width / 2, 0);
    context.lineTo(canvas_width / 2, canvas_height);
    context.stroke();

    context.beginPath();
    context.moveTo(0, canvas_height / 2);
    context.lineTo(canvas_width, canvas_height / 2);
    context.stroke();
}

function planetDisplay() {
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.arc(canvas_width / 4, canvas_height / 4, canvas_height / 10, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "#0000ff";
    context.beginPath();
    context.arc(orbit_radius * Math.cos(radian(ship_position)) + canvas_width / 4, canvas_height / 4 - orbit_radius * Math.sin(radian(ship_position)), canvas_height / 50, 0, 2 * Math.PI);
    context.fill();
}

function timeDisplay() {
    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.arc(5 * canvas_width / 8, canvas_height / 4 - font_offset, canvas_height / 8, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(7 * canvas_width / 8, canvas_height / 4 - font_offset, canvas_height / 8, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.moveTo(5 * canvas_width / 8, canvas_height / 4 - font_offset);
    context.lineTo(5 * canvas_width / 8 + clock_length * Math.cos(radian(normal_time)), - font_offset + canvas_height / 4 - clock_length * Math.sin(radian(normal_time)));
    context.stroke();

    context.beginPath();
    context.moveTo(7 * canvas_width / 8, canvas_height / 4 - font_offset);
    context.lineTo(7 * canvas_width / 8 + clock_length * Math.cos(radian(dilated_time)), - font_offset + canvas_height / 4 - clock_length * Math.sin(radian(dilated_time)));
    context.stroke();
}

function lengthDisplay() {
    context.fillStyle = "#555555";
    context.fillRect(canvas_width / 16, 5 * canvas_height / 8, length, thickness);
    context.fillRect(canvas_width / 16, 7 * canvas_height / 8 - thickness, length_decreased, thickness);
}

function dopplerDisplay() {
    normal_wave.unshift(
        {
            x: wave_start_x,
            y: (5 * canvas_height / 8) - (amplitude * Math.sin(angular_freq * radian(iteration))),
        }
    );
    shifted_wave.unshift(
        {
            x: wave_start_x,
            y: (7 * canvas_height / 8) - (amplitude * Math.sin(angular_freq_decreased * radian(iteration))),
        }
    );

    while (normal_wave[normal_wave.length - 1].x > wave_stop_x) {
        normal_wave.pop();
    }
    while (shifted_wave[shifted_wave.length - 1].x > wave_stop_x) {
        shifted_wave.pop();
    }

    context.fillStyle = "#ffffff";
    for (let particle of normal_wave) {
        context.fillRect(particle.x, particle.y, 2, 2);
        particle.x++;
    }
    for (let particle of shifted_wave) {
        context.fillRect(particle.x, particle.y, 2, 2);
        particle.x++;
    }
}

function captionsDisplay() {
    if (mobile) {
        context.font = "12px Arial";
    }
    else {
        context.font = "20px Arial";
    }
    context.textAlign = "center";

    context.fillText("Geosynchronous Satellite", canvas_width / 4, font_offset);

    context.fillText("Time Dilation", 3 * canvas_width / 4, font_offset);
    context.fillText("Clock on Planet", 5 * canvas_width / 8, canvas_height / 2 - font_offset);
    context.fillText("Clock on Sat.", 7 * canvas_width / 8, canvas_height / 2 - font_offset);
    context.fillText(`1 sec on Sat. = ${(normal_time_speed / dilated_time_speed).toFixed(2)} secs on Planet`, 3 * canvas_width / 4, canvas_height / 2 - 2.5 * font_offset);

    context.fillText("Length Contraction", canvas_width / 4, canvas_height / 2 + font_offset);
    context.fillText(`Distance on Planet: ${length.toFixed()}`, canvas_width / 4, 6 * canvas_height / 8);
    context.fillText(`Distance perceived by Sat.: ${length_decreased.toFixed()}`, canvas_width / 4, canvas_height - font_offset);

    context.fillText("Relativistic Doppler Effect", 3 * canvas_width / 4, canvas_height / 2 + font_offset);
    context.fillText(`Waves transmitted by Sat.: ${angular_freq.toFixed(2)} Hz`, 3 * canvas_width / 4, 6 * canvas_height / 8);
    context.fillText(`Waves received by Planet: ${angular_freq_decreased.toFixed(2)} Hz`, 3 * canvas_width / 4, canvas_height - font_offset);
}

function radian(degree) {
    return (degree * Math.PI / 180);
}

function getAngularSpeed(value) {
    return (value * fps / 470);
}

function getGamma(value) {
    return 1 / Math.sqrt(1 - Math.pow(value, 2))
}

function getDoppler(value) {
    return Math.sqrt((1 - value) / (1 + value));
}

