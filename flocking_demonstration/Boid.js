class Boid {
    constructor(x, y, theta) {
        this.position = new Vector(x, y);
        this.theta = theta;
        this.velocity = new Vector(Math.cos(theta), Math.sin(theta));
    }
    setVelocity(velocity) {
        let required_theta = velocity.getTheta();
        if (Math.abs(required_theta - this.theta) < turning_speed) {
            this.theta = required_theta;
        }
        else {
            if (required_theta > this.theta) {
                if (Math.abs(required_theta - this.theta) < Math.PI) {
                    // direct approach
                    this.theta += turning_speed;
                }
                else {
                    // reflex approach
                    this.theta -= turning_speed;
                }
            }
            else {
                if (Math.abs(required_theta - this.theta) < Math.PI) {
                    // direct approach
                    this.theta -= turning_speed;
                }
                else {
                    // reflex approach
                    this.theta += turning_speed;
                }
            }
        }
        this.velocity = Vector.getVelocityVector(this.theta);
    }
    update() {
        this.position.add(Vector.scale(this.velocity, move_speed));

        if (this.position.x < 0) {
            this.position.x = canvas_width;
        }
        if (this.position.x > canvas_width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = canvas_height;
        }
        if (this.position.y > canvas_height) {
            this.position.y = 0;
        }
    }
    render() {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.moveTo(this.position.x + spoke_length * Math.cos(this.theta), this.position.y + spoke_length * Math.sin(this.theta));
        context.lineTo(this.position.x + spoke_length * Math.cos(this.theta + spoke_angle), this.position.y + spoke_length * Math.sin(this.theta + spoke_angle));
        context.lineTo(this.position.x + spoke_length * Math.cos(this.theta - spoke_angle), this.position.y + spoke_length * Math.sin(this.theta - spoke_angle));
        context.closePath();
        context.fill();
    }
}