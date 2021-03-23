export class LocalCache<V> {

  private store: Store<V>;
  private size: number;
  private readonly clearSize: number;

  constructor(clearSize = 10000) {
    this.store = {};
    this.size = 0;
    this.clearSize = clearSize;
  }

  get(key: Key): V {
    return this.store[key];
  }

  put(key: Key, value: V) {
    if (this.size >= this.clearSize) {
      this.store = {};
    }
    if (!this.get(key)) {
      this.size += 1;
    }
    this.store[key] = value;
  }
}

type Key = string | number
type Store<V> = {
  [key in Key]: V;
};
