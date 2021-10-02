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
        this.dna = [];
        for(let i = 0; i < this.lifespan; i++) {
            this.dna.push(Math.random() * 2 * Math.PI);
        }
    }
    mutate() {
        for(let i = 0; i < this.lifespan; i++) {
            if(Math.random() < mutation_rate) {
                this.dna[i] = Math.random() * 2 * Math.PI
            }
        }
    }
}