class Boid {
    constructor(type, i, j) {
        this.type = type;
        this.x = (j + 0.5) * cell_length;
        this.y = (i + 0.5) * cell_length;
    }
    render() {
        if (this.type == 1) {
            context.fillStyle = "#ff0000";
        }
        else if (this.type == 2) {
            context.fillStyle = "#0000ff";
        }

        context.beginPath();
        context.arc(this.x, this.y, boid_radius, 0, 2 * Math.PI);
        context.fill();
    }
}