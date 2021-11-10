class Nucleus {
    constructor(x, y, atomic_number, charge, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.assignVelocity();

        this.ax = 0;
        this.ay = 0;

        this.mass = mass_factor * atomic_number;
        this.charge = charge_factor * charge;
        this.radius = radius_factor * Math.cbrt(3 * this.mass / (4 * Math.PI));
        this.assignColor();

        this.undefined_safeguard = true;
    }
    update() {
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;

        this.agitate();

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        if(this.x - this.radius < 0) {
            this.vx = Math.abs(this.vx);
            this.x = this.radius;
        }
        else if(this.x + this.radius > canvas_width) {
            this.vx = -Math.abs(this.vx);
            this.x = canvas_width - this.radius;
        }
        if(this.y - this.radius < 0) {
            this.vy = Math.abs(this.vy);
            this.y = this.radius;
        }
        else if(this.y + this.radius > canvas_height) {
            this.vy = -Math.abs(this.vy);
            this.y = canvas_height - this.radius;
        }

        this.ax = 0;
        this.ay = 0;
    }
    applyForce(force_x, force_y) {
        if(this.undefined_safeguard) {
            if(force_x !== undefined) {
                this.ax += force_x / this.mass;
            }
            if(force_y !== undefined) {
                this.ay += force_y / this.mass;
            }
        }
        else {
            this.ax += force_x / this.mass;
            this.ay += force_y / this.mass;
        }
    }
    agitate() {
        let heat = grid[Math.floor(this.y / cell_length)][Math.floor(this.x / cell_length)]; 
        let multiplier = 1 + (heat_efficiency * heat) / this.mass;
        this.vx *= multiplier;
        this.vy *= multiplier;
    }
    compress() {
        let compress_x = (canvas_width / 2) - this.x;
        let compress_y = (canvas_height / 2) - this.y;
        this.applyForce(ic_force * compress_x, ic_force * compress_y);
    }
    render() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
    }
    assignVelocity() {
        let direction = Math.random() * 2 * Math.PI;
        this.vx = this.velocity * Math.cos(direction);
        this.vy = this.velocity * Math.sin(direction);
    }
    assignColor() {
        if(this.mass == 1) {
            this.color = "#0000ff";
        }
        else if(this.mass == 2) {
            this.color = "#00ff00";
        }
        else {
            this.color = "#aaaaaa";
        }
    }
}