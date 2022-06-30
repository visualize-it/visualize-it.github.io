function radians(degree) {
    return degree * (Math.PI / 180);
}

function degree(radian) {
    return radian * (180 / Math.PI);
}

function distanceBetween(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

function phaseToHue(phase) {
    return (phase * 359 / (2 * Math.PI)).toFixed(0);
}

function removeFinishedEmits() {
    emits = emits.filter(emit => !emit.finished);
}

function getFirefliesWithin(firefly, radius) {
    let fireflies_within = [];
    for (let other_firefly of fireflies) {
        if (firefly != other_firefly) {
            if (distanceBetween(firefly.position, other_firefly.position) < radius) {
                fireflies_within.push(other_firefly);
            }
        }
    }
    return fireflies_within;
}

function addFireflies(number) {
    for (let i = 0; i < number; i++) {
        let x = Math.random() * canvas_width;
        let y = Math.random() * canvas_height;
        let direction = Math.random() * 2 * Math.PI;
        let vx = Math.cos(direction);
        let vy = Math.sin(direction);
        let phase = Math.random() * 2 * Math.PI;

        let new_firefly = new Firefly(new Vector(x, y), new Vector(vx, vy), phase);
        fireflies.push(new_firefly);
    }
    num_fireflies += number;
    updateParams("num");
}

function removeFireflies(number) {
    for (let i = 0; i < number; i++) {
        if (fireflies.length <= 0) {
            break;
        }
        fireflies.pop();
        num_fireflies -= 1;
    }
    updateParams("num");
}

function clearFireflies() {
    emits = [];
    fireflies = [];
    num_fireflies = 0;
    updateParams("num");
}