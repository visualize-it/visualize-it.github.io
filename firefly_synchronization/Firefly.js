class Firefly {
    constructor(position, velocity, phase) {
        this.position = position;
        this.velocity = velocity;
        this.phase = phase;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }
    
    update() {
        this.phase += angular_velocity;
        
        if (this.phase >= 2 * Math.PI) {
            emits.push(new Emit(this));
            this.phase -= 2 * Math.PI;
        }

        let direction = this.velocity.getHeading();
        let perturbed_direction = direction + (2 * noise_amplitude * Math.random() - noise_amplitude);
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