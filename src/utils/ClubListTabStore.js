class ClubListTabStore {
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

const clubListTabStore = new ClubListTabStore();
export default clubListTabStore;
