import { LocalCache } from '@/utils/cache/LocalCache.js';

class LastClubTabCache {
    constructor() {
        this.cache = new LocalCache(1000);
    }

    get(clubSeq) {
        const value = this.cache.get(clubSeq);
        if (!value) {
            this.cache.put(clubSeq, 'main');
        }
        return this.cache.get(clubSeq);
    }

    save(clubSeq, tabName) {
        this.cache.put(clubSeq, tabName);
    }
}

const lastClubTabCache = new LastClubTabCache();
export default lastClubTabCache;
