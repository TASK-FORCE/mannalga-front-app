import { ClubListPageTab } from '@/interfaces/club';

class LastClubListTabCache {
    private lastTab: ClubListPageTab;

    constructor() {
        this.lastTab = ClubListPageTab.CLUB;
    }

    get(): ClubListPageTab {
        return this.lastTab;
    }

    save(tab: ClubListPageTab) {
        this.lastTab = tab;
    }
}

const lastClubListTabCache = new LastClubListTabCache();
export default lastClubListTabCache;
