class Boid {
    constructor(position, right_probability, max_speed) {
        this.position = position;
        this.right_probability = right_probability;
        this.max_speed = max_speed;
        this.walking_speed = max_speed;
        this.setPrefDirection();
        this.distance = 0;
    }

    setMaxSpeed(speed) {
        this.max_speed = speed;
        this.walking_speed = speed;
    }

    setPrefDirection() {
        if (this.right_probability < rightward_bias) {
            this.pref_velocity = new Vector(1, 0);
        }
        else {
            this.pref_velocity = new Vector(-1, 0);
        }

        this.velocity = this.pref_velocity;
    }

    setVelocity(req_velocity, num_repel) {
        if (num_repel == 0) {
            this.velocity = this.pref_velocity;
            this.walking_speed = (1.05 * this.walking_speed) % this.max_speed;
        }

        let current_heading = this.velocity.getHeading();
        let req_heading = req_velocity.getHeading();

        if (this.right_probability > rightward_bias) {
            current_heading = (current_heading + 2 * Math.PI) % (2 * Math.PI);
            req_heading = (req_heading + 2 * Math.PI) % (2 * Math.PI);
        }

        if (Math.abs(req_heading - current_heading) < boid_turn_speed) {
            current_heading = req_heading;
        }
        else if (req_heading > current_heading) {
            current_heading += boid_turn_speed;
        }
        else {
            current_heading -= boid_turn_speed;
        }
    
        this.velocity = Vector.fromHeading(current_heading);
        this.walking_speed -= 0.01 * this.walking_speed;
        
        if (this.walking_speed < this.max_speed / 2) {
            this.walking_speed = this.max_speed / 2;
        }
    }

    update() {
        this.velocity.normalize();
        this.velocity.scale(this.walking_speed);
        this.position = Vector.add(this.position, this.velocity);

        if (this.position.x < 0) {
            this.position.x = canvas_width;
        }
        else if (this.position.x > canvas_width) {
            this.position.x = 0;
        }

        if (this.position.y < border_padding) {
            this.position.y = border_padding;
        }
        else if (this.position.y > canvas_height - border_padding) {
            this.position.y = canvas_height - border_padding;
        }

        if (obstacle_state) {
            if ((this.position.y < (canvas_height - obstacle_gap) / 2) || (this.position.y > (canvas_height + obstacle_gap) / 2)) {
                if (this.position.x > (canvas_width - obstacle_padding) / 2 && this.position.x < canvas_width / 2) {
                    console.log("Shift");
                    this.position.x = (canvas_width - obstacle_padding) / 2;
                }
                else if (this.position.x < (canvas_width + obstacle_padding) / 2 && this.position.x > canvas_width / 2) {
                    console.log("Shift");
                    this.position.x = (canvas_width + obstacle_padding) / 2;
                }
            }
        }

        this.distance = -Math.cos(this.velocity.getHeading());
    }

    render() {
        if (this.pref_velocity.x > 0) {
            // boids moving right are blue
            context.fillStyle = "#0000ff";
        }
        else {
            context.fillStyle = "#ff0000";
        }

        let heading = this.velocity.getHeading();
        context.beginPath();
        context.moveTo(this.position.x + spoke_length * Math.cos(heading), this.position.y + spoke_length * Math.sin(heading));
        context.lineTo(this.position.x + spoke_length * Math.cos(heading + spoke_angle), this.position.y + spoke_length * Math.sin(heading + spoke_angle));
        context.lineTo(this.position.x + spoke_length * Math.cos(heading - spoke_angle), this.position.y + spoke_length * Math.sin(heading - spoke_angle));
        context.lineTo(this.position.x + spoke_length * Math.cos(heading), this.position.y + spoke_length * Math.sin(heading));
        context.fill();
    }

    canSee(other_boid) {
        if (this.right_probability < rightward_bias) {
            return other_boid.position.x > this.position.x;
        }
        else {
            return other_boid.position.x < this.position.x;
        }
    }
}