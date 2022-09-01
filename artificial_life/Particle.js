class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.vx = 0;
        this.vy = 0;
    }

    applyForce(fx, fy) {
        this.vx = (this.vx + fx) * damping;
        this.vy = (this.vy + fy) * damping;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0;
            this.vx *= -1;
        }
        else if (this.x > canvas_width) {
            this.x = canvas_width;
            this.vx *= -1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy *= -1;
        }
        else if (this.y > canvas_height) {
            this.y = canvas_height;
            this.vy *= -1;
        }
    }

    render() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, particle_size, particle_size);
    }
}