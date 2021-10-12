class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.vx = 2;
        this.vy = 0;

        this.trail = [];
    }
    update() {
        this.vy += gravity * dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        let distance = getDistance(this.x, this.y, 0, 0);
        if (distance + ball_radius > circle_radius) {
            let slope_x = 1;
            let slope_y = -1 / (this.y / this.x);
            let theta = Math.atan(slope_y);

            if (this.y == 0) {
                this.vx = -this.vx;
            }
            else {
                let slope_magn = getMagn(slope_x, slope_y);
                slope_x /= slope_magn;
                slope_y /= slope_magn;

                let v_magn_square = this.vx * this.vx + this.vy * this.vy;
                let v_par = slope_x * this.vx + slope_y * this.vy;
                let v_perp = Math.sqrt(v_magn_square - v_par * v_par);

                this.vx = v_par * Math.cos(theta);
                this.vy = v_perp * Math.cos(theta);
            }
            calculateEnergy(this);

            console.log("Rebound velocities:", this.vx, this.vy);
        }
    }
    uploadTrail() {
        this.trail.push({
            x: canvas_width / 2 + this.x,
            y: canvas_height / 2 - this.y
        });

        if (this.trail.length > 500) {
            this.trail.shift();
        }
    }
    render() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(canvas_width / 2 + this.x, canvas_height / 2 - this.y, ball_radius, 0, 2 * Math.PI, false);
        context.fill();

        context.strokeStyle = this.color;
        context.beginPath();
        for (let point of this.trail) {
            context.lineTo(point.x, point.y);
        }
        context.stroke();
    }
}