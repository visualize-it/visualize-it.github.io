class Animal {
    constructor(x, y, gene) {
        this.x = x;
        this.y = y;
        this.dna = gene.dna;
        this.outreach_limit = Math.ceil(10 * this.dna[1]);

        this.vx = 0;
        this.vy = 0;
        this.heading = 2 * Math.PI * Math.random();

        this.hunger = max_hunger / 2;

        this.targeting = false;
        this.target_x = 0;
        this.target_y = 0;

        this.lifespan = 0;
    }
    update() {
        this.lifespan++;
        if (this.targeting) {
            this.seekTarget();
        }
        else {
            this.biasedWalk();
        }
        this.calculateHeading();
        this.normalizeVelocity();
        this.move();
        this.manageHunger();
    }
    render() {
        context.fillStyle = `hsl(${Math.floor(256 * this.hunger / max_hunger)}, 50%, 50%)`
        context.beginPath();
        context.moveTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading)));
        context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading + 2.62), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading + 2.62)));
        context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading + 3.67), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading + 3.67)));
        context.lineTo(canvas_width / 2 + this.x + spoke_length * Math.cos(this.heading), canvas_height / 2 - (this.y + spoke_length * Math.sin(this.heading)));
        context.fill();
    }
    seekTarget() {
        let row = Math.ceil((canvas_height / 2 - this.target_y) / res);
        let col = Math.ceil((canvas_width / 2 + this.target_x) / res);

        row = row % grid.length;
        col = col % grid[0].length;

        if (grid[row][col] == 0) {
            this.targeting = false;
            this.seekFood();
        }
        else {
            if (Math.abs(this.x - this.target_x) < res / 2) {
                this.vx = 0;
            }
            else if (this.x < this.target_x) {
                this.vx = 1;
            }
            else {
                this.vx = -1;
            }

            if (Math.abs(this.y - this.target_y) < res / 2) {
                this.vy = 0;
            }
            else if (this.y < this.target_y) {
                this.vy = 1;
            }
            else {
                this.vy = -1;
            }
        }
    }
    biasedWalk() {
        let random_angle = turning_angle * Math.random() - (turning_angle / 2);
        let f = this.getHomesickness();
        let g = this.getExploration();

        this.vx = this.dna[0] * f * (-this.x) + this.dna[1] * g * Math.cos(this.heading + random_angle);
        this.vy = this.dna[0] * f * (-this.y) + this.dna[1] * g * Math.sin(this.heading + random_angle);
    }
    move() {
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
    }
    manageHunger() {
        this.hunger--;
        if (this.hunger <= 0) {
            animals = removeElement(animals, this);
            naturalSelection(animals, 1);
            updateParams("hunger");
        }

        if (!this.targeting && this.hunger / max_hunger < trigger_seek) {
            this.seekFood();
        }

        this.checkFood();
    }
    seekFood() {
        let row = Math.ceil((canvas_height / 2 - this.y) / res);
        let col = Math.ceil((canvas_width / 2 + this.x) / res);

        let outreach = 1;
        while (outreach <= this.outreach_limit && !this.targeting) {
            if (row - outreach > -1 && row + outreach < grid.length && col - outreach > -1 && col + outreach < grid[0].length) {
                this.searchFood(row, col, outreach);
            }
            outreach++;
        }
    }
    checkFood() {
        let row = Math.ceil((canvas_height / 2 - this.y) / res);
        let col = Math.ceil((canvas_width / 2 + this.x) / res);

        row = row % grid.length;
        col = col % grid[0].length;

        if (grid[row][col] == 1) {
            grid[row][col] = 0;
            this.hunger = max_hunger;
            this.targeting = false;
        }
    }
    getExploration() {
        return Math.pow(1 + this.dna[1], 2);
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
    searchFood(row, col, distance) {
        let i, j;

        // upper edge
        i = row - distance
        j = col - distance;

        while (j <= col + distance) {
            if (grid[i][j] == 1) {
                this.setTarget(i, j);
                return;
            }
            j++;
        }

        // right edge
        j = col + distance;
        i = row - distance;
        while (i <= row + distance) {
            if (grid[i][j] == 1) {
                this.setTarget(i, j);
                return;
            }
            i++;
        }

        // bottom edge
        i = row + distance;
        j = col - distance;
        while (j <= col + distance) {
            if (grid[i][j] == 1) {
                this.setTarget(i, j);
                return;
            }
            j++;
        }

        // left edge
        j = col - distance;
        i = row - distance;
        while (i <= row + distance) {
            if (grid[i][j] == 1) {
                this.setTarget(i, j);
                return;
            }
            i++;
        }
    }
    setTarget(row, col) {
        this.target_x = res * (col - 0.5) - canvas_width / 2;
        this.target_y = -res * (row - 0.5) + canvas_height / 2;
        this.targeting = true;
    }
    getLocation() {
        let row = Math.ceil((canvas_height / 2 + this.y) / res);
        let col = Math.ceil((canvas_width / 2 + this.x) / res);
        return [row, col];
    }
    kill() {
        animals = removeElement(animals, this);
    }
}