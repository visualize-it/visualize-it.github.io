class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let magnitude = this.getMagnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    static scale(vector, scale) {
        return new Vector(vector.x * scale, vector.y * scale);
    }

    static unitVectorFrom(vector) {
        let magnitude = vector.getMagnitude();
        return new Vector(vector.x / magnitude, vector.y / magnitude);
    }

    static repulsionVectorFrom(vector) {
        let magnitude_square = vector.x * vector.x + vector.y * vector.y;
        return new Vector(vector.x / magnitude_square, vector.y / magnitude_square);
    }

    static subtract(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static distanceBetween(vector1, vector2) {
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    }
}