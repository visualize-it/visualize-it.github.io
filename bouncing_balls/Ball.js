class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.vx = 10;
        this.vy = 0;
        this.path = [];
    }
    update() {
        this.vy -= g;

        this.x += this.vx;
        this.y += this.vy;

        if(this.distance() > circle_radius) {
            let tangent_slope = -this.x / this.y;
            let tangent_angle = toDegree(Math.atan(tangent_slope));
            
            let approach_angle = toDegree(Math.atan(-this.vy / this.vx));
            console.log(approach_angle);
        }
    }
    renderSelf() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(canvas_width / 2 + this.x, canvas_height / 2 - this.y, ball_radius, 0, 2 * Math.PI, false);
        context.fill();
    }
    distance() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}