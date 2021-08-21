class Animal {
    constructor() {
        this.x = 0;
        this.path = [0];
        this.color = getRandomColor();
    }
    walk() {
        this.x += randomWalk();
        this.path.push(this.x);
    }
    render() {
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(canvas_width / 2 + this.path[0], 0);
        for(let i = 1; i < this.path.length; i++) {
            context.lineTo(canvas_width / 2 + separation_multiplier * this.path[i], 2 * i);
        }
        context.stroke();
    }
}