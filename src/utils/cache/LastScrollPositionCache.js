import { LocalCache } from '@/utils/cache/LocalCache.js';

class LastScrollPositionCache {
    constructor() {
        this.scrollYCache = new LocalCache(100);
    }

    save(key) {
        this.scrollYCache.put(key, window.scrollY);
    }

    get(key) {
        return this.scrollYCache.get(key);
    }

    init(key) {
        this.scrollYCache.put(key, undefined);
    }
}

const lastScrollPositionCache = new LastScrollPositionCache();
export default lastScrollPositionCache;
