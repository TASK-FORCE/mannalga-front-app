export enum MutationTypes {
    CHANGE_LOADING = 'common/changeLoading',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    CLOSE_SNACK_BAR = 'common/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'common/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'common/focusOutChildCommentInput',
    CHANGE_THEME = 'common/changeTheme',

    SET_CURRENT_TAB = 'club/setCurrentTab',
    SET_CLUB_DETAIL_CONTEXT= 'club/clubDetailContext',
    CHANGE_USER_ROLE = 'club/changeUserRole',
    DELETE_USER = 'club/deleteUser',

    CHANGE_CLUB_LIST_WITH_PAGE = 'clubList/changeClubListWithPage',
    CHANGE_MY_CLUB_LIST_WITH_PAGE = 'clubList/changeMyClubListWithPage',
    ADD_NEXT_CLUB_LIST = 'clubList/addNextClubList',
    ADD_NEXT_MY_CLUB_LIST = 'clubList/addNextMyClubList',
    CHANGE_IS_REQUESTING_NEXT_PAGE = 'clubList/changeIsRequestingNextPage',
    INIT_CLUB_LIST_AND_PAGE = 'clubList/initClubListAndPage',
    INIT_MY_CLUB_LIST_AND_PAGE = 'clubList/initMyClubListAndPage',
    CHANGE_CLUB_SEARCH_REGION = 'clubList/changeClubSearchRegion',
    CHANGE_CLUB_SEARCH_INTEREST = 'clubList/changeClubSearchInterest',
    CHANGE_CLUB_SEARCH_TEXT = 'clubList/changeClubSearchText',
}

export enum ActionTypes {
    UPLOAD_TEMP_IMAGE = 'common/uploadTempImage',

    REQUEST_CLUB_INFO_AND_USER_INFO = 'club/requestClubInfoAndUserInfo',
    REQUEST_CLUB_CREATE = 'club/requestClubCreate',
    REQUEST_CLUB_CHANGE = 'club/requestClubChange',
    REQUEST_CLUB_JOIN = 'club/requestClubJoin',
    REQUEST_CHANGE_USER_ROLE = 'club/requestChangeUserRole',
    REQUEST_KICK_USER = 'club/requestKickUser',
    REQUEST_CLUB_WITHDRAW = 'club/requestClubWithdraw',

    REQUEST_FIRST_CLUB_LIST = 'clubList/requestFirstClubList',
    REQUEST_NEXT_CLUB_LIST = 'clubList/requestNextClubList',
    REQUEST_FIRST_MY_CLUB_LIST = 'clubList/requestFirstMyClubList',
    REQUEST_NEXT_MY_CLUB_LIST = 'clubList/requestNextMyClubList',
}
