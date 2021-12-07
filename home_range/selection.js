let pool = [];

// very sensitive parameters
let mutation_rate = 0.2;
let mutation_amplitude = 0.3;

// user defined, based on scenario
function calculateFitness(entity) {
    return entity.lifespan / 100;
}

// user defined, based on how genes are structured
function recombine(dna1, dna2) {
    let new_dna = [];

    for (let i = 0; i < dna1.length; i++) {
        if (Math.random() < 0.5) {
            new_dna.push(dna1[i]);
        }
        else {
            new_dna.push(dna2[i]);
        }
    }
    return new Gene(new_dna);
}

// user defined, based on how genes are structured
function mutate(gene) {
    let dna = gene.dna;
    let new_dna = [];
    let nucleotide;

    for (let i = 0; i < dna.length; i++) {
        nucleotide = dna[i];
        if (Math.random() < mutation_rate) {
            nucleotide += (mutation_amplitude * Math.random()) - (mutation_amplitude / 2);
        }
        new_dna.push(nucleotide);
    }
    return new Gene(new_dna)
}

// abstract, independent of scenario
function naturalSelection(entities, num_offspring) {
    pool = [];
    for (let entity of entities) {
        let fitness = Math.ceil(calculateFitness(entity));

        for (let i = 0; i < fitness; i++) {
            pool.push(entity);
        }
    }

    for (let i = 0; i < num_offspring; i++) {
        let parent1 = pool[Math.ceil(Math.random() * pool.length) - 1];
        let parent2 = pool[Math.ceil(Math.random() * pool.length) - 1];
        let new_entity = mate(parent1, parent2);
        entities.push(new_entity);
    }
}

// abstract, independent of scenario
function mate(parent1, parent2) {
    let recombined_gene = recombine(parent1.dna, parent2.dna);
    let mutated_gene = mutate(recombined_gene);

    // make sure new entity is within home range
    let distance = 2 * canvas_width;
    while (distance > d0) {
        x = Math.random() * canvas_width;
        y = Math.random() * canvas_height;
        distance = getDistanceFromCenter(x, y);
    }
    return new Animal(x - canvas_width / 2, y - canvas_height / 2, mutated_gene);
}