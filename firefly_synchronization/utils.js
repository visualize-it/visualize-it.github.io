function radians(degree) {
    return degree * (Math.PI / 180);
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

function getRepellingFireflies(firefly) {
    let repelling_fireflies = [];
    for (let other_firefly of fireflies) {
        if (firefly !== other_firefly) {
            if (distanceBetween(firefly.position, other_firefly.position) < repulsion_radius) {
                repelling_fireflies.push(other_firefly);
            }
        }
    }
    return repelling_fireflies;
}