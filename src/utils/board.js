const BOARD_CATEGORY = {
    NOTICE: {
        type: 'NOTICE',
        name: '공지사항',
        color: '#ba6f01',
    },
    // JOIN_GREETING: {
    //     name: '가입인사',
    //     color: '#2196f3',
    // },
    NORMAL: {
        type: 'NORMAL',
        name: '자유글',
        color: '#009688',
    },
    // MEETING_REVIEW: {
    //     name: '모임후기',
    //     color: '#795548',
    // },
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

    static findCategoryTypeByName(name) {
        return Object.values(BOARD_CATEGORY)
            .find(category => category.name === name)
            .type;
    }
}

export { BOARD_CATEGORY, BoardUtils };
