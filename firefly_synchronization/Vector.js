class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getHeading() {
        return Math.atan2(this.y, this.x);
    }

    normalize() {
        let magnitude = this.getMagnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    static fromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    static scale(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    static subtract(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
}