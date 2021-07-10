function toRadian(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function displacement(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
    if (direction.x >= 0 && direction.y >= 0) {
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

function minimiseDifference(orient_angle, boid_angle) {
    let new_angle = orient_angle - 1080;

    while (Math.abs(new_angle - boid_angle) > 180) {
        new_angle += 360;

        if (new_angle > 5000) {
            return orient_angle;
        }
    }
    return new_angle;
}

function gaussianNoise(min, max, skew = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5;
    // num is now a Gaussian between 0 and 1
    if (num > 1 || num < 0) {
        // resample
        num = gaussianNoise(min, max, skew);
    }
    else {
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
    }
    return num;
}