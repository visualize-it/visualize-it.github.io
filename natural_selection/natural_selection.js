let boids = [];
let pool = [];
let generation;
let avg_fitness;
let max_fitness_gene;

let walls = [];
let source, target;

let lifespan, current_age;
let num_boids, num_reached;
let reached_target;

let reached_bias, dead_bias, mutation_rate;

let velocity_multiplier, pool_multiplier;

let spoke_length;
let wall_width_factor, wall_height_factor;
let radius_factor;

let movables = [];

function makePool() {
    pool = [];

    let new_avg_fitness = 0;
    let max_fitness = 0;
    num_reached = 0;
    
    for (let boid of boids) {
        new_avg_fitness += boid.fitness;
        if (boid.fitness > max_fitness) {
            max_fitness = boid.fitness;
            max_fitness_gene = boid.gene;
        }
        if (boid.reached) {
            num_reached++;
        }
    }
    new_avg_fitness /= num_boids;

    for (let boid of boids) {
        boid.fitness /= max_fitness;
    }

    for (let boid of boids) {
        let number_in_pool = Math.floor(pool_multiplier * boid.fitness);
        for (let i = 0; i < number_in_pool; i++) {
            pool.push(boid);
        }
    }

    fitness_display.innerHTML = `Maximum fitness: ${max_fitness.toFixed(6)} <br> Average fitness: ${new_avg_fitness.toFixed(6)}`;
    if(generation > 2) {
        let percent_change = 100 * (new_avg_fitness - avg_fitness) / avg_fitness;
        fitness_display.innerHTML += `<br> Evolution: ${percent_change.toFixed(2)} %`;
    }
    avg_fitness = new_avg_fitness;
    drawGene();
}

function mate() {
    boids = [];
    let parent1_dna, parent2_dna;
    let new_gene;
    let new_dna = []
    for (let i = 0; i < num_boids; i++) {
        new_dna = [];
        parent1_dna = randomParent().gene.dna;
        parent2_dna = randomParent().gene.dna;

        for(let i = 0; i < lifespan / 2; i++) {
            new_dna.push(parent1_dna[i]);
        }
        for(let i = Math.floor(lifespan / 2); i < lifespan; i++) {
            new_dna.push(parent2_dna[i]);
        }
        new_gene = new Gene(new_dna);
        new_gene.mutate();
        boids.push(new Boid(new_gene));
    }

    current_age = 0;
    reached_target = false;
    generation_display.innerHTML = `Generation: ${generation}`;
}

function update() {
    if (current_age < lifespan) {
        for (let boid of boids) {
            boid.update();
        }
        current_age++;
    }
    else if (current_age == lifespan) {
        for (let boid of boids) {
            boid.calculateFitness();
        }
        generation++;
        makePool();
        mate();
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let wall of walls) {
        wall.render();
    }

    target.render();
    source.render();

    for (let boid of boids) {
        boid.render();
    }

    drawLifespan();
}

function updateParams(variable) {

}

function initParams() {
    lifespan = 500;
    num_boids = 100;

    mutation_rate = 0.05;
    reached_bias = 4;
    dead_bias = 3;

    pool_multiplier = 100;
    velocity_multiplier = canvas_width / 60;

    spoke_length = canvas_width / 60;
    radius_factor = 40;
    wall_width_factor = 5;
    wall_height_factor = 30;

    initialize();
}

function initialize() {
    walls = [];
    
    source = new Source(canvas_width / 2, 7 * canvas_height / 8);
    target = new Target(canvas_width / 2, canvas_height / 8);

    walls.push(new Wall(canvas_width / 2, canvas_height / 2, "h"));

    updateMovables();
    makeInitPopulation();

    fitness_display.innerHTML = "";
    fitness_display.innerHTML = `Maximum fitness: 0 <br> Average fitness: 0`;

    gene_context.fillStyle = "#000000";
    gene_context.fillRect(0, 0, gene_canvas.width, gene_canvas.height);

    if(paused) {
        pauseToggle();
    }
}

function makeInitPopulation() {
    boids = [];
    for (let i = 0; i < num_boids; i++) {
        boids.push(new Boid(new Gene()));
    }
    generation = 1;
    current_age = 0;
    num_reached = 0;
    reached_target = false;

    generation_display.innerHTML = `Generation: ${generation}`;
}

function drawLifespan() {
    let width = Math.floor(canvas_width * (1 - current_age / lifespan));
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, 2);
}

function drawGene() {
    gene_context.fillStyle = "#ffff00";
    gene_context.fillRect(0, 0, gene_canvas.width, gene_canvas.height);

    let width = Math.ceil(canvas_width / lifespan);
    let hue;
    for(let i = 0; i < lifespan; i += width) {
        hue = Math.floor(255 * max_fitness_gene.dna[i] / (2 * Math.PI));
        gene_context.fillStyle = `hsl(${hue}, 50%, 50%)`;
        gene_context.fillRect(i * width, 0, (i + 1) * width, gene_canvas.height);
    } 
}

function updateMovables() {
    movables = [];
    movables.push(source);
    movables.push(target);
    for (let wall of walls) {
        movables.push(wall);
    }
}

function addWall(orientation) {
    walls.push(new Wall(canvas_width / 2, canvas_height / 2, orientation));
    updateMovables();
}

function clearWalls() {
    walls = [];
    updateMovables();
}

function randomParent() {
    return pool[Math.floor(Math.random() * pool.length)];
}

function pauseToggle() {
    if(paused) {
        paused = false;
        pause_button.innerHTML = "Pause";
    }
    else {
        paused = true;
        pause_button.innerHTML = "Resume";
    }
}