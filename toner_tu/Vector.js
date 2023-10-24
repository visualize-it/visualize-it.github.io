class Vector {
    constructor(angle) {
        this.angle = angle;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.angle = Math.atan2(this.y, this.x);
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.angle = Math.atan2(this.y, this.x);
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }
}