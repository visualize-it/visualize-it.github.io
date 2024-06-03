class Node {
    constructor(index) {
        this.index = index;
        this.angle = 2 * Math.PI * this.index / n;
        this.x = canvas_width / 2 + network_radius * Math.cos(this.angle);
        this.y = canvas_height / 2 - network_radius * Math.sin(this.angle);
        // the node on the right is 0. node index increases anti-clockwise
    }
    render() {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(this.x, this.y, node_radius, 0, 2 * Math.PI);
        context.fill();
    }
}