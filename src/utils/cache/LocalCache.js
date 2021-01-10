export class LocalCache {
    constructor(clearSize = 10000) {
        this.store = {};
        this.size = 0;
        this.clearSize = clearSize;
    }

    get(key) {
        return this.store[key];
    }

    put(key, value) {
        if (this.size >= this.clearSize) {
            this.store = {};
        }
        if (!this.get(key)) {
            this.size += 1;
        }
        this.store[key] = value;
    }

    print() {
        console.log(this.store);
    }
}
