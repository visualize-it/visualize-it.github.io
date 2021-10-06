class Heap {
    constructor() {
        this.array = [];
    }
    percolateUp(pos) {
        let index = Math.floor((pos - 1) / 2);
        if (pos >= 0 && this.array[pos] > this.array[index]) {
            this.swap(pos, index);
            this.percolateUp(index);

            swaps++;
            comparisons += 1;
            array_access += 2;
        }
    }
    percolateDown(pos) {
        if (this.array.length > 2 * pos + 2 && this.array[pos] < this.array[2 * pos + 1] && this.array[pos] < this.array[2 * pos + 2]) {
            if (this.array[2 * pos + 1] > this.array[2 * pos + 2]) {
                this.swap(pos, 2 * pos + 1);
                this.percolateDown(2 * pos + 1);

                swaps++;
                comparisons += 2;
                array_access += 4;
            }
            else {
                this.swap(pos, 2 * pos + 2);
                this.percolateDown(2 * pos + 2);

                swaps++;
            }
        }
        else if (this.array.length > 2 * pos + 1 && this.array[pos] < this.array[2 * pos + 1]) {
            this.swap(pos, 2 * pos + 1);
            this.percolateDown(2 * pos + 1);

            swaps++;
            comparisons += 1;
            array_access += 2;
        }
        else if (this.array.length > 2 * pos + 2 && this.array[pos] < this.array[2 * pos + 2]) {
            this.swap(pos, 2 * pos + 2);
            this.percolateDown(2 * pos + 2);

            swaps++;
            comparisons += 1;
            array_access += 2;
        }
    }
    insertElement(d) {
        this.array.push(d);
        this.percolateUp(this.array.length - 1);
    }
    deleteElement(d) {
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] == d) {
                this.swap(i, this.array.length - 1);
                this.array.pop();
                this.percolateDown(i);
            }
        }
    }
    buildHeap(rawArray) {
        for (let element of rawArray) {
            this.insertElement(element);;
        }
    }
    getRoot() {
        return this.array[0];
    }
    clearHeap() {
        this.array = [];
    }
    swap(index1, index2) {
        [this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
    }
}