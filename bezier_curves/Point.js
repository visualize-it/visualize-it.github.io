class Point {
    constructor(color) {
        this.x = canvas_width / 8 + 3 * Math.random() * canvas_width / 4;
        this.y = canvas_width / 8 + 3 * Math.random() * canvas_height / 4;
        this.selected = false;
        this.color = color;
    }
    render() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, point_radius, 0, 2 * Math.PI, false);
        context.fill();

        if(this.selected) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.arc(this.x, this.y, 2 * point_radius, 0, 2 * Math.PI, false);
            context.stroke();
        }
    }
}