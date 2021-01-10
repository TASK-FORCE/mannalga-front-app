class LastClubListTabCache {
    constructor() {
        this.lastTab = 'club';
    }

    get() {
        return this.lastTab;
    }

    save(tabName) {
        this.lastTab = tabName;
    }
}

const lastClubListTabCache = new LastClubListTabCache();
export default lastClubListTabCache;
