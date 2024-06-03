class Edge {
    constructor(source, target) {
        this.source = source;
        this.original_target = target;
        this.target = target;
        this.rewire_propensity = Math.random();
        this.color = "hsl(" + this.rewire_propensity * 255 + ", 100%, 50%)";
    }
    render() {
        context.lineWidth = 2;
        if (this.original_target == this.target) {
            context.strokeStyle = this.color;
        }
        else {
            context.strokeStyle = "#ffffff";
        }

        if (Math.abs(this.source.index - this.target.index) == 1 || Math.abs(this.source.index - this.target.index) == n - 1) {
            context.beginPath();
            context.moveTo(this.source.x, this.source.y);
            context.lineTo(this.target.x, this.target.y);
            context.stroke();
        }
        else {
            
            context.beginPath();
            context.moveTo(this.source.x, this.source.y);
            context.quadraticCurveTo(canvas_width / 2, canvas_height / 2, this.target.x, this.target.y)
            context.stroke();
        }
    }
}