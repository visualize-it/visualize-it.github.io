class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = j * length;
        this.y = i * length;

        this.visited = false;
        this.walls = [true, true, true, true];
    }
    render() {
        if(this.visited) {
            context.fillStyle = "#00008b";
            context.fillRect(this.x, this.y, length, length);
        }
        if(this.inStack) {
            context.fillStyle = "#ff3131";
            context.fillRect(this.x, this.y, length, length);
        }
        context.strokeStyle = "#ffffff";
        if(this.walls[0]) {
            drawLine(this.x, this.y, this.x + length, this.y);
        }
        if(this.walls[1]) {
            drawLine(this.x + length, this.y, this.x + length, this.y + length);
        }
        if(this.walls[2]) {
            drawLine(this.x + length, this.y + length, this.x, this.y + length);
        }
        if(this.walls[3]) {
            drawLine(this.x, this.y + length, this.x, this.y);
        }
    }
}