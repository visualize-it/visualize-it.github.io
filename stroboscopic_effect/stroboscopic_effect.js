let wheel_angle, camera_angle;
let wheel_rpm, angular_speed;
let wheel_radius;
let frames_skip, cooldown, sampling_rate, frame_no;
let is_paused, direction;

function update() {
    wheel_angle += direction * angular_speed;
    if (wheel_angle > 360) {
        wheel_angle -= 360;
    }
    else if (wheel_angle < 0) {
        wheel_angle += 360;
    }

    if (frame_no == 0) {
        camera_angle = wheel_angle;
        frame_no = frames_skip;
    }
    else {
        frame_no -= 1;
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(canvas_width / 2, 0);
    context.lineTo(canvas_width / 2, canvas_height);
    context.stroke();

    context.strokeStyle = "#ff51ff";
    context.beginPath();
    context.moveTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle)) + y_offset);
    if (wheel_angle >= 180) {
        context.lineTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle - 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle - 180)) + y_offset);
    }
    else {
        context.lineTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle + 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle + 180)) + y_offset);
    }
    context.stroke();

    context.beginPath();
    context.arc(canvas_width / 4, canvas_height / 2 + y_offset, wheel_radius, 0, 2 * Math.PI);
    context.stroke();

    context.strokeStyle = "#ffff00";
    context.beginPath();
    context.moveTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle)) + y_offset);
    if (wheel_angle >= 180) {
        context.lineTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle - 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle - 180)) + y_offset);
    }
    else {
        context.lineTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle + 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle + 180)) + y_offset);
    }
    context.stroke();

    context.beginPath();
    context.arc(3 * canvas_width / 4, canvas_height / 2 + y_offset, wheel_radius, 0, 2 * Math.PI);
    context.stroke();

    if (mobile) {
        context.font = "15px Arial";
    }
    else {
        context.font = "30px Arial";
    }
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.fillText("Actual Wheel", canvas_width / 4, 30);
    context.fillText("Camera View", 3 * canvas_width / 4, 30);
}

function initParams() {
    wheel_angle = Math.random() * 360;
    wheel_rpm = 60;
    rpm_slider.value = wheel_rpm;
    calcSpeed();
    rpm_display.innerHTML = `Wheel speed: ${wheel_rpm} RPM or ${(angular_speed * fps / 360).toFixed(2)} revolution(s) per second`;

    frames_skip = 26;
    calcCooldown();
    fps_slider.value = 60 - frames_skip;
    fps_display.innerHTML = `Sampling rate: ${sampling_rate.toFixed(2)} Hz; Sampling Time: ${cooldown.toFixed(2)} seconds`;

    wheel_radius = (canvas_width / 4) - 20;
    frame_no = 0;
    paused = false;
    direction = -1;
}

function updateParams(variable) {
    if (variable == 'rpm') {
        wheel_rpm = rpm_slider.value;
        calcSpeed();
        rpm_display.innerHTML = `Wheel speed: ${wheel_rpm} RPM or ${(angular_speed * fps / 360).toFixed(2)} revolution(s) per second`;
    }
    else if (variable == 'fps') {
        frames_skip = 60 - fps_slider.value;
        calcCooldown();
        fps_display.innerHTML = `Sampling rate: ${sampling_rate.toFixed(2)} Hz; Sampling Time: ${cooldown.toFixed(2)} seconds`;
    }
    else if (variable == 'pause') {
        if (is_paused) {
            is_paused = false;
            pause_button.innerHTML = "Pause";
        }
        else {
            is_paused = true;
            pause_button.innerHTML = "Resume";
        }
    }
    else if (variable == 'dir') {
        direction *= (-1);
    }
}

function simulate(number) {
    if (number == 1) {
        rpm_slider.value = 80;
        fps_slider.value = 59;
    }
    else if (number == 2) {
        rpm_slider.value = 120;
        fps_slider.value = 48;
    }
    else if (number == 3) {
        rpm_slider.value = 120;
        fps_slider.value = 46;
    }
    else if (number == 4) {
        rpm_slider.value = 100;
        fps_slider.value = 55;
    }
    else if (number == 5) {
        rpm_slider.value = 100;
        fps_slider.value = 41;
    }
    updateParams("rpm");
    updateParams("fps");
    window.scrollTo(0, 40);
}

function step() {
    if (!is_paused) {
        update();
    }
    render();
    animate(step);
}

function calcSpeed() {
    angular_speed = (wheel_rpm * 360) / (fps * 60);
}

function calcCooldown() {
    cooldown = (frames_skip + 1) / fps;
    sampling_rate = 1 / cooldown;
}

function toRadian(degree) {
    return (Math.PI * degree / 180);
}