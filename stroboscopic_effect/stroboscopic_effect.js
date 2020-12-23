let wheel_angle, camera_angle;
let wheel_rpm, angular_speed;
let wheel_radius;
let frames_skip, cooldown, sampling_rate, frame_no;
let skip;

function update() {
    wheel_angle -= angular_speed;
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

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle)));
    if (wheel_angle >= 180) {
        context.lineTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle - 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle - 180)));
    }
    else {
        context.lineTo(canvas_width / 4 + wheel_radius * Math.cos(toRadian(wheel_angle + 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(wheel_angle + 180)));
    }
    context.stroke();

    context.strokeStyle = "#ffffff";
    context.beginPath();
    context.moveTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle)));
    if (wheel_angle >= 180) {
        context.lineTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle - 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle - 180)));
    }
    else {
        context.lineTo(3 * canvas_width / 4 + wheel_radius * Math.cos(toRadian(camera_angle + 180)), canvas_height / 2 - wheel_radius * Math.sin(toRadian(camera_angle + 180)));
    }
    context.stroke();
}

function initParams() {
    wheel_angle = Math.random() * 360;
    wheel_rpm = 60;
    rpm_slider.value = wheel_rpm;
    calcSpeed();
    rpm_display.innerHTML = `Wheel speed: ${wheel_rpm} RPM or ${(angular_speed * fps).toFixed()}<sup>o</sup> per second`;

    frames_skip = 30;
    calcCooldown();
    fps_slider.value = 60 - frames_skip;
    fps_display.innerHTML = `Sampling rate: ${sampling_rate.toFixed(2)} Hz; Sampling Time: ${cooldown.toFixed(2)} seconds`;

    wheel_radius = (canvas_width / 4) - 20;
    frame_no = 0;
    skip = false;
}

function updateParams(variable) {
    if (variable == 'rpm') {
        wheel_rpm = rpm_slider.value;
        calcSpeed();
        rpm_display.innerHTML = `Wheel speed: ${wheel_rpm} RPM or ${(angular_speed * fps).toFixed()}<sup>o</sup> per second`;
    }
    else if (variable == 'fps') {
        frames_skip = 60 - fps_slider.value;
        calcCooldown();
        fps_display.innerHTML = `Sampling rate: ${sampling_rate.toFixed(2)} Hz; Sampling Time: ${cooldown.toFixed(2)} seconds`;
    }
}

function step() {
    update();
    render();
    animate(step);
}

function calcSpeed() {
    angular_speed = (wheel_rpm * 360) / (fps * 60);
}

function calcCooldown() {
    cooldown = frames_skip / fps;
    sampling_rate = 1 / cooldown;
}

function toRadian(degree) {
    return (Math.PI * degree / 180);
}