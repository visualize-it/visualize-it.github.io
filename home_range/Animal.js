class Animal {
    constructor(x, y, gene) {
        this.x = x;
        this.y = y;
        this.dna = gene.dna;

        this.vx = 0;
        this.vy = 0;
        this.heading = 2 * Math.PI * Math.random();

        this.hunger = max_hunger / 2;
        this.alive = true;
    }
    update() {
        if (this.alive) {
            let random_angle = turning_angle * Math.random() - (turning_angle / 2);
            let f = this.getHomesickness();
            let g = this.getExploration();

            this.vx = this.dna[0] * f * (-this.x) + this.dna[1] * g * Math.cos(this.heading + random_angle);
            this.vy = this.dna[0] * f * (-this.y) + this.dna[1] * g * Math.sin(this.heading + random_angle);
            this.calculateHeading();
            this.normalizeVelocity();

            this.x += v_animal * this.vx * dt;
            this.y += v_animal * this.vy * dt;

            if (this.x < -canvas_width / 2) {
                this.x = canvas_width / 2;
            }
            else if (this.x > canvas_width / 2) {
                this.x = -canvas_width / 2;
            }
            if (this.y < -canvas_height / 2) {
                this.y = canvas_height / 2;
            }
            else if (this.y > canvas_height / 2) {
                this.y = -canvas_height / 2;
            }

            this.hunger--;
            if (this.hunger <= 0) {
                this.alive = false;
            }

            this.checkFood();
        }
    }
    render() {
        if (this.alive) {
            context.fillStyle = `hsl(${Math.floor(256 * this.hunger / max_hunger)}, 50%, 50%)`
            context.beginPath();
            context.moveTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading)));
            context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading + 2.62), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading + 2.62)));
            context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading + 3.67), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading + 3.67)));
            context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading)));
            context.fill();
        }
    }
    checkFood() {
        let row = Math.ceil((canvas_height / 2 - this.y) / res);
        let col = Math.ceil((canvas_width / 2 + this.x) / res);

        row = row % grid.length;
        col = col % grid[0].length;

        if(grid[row][col] == 1) {
            grid[row][col] = 0;
            this.hunger = max_hunger;
        }
    }
    getExploration() {
        return (max_hunger - this.hunger);
    }
    getHomesickness() {
        let d = getMagn(this.x, this.y);
        return (k1 * Math.pow(d, 2)) / (Math.pow(d0, 2) + Math.pow(d, 2));
    }
    normalizeVelocity() {
        let normalization_constant = getMagn(this.vx, this.vy);
        this.vx /= normalization_constant;
        this.vy /= normalization_constant;
    }
    calculateHeading() {
        this.heading = Math.atan(this.vy / this.vx);
        if (this.vx < 0) {
            // feature of coordinate system
            this.heading += Math.PI;
        }
    }
}