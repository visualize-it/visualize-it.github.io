class Boid {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.direction = this.velocity.getHeading();
    }

    setVelocity(required_velocity) {
        let required_direction = required_velocity.getHeading();

        // console.log(toDegree(required_direction), toDegree(this.direction));

        if (Math.abs(required_direction - this.direction) < turning_speed) {
            this.direction = required_direction;
        }
        else {
            if (required_direction < this.direction) {
                if (Math.abs(required_direction - this.direction) < Math.PI) {
                    this.direction -= turning_speed;
                }
                else {
                    this.direction += turning_speed;
                }
            }
            else {
                if (Math.abs(required_direction - this.direction) < Math.PI) {
                    this.direction += turning_speed;
                }
                else {
                    this.direction -= turning_speed;
                }
            }
        }

        this.velocity = Vector.fromHeading(this.direction);
    }

    update() {
        // update position
        let perturbation_direction = this.direction + 2 * noise_angle * (Math.random() - 0.5);
        let perturbed_velocity = Vector.fromHeading(perturbation_direction);

        this.position.x += moving_speed * perturbed_velocity.x;
        this.position.y += moving_speed * perturbed_velocity.y;

        // check bounds
        if (reflect) {
            if (this.position.x < 0) {
                this.position.x = 0;
                this.velocity.x *= -1;
                this.direction = this.velocity.getHeading();
            }
            else if (this.position.x > canvas_width) {
                this.position.x = canvas_width;
                this.velocity.x *= -1;
                this.direction = this.velocity.getHeading();
            }
            if (this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y *= -1;
                this.direction = this.velocity.getHeading();
            }
            else if (this.position.y > canvas_height) {
                this.position.y = canvas_height;
                this.velocity.y *= -1;
                this.direction = this.velocity.getHeading();
            }
        }
        else {
            if (this.position.x < 0) {
                this.position.x = canvas_width;
            }
            else if (this.position.x > canvas_width) {
                this.position.x = 0;
            }
            if (this.position.y < 0) {
                this.position.y = canvas_height;
            }
            else if (this.position.y > canvas_height) {
                this.position.y = 0;
            }
        }

        this.constrain_direction();
    }

    constrain_direction() {
        while (this.direction < -Math.PI) {
            this.direction += 2 * Math.PI;
        }
        while (this.direction > Math.PI) {
            this.direction -= 2 * Math.PI;
        }
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