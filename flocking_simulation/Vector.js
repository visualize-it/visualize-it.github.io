class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    getTheta() {
        return Math.atan2(this.y, this.x);
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
    }
    add(vector) {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }

    // static functions
    static normalise(vector) {
        return Vector.scale(vector, 1 / vector.getMagnitude());
    }
    static negate(vector) {
        return new Vector(-vector.x, -vector.y);
    }
    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    static subtract(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    static scale(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    } 
    static getVelocityVector(theta) {
        return new Vector(Math.cos(theta), Math.sin(theta));
    }
    static distanceBetween(vector1, vector2) {
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    }
}