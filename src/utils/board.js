const BOARD_CATEGORY = {
    NOTICE: {
        type: 'NOTICE',
        name: '공지사항',
        color: '#ba6f01',
    },
    NORMAL: {
        type: 'NORMAL',
        name: '자유글',
        color: '#009688',
    },
};

class BoardUtils {
    static getCategoryNames() {
        return Object.values(BOARD_CATEGORY).map(({ name }) => name);
    }

    static findCategoryByCurrentUserInfo(currentUserInfo) {
        if (currentUserInfo.isMaster || currentUserInfo.isManager) {
            return this.getCategoryNames();
        }
        return [BOARD_CATEGORY.NORMAL.name];
    }

    static findCategoryByType(type) {
        return BOARD_CATEGORY[type];
    }

    static findCategoryTypeByName(targetName) {
        const category = Object.values(BOARD_CATEGORY).find(({ name }) => name === targetName);
        return category ? category.type : null;
    }
}

export { BOARD_CATEGORY, BoardUtils };
