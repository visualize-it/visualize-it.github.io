class Firefly {
    constructor(position, velocity, phase) {
        this.position = position;
        this.velocity = velocity;
        this.phase = phase;
        this.phase_nudge = 0;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    nudgePhase(phase_nudge) {
        this.phase_nudge = phase_nudge;
        // console.log(this.phase_nudge);
    }
    
    update() {
        this.phase += (angular_velocity + this.phase_nudge);
        this.phase += (2 * phase_noise_amplitude * Math.random() - phase_noise_amplitude);
        this.phase_nudge = 0;
        
        if (this.phase >= 2 * Math.PI) {
            emits.push(new Emit(this));
            while(this.phase >= 2 * Math.PI) {
                this.phase -= 2 * Math.PI;
            }
        }

        let direction = this.velocity.getHeading();
        let perturbed_direction = direction + (2 * velocity_noise_amplitude * Math.random() - velocity_noise_amplitude);
        this.velocity = Vector.fromAngle(perturbed_direction);
        this.position.add(Vector.scale(this.velocity, move_speed));

        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
        }
        if (this.position.x > canvas_width) {
            this.position.x = canvas_width;
            this.velocity.x *= -1;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -1;
        }
        if (this.position.y > canvas_height) {
            this.position.y = canvas_height;
            this.velocity.y *= -1;
        }
    }

    render() {
        context.fillStyle = `hsl(${phaseToHue(this.phase)}, 100%, 50%)`;
        context.beginPath();
        context.arc(this.position.x, this.position.y, firefly_radius, 0, 2 * Math.PI);
        context.fill();
    }
}