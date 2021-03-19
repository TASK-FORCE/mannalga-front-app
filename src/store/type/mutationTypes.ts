export type MutationTypes = CommonMutationTypes | ClubMutationTypes | ClubListMutationTypes | UserMutationTypes

export enum CommonMutationTypes {
    CHANGE_LOADING = 'common/changeLoading',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    CLOSE_SNACK_BAR = 'common/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'common/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'common/focusOutChildCommentInput',
    CHANGE_THEME = 'common/changeTheme',
}


export enum ClubMutationTypes {
    SET_CURRENT_TAB = 'club/setCurrentTab',
    SET_CLUB_DETAIL_CONTEXT = 'club/clubDetailContext',
    CHANGE_USER_ROLE = 'club/changeUserRole',
    DELETE_USER = 'club/deleteUser',
}


export enum ClubListMutationTypes {
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

export enum UserMutationTypes {
    SET_PROFILE = 'user/setProfile',
    CHANGE_PROFILE_NAME = 'user/changeProfileName',
    SET_SELECTED_REGIONS = 'user/setSelectedRegions',
    SET_SELECTED_INTERESTS = 'user/setSelectedInterests',
    SET_USER_PROFILE = 'user/setUserProfile',
}

