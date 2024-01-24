class Boid {
    constructor(position, right_probability) {
        this.position = position;

        if (right_probability < rightward_bias) {
            this.pref_velocity = new Vector(1, 0);
        }
        else {
            this.pref_velocity = new Vector(-1, 0);
        }
    }

    update() {
        this.velocity = this.pref_velocity;
        this.position = Vector.add(this.position, this.velocity);

        if (this.position.x < 0) {
            this.position.x = canvas_width;
        }
        else if (this.position.x > canvas_width) {
            this.position.x = 0;
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
}