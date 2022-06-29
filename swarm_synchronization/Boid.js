class Boid {
    constructor(position, phase) {
        this.position = position;
        this.phase = phase;

        this.translation_velocity = new Vector(0, 0);
        this.phase_nudge = 0;
    }

    update() {
        this.position.add(this.translation_velocity);
        this.phase += phase_velocity + this.phase_nudge;
    }

    setTranslationVelocity(translation_velocity) {
        this.translation_velocity = translation_velocity;
    }

    setPhaseNudge(phase_nudge) {
        this.phase_nudge = phase_nudge;
    }
    
    render() {
        context.fillStyle = `hsl(${phaseToHue(this.phase)}, 100%, 50%)`;
        context.beginPath();
        context.arc(this.position.x, this.position.y, boid_radius, 0, 2 * Math.PI);
        context.fill();
    }
}