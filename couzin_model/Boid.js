class Boid {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.req_velocity = velocity;
    }

    setVelocity(velocity) {
        this.req_velocity = velocity;
    }

    updateVelocity() {
        let angle = Math.atan2(this.req_velocity.y, this.req_velocity.x) - Math.atan2(this.velocity.y, this.velocity.x);
        while (angle > Math.PI) {
            angle -= 2 * Math.PI;
        }
        while (angle < -Math.PI) {
            angle += 2 * Math.PI;
        }

        if (angle > turning_speed) {
            angle = turning_speed;
        }
        else if (angle < -turning_speed) {
            angle = -turning_speed;
        }

        let rotation_matrix = [
            [Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle), Math.cos(angle)]
        ];
        this.velocity.x = rotation_matrix[0][0] * this.velocity.x + rotation_matrix[0][1] * this.velocity.y;
        this.velocity.y = rotation_matrix[1][0] * this.velocity.x + rotation_matrix[1][1] * this.velocity.y;
        this.velocity.normalize();
    }

    update() {
        // update position
        this.position.x += moving_speed * this.velocity.x
        this.position.y += moving_speed * this.velocity.y;

        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        }
        else if (this.position.x > canvas_width) {
            this.position.x = canvas_width;
            this.velocity.x *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        }
        else if (this.position.y > canvas_height) {
            this.position.y = canvas_height;
            this.velocity.y *= -1;
        }

        this.direction = this.velocity.getHeading();
    }

    render() {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.moveTo(this.position.x + spoke_length * Math.cos(this.direction), this.position.y + spoke_length * Math.sin(this.direction));
        context.lineTo(this.position.x + spoke_length * Math.cos(this.direction + spoke_angle), this.position.y + spoke_length * Math.sin(this.direction + spoke_angle));
        context.lineTo(this.position.x + spoke_length * Math.cos(this.direction - spoke_angle), this.position.y + spoke_length * Math.sin(this.direction - spoke_angle));
        context.lineTo(this.position.x + spoke_length * Math.cos(this.direction), this.position.y + spoke_length * Math.sin(this.direction));
        context.fill();
    }
}