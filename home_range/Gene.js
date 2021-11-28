class Gene {
    constructor(dna = undefined) {
        if(dna === undefined) {
            this.generateRandom();
        }
        else {
            this.dna = dna;
        }
        this.normalize();
    }
    generateRandom() {
        let h = Math.random();
        let e = Math.random();
        this.dna = [h, e];
    }
    normalize() {
        let sum = 0;
        for(let nucleotide of this.dna) {
            sum += nucleotide;
        }
        for(let i = 0; i < this.dna.length; i++) {
            this.dna[i] = this.dna[i] / sum;
        }
    }
}