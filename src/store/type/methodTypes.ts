export enum MutationTypes {
    CHANGE_LOADING = 'common/changeLoading',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    CLOSE_SNACK_BAR = 'common/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'common/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'common/focusOutChildCommentInput',
    CHANGE_THEME = 'common/changeTheme',

    SET_CLUB_INFO = 'club/setClubInfo',
    SET_CURRENT_TAB = 'club/setCurrentTab',
    SET_CURRENT_USER_INFO = 'club/setCurrentUserInfo',
    SET_CLUB_USER_LIST = 'club/setClubUserList',
    CHANGE_USER_ROLE = 'club/changeUserRole',
    DELETE_USER = 'club/deleteUser',

    INIT_CLUB_LIST_AND_PAGE = 'clubList/initClubListAndPage',
    INIT_MY_CLUB_LIST_AND_PAGE = 'clubList/initMyClubListAndPage',
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
}
