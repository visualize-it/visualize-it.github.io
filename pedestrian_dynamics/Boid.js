class Boid {
    constructor(position, right_probability) {
        this.position = position;
        this.right_probability = right_probability;

        if (this.right_probability < rightward_bias) {
            this.pref_velocity = new Vector(1, 0);
        }
        else {
            this.pref_velocity = new Vector(-1, 0);
        }

        this.velocity = this.pref_velocity;
        this.walking_speed = boid_move_speed;
    }

    setVelocity(req_velocity, num_repel) {
        if (num_repel == 0) {
            this.velocity = this.pref_velocity;
            this.walking_speed = (1.05 * this.walking_speed) % boid_move_speed;
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
        
        if (this.walking_speed < boid_move_speed / 2) {
            this.walking_speed = boid_move_speed / 2;
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

        if (this.position.y < 1) {
            this.position.y = 1;
        }
        else if (this.position.y > canvas_height - 1) {
            this.position.y = canvas_height - 2;
        }
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