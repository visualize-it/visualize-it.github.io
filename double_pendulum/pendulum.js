

class Pendulum {
    constructor(t1, t2, color) {
        this.t1 = t1;
        this.t2 = t2;
        this.p1 = 0;
        this.p2 = 0;
        this.color = color;

        this.trails = [];
        this.cycle = 0;
    }
    update() {
        let t1dot = t1_dot(this.t1, this.t2, this.p1, this.p2);
        let t2dot = t2_dot(this.t1, this.t2, this.p1, this.p2);
        let p1dot = p1_dot(this.t1, this.t2, t1dot, t2dot);
        let p2dot = p2_dot(this.t1, this.t2, t1dot, t2dot);

        this.t1 += dt * t1dot;
        this.t2 += dt * t2dot;
        this.p1 += dt * p1dot;
        this.p2 += dt * p2dot;

        this.trails.push({
            x: canvas_width / 2 + length * Math.sin(this.t1) + length * Math.sin(this.t2),
            y: canvas_height / 2 + length * Math.cos(this.t1) + length * Math.cos(this.t2),
            cycle: this.cycle
        });
        if (this.trails.length > trail_length) {
            this.trails.shift();
        }
        this.cycle++;
        if (this.cycle > 359) {
            this.cycle = 0;
        }
    }
    render() {
        context.strokeStyle = this.color;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(canvas_width / 2, canvas_height / 2);
        context.lineTo(canvas_width / 2 + length * Math.sin(this.t1), canvas_height / 2 + length * Math.cos(this.t1));
        context.lineTo(canvas_width / 2 + length * Math.sin(this.t1) + length * Math.sin(this.t2), canvas_height / 2 + length * Math.cos(this.t1) + length * Math.cos(this.t2));
        context.stroke();

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(canvas_width / 2 + length * Math.sin(this.t1), canvas_height / 2 + length * Math.cos(this.t1), radius, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.arc(canvas_width / 2 + length * Math.sin(this.t1) + length * Math.sin(this.t2), canvas_height / 2 + length * Math.cos(this.t1) + length * Math.cos(this.t2), radius, 0, 2 * Math.PI);
        context.fill();

        context.lineWidth = 1;
        for (let i = 1; i < this.trails.length; i++) {
            context.strokeStyle = `hsl(${this.trails[i].cycle}, 100%, 50%)`;
            context.beginPath();
            context.moveTo(this.trails[i - 1].x, this.trails[i - 1].y);
            context.lineTo(this.trails[i].x, this.trails[i].y);
            context.stroke();
        }
    }
}

function t1_dot(t1, t2, p1, p2) {
    return prefactor_t * (2 * p1 - 3 * Math.cos(t1 - t2) * p2) / (16 - 9 * Math.pow(Math.cos(t1 - t2), 2));
}

function t2_dot(t1, t2, p1, p2) {
    return prefactor_t * (8 * p2 - 3 * Math.cos(t1 - t2) * p1) / (16 - 9 * Math.pow(Math.cos(t1 - t2), 2));
}

function p1_dot(t1, t2, t1dot, t2dot) {
    return -prefactor_p * (t1dot * t2dot * Math.sin(t1 - t2) + 3 * constant * Math.sin(t1));
}

function p2_dot(t1, t2, t1dot, t2dot) {
    return -prefactor_p * (-t1dot * t2dot * Math.sin(t1 - t2) + constant * Math.sin(t2));
}