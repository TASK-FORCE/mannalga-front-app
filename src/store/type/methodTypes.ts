export enum MutationTypes {
    CHANGE_LOADING = 'common/changeLoading',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    CLOSE_SNACK_BAR = 'common/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'common/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'common/focusOutChildCommentInput',
    CHANGE_THEME = 'common/changeTheme',

    SET_CURRENT_TAB = 'club/setCurrentTab',
    SET_CLUB_DETAIL_CONTEXT = 'club/clubDetailContext',
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

    SET_PROFILE = 'user/setProfile',
    CHANGE_PROFILE_NAME = 'user/changeProfileName',
    SET_SELECTED_REGIONS = 'user/setSelectedRegions',
    SET_SELECTED_INTERESTS = 'user/setSelectedInterests',
    SET_USER_PROFILE = 'user/setUserProfile',
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

    REQUEST_KAKAO_PROFILE = 'user/requestKakaoProfile',
    REQUEST_REGISTER = 'user/requestRegister',
    REQUEST_USER_PROFILE = 'user/requestUserProfile',
    REQUEST_USER_REGIONS = 'user/requestUserRegions',
    REQUEST_CHANGE_USER_REGIONS = 'user/requestChangeUserRegions',
    REQUEST_USER_INTERESTS = 'user/requestUserInterests',
    REQUEST_CHANGE_USER_INTERESTS = 'user/requestChangeUserInterests',
    REQUEST_CHECK_IS_MEMBER = 'user/requestCheckIsMember',
    REQUEST_CHANGE_USER_PROFILE = 'user/requestChangeUserProfile',
}
