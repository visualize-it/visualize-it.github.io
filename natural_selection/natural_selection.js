let boids = [];
let pool = [];
let generation;
let avg_fitness;

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

        // uniform mixing
        for (let i = 0; i < lifespan; i++) {
            if (Math.random() > 0.5) {
                new_dna.push(parent1_dna[i]);
            } else {
                new_dna.push(parent2_dna[i]);
            }
        }

        // crossover
        // for(let i = 0; i < lifespan / 2; i++) {
        //     new_dna.push(parent1_dna[i]);
        // }
        // for(let i = Math.floor(lifespan / 2); i < lifespan; i++) {
        //     new_dna.push(parent2_dna[i]);
        // }
        new_gene = new Gene(new_dna);
        new_gene.mutate();
        boids.push(new Boid(new_gene));
    }

    current_age = 0;
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
    reached_bias = 10;
    dead_bias = 5;

    pool_multiplier = 100;
    velocity_multiplier = 10;

    spoke_length = 10;
    radius_factor = 40;
    wall_width_factor = 5;
    wall_height_factor = 30;

    source = new Source(canvas_width / 2, 7 * canvas_height / 8);
    target = new Target(canvas_width / 2, canvas_height / 8);

    walls.push(new Wall(canvas_width / 2, canvas_height / 2, "h"));

    updateMovables();
    makeInitPopulation();
}

function makeInitPopulation() {
    for (let i = 0; i < num_boids; i++) {
        boids.push(new Boid(new Gene()));
    }
    generation = 1;
    current_age = 0;
    num_reached = 0;
    reached_target = false;
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

function drawLifespan() {
    let width = Math.floor(canvas_width * (1 - current_age / lifespan));
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, 2);
}

function randomParent() {
    return pool[Math.floor(Math.random() * pool.length)];
}