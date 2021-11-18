class Gene {
    constructor(dna = undefined) {
        if(dna === undefined) {
            this.generateRandom();
        }
        else {
            this.dna = dna;
        }
    }
    generateRandom() {
        let h = Math.random();
        let e = Math.random();
        this.dna = [h, e];
    }
    mutate() {

    }
    normalize() {
        let sum = 0;
        for(let nucleotide of dna) {
            sum += nucleotide;
        }
        for(let i = 0; i < this.dna.length; i++) {
            this.dna[i] /= sum;
        }
    }
}