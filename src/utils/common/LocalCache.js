export class LocalCache {
    constructor(clearSize = 10000) {
        this.store = {};
        this.count = 0;
        this.clearSize = clearSize;
    }

    get(key) {
        return this.store[key];
    }

    put(key, value) {
        if (this.count >= this.clearSize) {
            this.store = {};
        }
        if (!this.get(key)) {
            this.count += 1;
        }
        this.store[key] = value;
    }
}
