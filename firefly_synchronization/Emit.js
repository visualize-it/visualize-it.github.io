class Emit {
    constructor(firefly) {
        this.firefly = firefly
        this.r = 0;

        this.finished = false
    }

    update() {
        if (!this.finished) {
            this.r += emit_speed;
            if (this.r > emit_limit) {
                this.finished = true;
            }
        }
    }

    render() {
        if (!this.finished) {
            context.strokeStyle = "#ffffff";
            context.beginPath();
            context.arc(this.firefly.position.x, this.firefly.position.y, this.r, 0, 2 * Math.PI);
            context.stroke();
        }
    }
}