class Boid {
    constructor(type, i, j) {
        this.type = type;
        if (this.type == 1) {
            this.color = "#ff0000";
        }
        else if (this.type == 2) {
            this.color = "#0000ff";
        }
        else if (this.type == 3) {
            this.color = "#00ff00";
        }
        else if (this.type == 4) {
            this.color = "#ffffff";
        }

        this.i = i;
        this.j = j;
        this.calcCoords();

        this.moving = false;
    }
    calcCoords() {
        this.x = (this.j + 0.5) * cell_length;
        this.y = (this.i + 0.5) * cell_length;
    }
    moveTo(i, j) {
        this.moving = true;
        this.target_i = i;
        this.target_j = j;

        grid[this.i][this.j] = 0;
        grid[this.target_i][this.target_j] = -1;
    }
    update() {
        if (this.moving) {
            if (this.i == this.target_i && this.j == this.target_j) {
                this.moving = false;
                grid[this.target_i][this.target_j] = this.type;
            }
            else {
                if (this.target_i > this.i) {
                    this.i++;
                }
                else if (this.target_i < this.i) {
                    this.i--;
                }

                if (this.target_j > this.j) {
                    this.j++;
                }
                else if (this.target_j < this.j) {
                    this.j--;
                }

                this.calcCoords();
            }
        }
    }
    render() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, boid_radius, 0, 2 * Math.PI);
        context.fill();
    }
}