class Fusion_event {
    constructor(x, y, radius, speed = 5, limit = canvas_height / 4) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.limit = limit;
    }
    update() {
        this.radius += this.speed;
    }
    render() {
        if (this.radius < this.limit) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            context.stroke();
        } 
    }
}