class Boid {
    constructor(gene) {
        this.x = source.x;
        this.y = source.y;
        this.angle = 0;
        this.fitness = 0;

        this.gene = gene;

        this.alive = true;
        this.reached = false;
        this.first_reached = false;
    }
    update() {
        if (this.alive && !this.reached) {
            this.angle += this.gene.dna[current_age];
            this.x += velocity_multiplier * Math.cos(this.angle);
            this.y += velocity_multiplier * Math.sin(this.angle);
        }

        if (this.x < 0 || this.x > canvas_width || this.y < 0 || this.y > canvas_height) {
            this.alive = false;
        }

        for(let wall of walls) {
            if(wall.inside(this)) {
                this.alive = false;
            }
        }

        if(target.inside(this)) {
            this.reached = true;
            
            if(!reached_target) {
                reached_target = true;
                this.first_reached = true;
                fastest_time = current_age;
            }
        }
    }
    render() {
        if (this.alive) {
            context.fillStyle = "#ffff00";
        }
        else {
            context.fillStyle = "#666666";
        }
        context.beginPath();
        context.moveTo(this.x + spoke_length * Math.cos(this.angle), this.y + spoke_length * Math.sin(this.angle));
        context.lineTo(this.x + spoke_length * Math.cos(this.angle + 2.62), this.y + spoke_length * Math.sin(this.angle + 2.62));
        context.lineTo(this.x + spoke_length * Math.cos(this.angle + 3.67), this.y + spoke_length * Math.sin(this.angle + 3.67));
        context.lineTo(this.x + spoke_length * Math.cos(this.angle), this.y + spoke_length * Math.sin(this.angle));
        context.fill();
    }
    calculateFitness() {
        let distance = getDistance(this.x, this.y, target.x, target.y);
        this.fitness = 1 / distance;

        if(this.reached) {
            this.fitness *= reached_bias;
            if(this.first_reached) {
                this.fitness *= early_bias;
            }
        }
        if(!this.alive) {
            this.fitness /= dead_bias;
        }
    }
}