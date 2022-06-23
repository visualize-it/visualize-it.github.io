class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    negate() {
        this.x *= -1;
        this.y *= -1;
    }

    normalize() {
        let magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    getHeading() {
        return Math.atan2(this.y, this.x);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    scale(scale) {
        this.x *= scale;
        this.y *= scale;
    }

    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static normalize(vector) {
        let magnitude = vector.magnitude();
        return new Vector(vector.x / magnitude, vector.y / magnitude);
    }

    static dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    static cross(vector1, vector2) {
        return vector1.x * vector2.y - vector1.y * vector2.x;
    }

    static angleBetween(vector1, vector2) {
        return Math.acos(Vector.dot(vector1, vector2) / (vector1.magnitude() * vector2.magnitude()));
    }

    static fromHeading(heading) {
        return new Vector(Math.cos(heading), Math.sin(heading));
    }

    static distanceBetween(vector1, vector2) {
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    }

    static subtract(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
}