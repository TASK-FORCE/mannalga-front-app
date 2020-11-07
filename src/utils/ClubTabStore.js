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
        const newVar = this.cache.get(clubSeq);
        console.log(clubSeq, ':', newVar);
        return newVar;
    }

    save(clubSeq, tabName) {
        this.cache.put(clubSeq, tabName);
        console.log('save', clubSeq, tabName);
    }
}

export const clubTabStore = new ClubTabStore();
