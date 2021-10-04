class Gene {
    constructor(dna) {
        this.lifespan = lifespan;
        if(dna === undefined) {
            this.generateRandom();
        }
        else {
            this.dna = dna;
        }
    }
    generateRandom() {
        this.dna = [Math.random() * 2 * Math.PI];
        for(let i = 1; i < this.lifespan; i++) {
            this.dna.push(Math.random() * 2 * half_angle - half_angle);
        }
    }
    mutate() {
        for(let i = 1; i < this.lifespan; i++) {
            if(Math.random() < mutation_rate) {
                this.dna[i] = Math.random() * 2 * half_angle - half_angle;
            }
        }
    }
}