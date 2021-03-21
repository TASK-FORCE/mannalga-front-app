export type MutationTypes =
    UIMutationTypes | ClubMutationTypes | ClubListMutationTypes |
    UserMutationTypes | AuthMutationTypes | AlbumMutationTypes |
    BoardMutationTypes | CommonMutationTypes | MeetingMutationTypes

export enum UIMutationTypes {
    CHANGE_LOADING = 'ui/changeLoading',
    OPEN_SNACK_BAR = 'ui/openSnackBar',
    CLOSE_SNACK_BAR = 'ui/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'ui/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'ui/focusOutChildCommentInput',
    CHANGE_THEME = 'ui/changeTheme',
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

export enum BoardMutationTypes {
    SET_BOARD_LIST = 'board/setBoardList',
    SET_ONLY_BOARD_LIST = 'board/setOnlyBoardList',
    ADD_NEXT_BOARD_LIST = 'board/addNextBoardList',
    INIT_BOARD_LIST = 'board/initBoardList',
    SET_BOARD = 'board/setBoard',
    SET_BOARD_COMMENT_LIST = 'board/setBoardCommentList',
    ADD_NEXT_BOARD_COMMENT_LIST = 'board/addNextBoardCommentList',
    ADD_NEXT_BOARD_COMMENT_LIST_WITH_CHECK_DUPLICATE = 'board/addNextBoardCommentListWithCheckDuplicate',
    INIT_BOARD_COMMENT_LIST = 'board/initBoardCommentList',
    COUNT_COMMENT_CNT_OF_BOARD = 'board/countCommentCntOfBoard',
    COUNT_COMMENT_CNT_OF_PARENT_COMMENT = 'board/countCommentCntOfParentComment',
    CHANGE_BOARD_LIKE = 'board/changeBoardLike',
}

export enum CommonMutationTypes {
    SET_ROOT_REGIONS = 'common/setRootRegions',
    SET_ROOT_INTERESTS = 'common/setRootInterests',
}

export enum MeetingMutationTypes {
    SET_MEETING = 'meeting/SET_MEETING',
    SET_MEETING_GROUP_LIST_INFO = 'meeting/SET_MEETING_GROUP_LIST_INFO',
    ADD_NEXT_MEETING_GROUP_LIST_INFO = 'meeting/ADD_NEXT_MEETING_GROUP_LIST_INFO',
    INIT_MEETING_GROUP_LIST = 'meeting/INIT_MEETING_GROUP_LIST',
    CHANGE_MEETING_APPLICATIONS_STATUS = 'meeting/CHANGE_MEETING_APPLICATIONS_STATUS',
}
