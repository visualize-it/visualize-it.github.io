class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
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