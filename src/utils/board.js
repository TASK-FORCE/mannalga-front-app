const BOARD_CATEGORY = {
    NOTICE: {
        name: '공지사항',
        color: '#ba6f01',
    },
    JOIN_GREETING: {
        name: '가입인사',
        color: '#2196f3',
    },
    FREE: {
        name: '자유글',
        color: '#009688',
    },
    MEETING_REVIEW: {
        name: '모임후기',
        color: '#795548',
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
        return [BOARD_CATEGORY.JOIN_GREETING.name, BOARD_CATEGORY.FREE.name, BOARD_CATEGORY.MEETING_REVIEW.name];
    }

    static findCategoryByType(name) {
        return BOARD_CATEGORY[name];
    }
}

export { BOARD_CATEGORY, BoardUtils };
