class NakedCell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = j * length;
        this.y = i * length;
        this.visited = false;
    }
    render() {
        if(this.visited) {
            context.fillStyle = "#00008b";
            context.fillRect(this.x, this.y, length, length);
        }
    }
}