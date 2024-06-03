class Edge {
    constructor(source, target, rewire_propensity) {
        this.source = source;
        this.target = target;
        this.rewire_propensity = Math.random();
        this.color = "hsl(" + this.rewire_propensity * 360 + ", 100%, 50%)";
    }
    render() {
        if (Math.abs(this.source.index - this.target.index) == 1 || Math.abs(this.source.index - this.target.index) == n - 1) {
            context.strokeStyle = this.color;
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(this.source.x, this.source.y);
            context.lineTo(this.target.x, this.target.y);
            context.stroke();
        }
        else {
            context.strokeStyle = this.color;
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(this.source.x, this.source.y);
            context.quadraticCurveTo(canvas_width / 2, canvas_height / 2, this.target.x, this.target.y)
            context.stroke();
        }
    }
}