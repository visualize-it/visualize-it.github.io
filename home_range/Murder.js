class Murder {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;

        this.completed = false;
    }
    update() {
        this.radius += 2;
        if(this.radius > 50) {
            this.completed = true;
        }
    }
    render() {
        if(!this.completed) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            context.stroke();
        }
    }
}