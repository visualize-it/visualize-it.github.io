function phaseToHue(phase) {
    return (phase * 359 / (2 * Math.PI)).toFixed(0);
}

function radians(degrees) {
    return degrees * Math.PI / 180;
}