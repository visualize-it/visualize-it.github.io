function toRadian(degrees) {
    return degrees * 0.0175;
}

function toDegrees(radians) {
    return radians * 57.296
}

function distanceBetween(b1, b2) {
    return Math.sqrt(Math.pow(b2.x - b1.x, 2) + Math.pow(b2.y - b1.y, 2));
}

function distanceFromClick(boid, x, y) {
    return Math.sqrt(Math.pow(boid.x - x, 2) + Math.pow(boid.y - y, 2));
}

function normalisedX(b1, b2) {
    return (b2.x - b1.x) / distanceBetween(b1, b2);
}

function normalisedY(b1, b2) {
    return (b2.y - b1.y) / distanceBetween(b1, b2);
}

function getAngle(direction) {
    if (direction.x > 0 && direction.y > 0) {
        return toDegrees(Math.atan(direction.y / direction.x));
    }
    else if (direction.x < 0 && direction.y > 0) {
        return 180 - toDegrees(Math.atan(direction.y / -direction.x));
    }
    else if (direction.y < 0 && direction.x > 0) {
        return -toDegrees(Math.atan(-direction.y / direction.x));
    }
    else {
        return -(180 - toDegrees(Math.atan(direction.y / direction.x)));
    }
}

function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}