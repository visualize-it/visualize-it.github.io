class Wall {
    constructor(x, y, orientation) {
        this.x = x;
        this.y = y;

        this.selected = false;

        if (orientation == "h") {
            this.width = canvas_width / wall_width_factor;
            this.height = canvas_height / wall_height_factor;
        }
        else {
            this.width = canvas_height / wall_height_factor;
            this.height = canvas_width / wall_width_factor;
        }
        this.x = this.x - this.width / 2;
        this.y = this.y - this.height / 2;

        this.initSelect();
    }
    initSelect() {
        this.initial_x = 0;
        this.initial_y = 0;
        this.selected_x = 0;
        this.selected_y = 0;
    }
    select() {
        this.selected = true;
        this.initial_x = this.x;
        this.initial_y = this.y;
        this.selected_x = click_x;
        this.selected_y = click_y;
    }
    update() {
        if (this.selected) {
            this.x = this.initial_x + click_x - this.selected_x;
            this.y = this.initial_y + click_y - this.selected_y;
        }
    }
    release() {
        this.selected = false;
    }
    clicked() {
        if(this.x < click_x && click_x < this.x + this.width && this.y < click_y && click_y < this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
    inside(boid) {
        if(this.x < boid.x && boid.x < this.x + this.width && this.y < boid.y && boid.y < this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        context.fillStyle = "#ffffff";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}