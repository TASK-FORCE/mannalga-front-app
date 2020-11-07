import LocalCache from '@/utils/common/LocalCache.js';

class ClubTabStore {
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

export const clubTabStore = new ClubTabStore();
