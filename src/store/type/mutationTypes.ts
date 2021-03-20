export type MutationTypes =
    CommonMutationTypes | ClubMutationTypes | ClubListMutationTypes |
    UserMutationTypes | AuthMutationTypes | AlbumMutationTypes

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

export enum AuthMutationTypes {
    SET_APP_TOKEN = 'auth/setAppToken',
    REMOVE_APP_TOKEN = 'auth/removeAppToken',
}


export enum AlbumMutationTypes {
    SET_ALBUM = 'album/setAlbum',
    SET_ALBUM_LIST = 'album/setAlbumList',
    ADD_NEXT_ALBUM_LIST = 'album/addNextAlbumList',
    INIT_ALBUM_LIST = 'album/initAlbumList',
    SET_ALBUM_COMMENT_LIST = 'album/setAlbumCommentList',
    ADD_NEXT_ALBUM_COMMENT_LIST = 'album/addNextAlbumCommentList',
    ADD_NEXT_ALBUM_COMMENT_LIST_WITH_CHECK_DUPLICATE = 'album/addNextAlbumCommentListWithCheckDuplicate',
    INIT_ALBUM_COMMENT_LIST = 'album/initAlbumCommentList',
    COUNT_CHILD_COMMENT_CNT = 'album/countChildCommentCnt',
    CHANGE_ALBUM_LIKE = 'album/changeAlbumLike',
    COUNT_ALBUM_COMMENT_CNT = 'album/countAlbumCommentCnt',
}
