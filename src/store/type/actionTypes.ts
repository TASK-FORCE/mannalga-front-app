export enum UIActionTypes {
  UPLOAD_TEMP_IMAGE = 'common/uploadTempImage',
}

export enum ClubActionTypes {
  REQUEST_CLUB_INFO_AND_USER_INFO = 'club/requestClubInfoAndUserInfo',
  REQUEST_CLUB_CREATE = 'club/requestClubCreate',
  REQUEST_CLUB_CHANGE = 'club/requestClubChange',
  REQUEST_CLUB_JOIN = 'club/requestClubJoin',
  REQUEST_CHANGE_USER_ROLE = 'club/requestChangeUserRole',
  REQUEST_KICK_USER = 'club/requestKickUser',
  REQUEST_CLUB_WITHDRAW = 'club/requestClubWithdraw',
  REQUEST_CLUB_DELETE = 'club/requestClubDelete',
}

export enum ClubListActionTypes {
  REQUEST_FIRST_CLUB_LIST = 'clubList/requestFirstClubList',
  REQUEST_NEXT_CLUB_LIST = 'clubList/requestNextClubList',
  REQUEST_FIRST_MY_CLUB_LIST = 'clubList/requestFirstMyClubList',
  REQUEST_NEXT_MY_CLUB_LIST = 'clubList/requestNextMyClubList',
}

export enum UserActionTypes {
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

export enum AuthActionTypes {
  REQUEST_KAKAO_TOKEN_BY_CODE = 'auth/requestKakaoTokenByCode',
  REQUEST_APP_TOKEN_BY_KAKAO_TOKEN = 'auth/requestAppTokenByKakaoToken',
}


export enum AlbumActionTypes {
  REQUEST_ALBUM_CREATE = 'album/requestAlbumCreate',
  REQUEST_ALBUM = 'album/requestAlbum',
  REQUEST_FIRST_ALBUM_LIST = 'album/requestFirstAlbumList',
  REQUEST_NEXT_ALBUM_LIST = 'album/requestNextAlbumList',
  REQUEST_ALBUM_COMMENT_WRITE = 'album/requestAlbumCommentWrite',
  REQUEST_ALBUM_COMMENT_EDIT = 'album/requestAlbumCommentEdit',
  REQUEST_ALBUM_COMMENT_DELETE = 'album/requestAlbumCommentDelete',
  REQUEST_FIRST_ALBUM_COMMENT_LIST = 'album/requestFirstAlbumCommentList',
  REQUEST_NEXT_ALBUM_COMMENT_LIST = 'album/requestNextAlbumCommentList',
  REQUEST_ALL_ALBUM_COMMENT_LIST_WITH_PAGING = 'album/requestAllAlbumCommentListWithPaging',
  REQUEST_ALL_ALBUM_SUB_COMMENT_LIST = 'album/requestAllAlbumSubCommentList',
  REQUEST_APPLY_LIKE_CLUB_ALBUM = 'album/requestApplyLikeClubAlbum',
  REQUEST_DELETE_LIKE_CLUB_ALBUM = 'album/requestDeleteLikeClubAlbum',
}

export enum BoardActionTypes {
  REQUEST_CLUB_BOARD_CREATE = 'board/requestClubBoardCreate',
  REQUEST_CLUB_BOARD_EDIT = 'board/requestClubBoardEdit',
  REQUEST_FIRST_BOARD_LIST = 'board/requestFirstBoardList',
  REQUEST_NEXT_BOARD_LIST = 'board/requestNextBoardList',
  REQUEST_BOARD = 'board/requestBoard',
  REQUEST_FIRST_BOARD_COMMENT_LIST = 'board/requestFirstBoardCommentList',
  REQUEST_NEXT_BOARD_COMMENT_LIST = 'board/requestNextBoardCommentList',
  REQUEST_ALL_BOARD_COMMENT_LIST_WITH_PAGING = 'board/requestAllBoardCommentListWithPaging',
  REQUEST_BOARD_COMMENT_WRITE = 'board/requestBoardCommentWrite',
  REQUEST_BOARD_COMMENT_EDIT = 'board/requestBoardCommentEdit',
  REQUEST_BOARD_COMMENT_DELETE = 'board/requestBoardCommentDELETE',
  REQUEST_ALL_BOARD_SUB_COMMENT_LIST = 'board/requestAllBoardSubCommentList',
  REQUEST_APPLY_LIKE_CLUB_BOARD = 'board/requestApplyLikeClubBoard',
  REQUEST_DELETE_LIKE_CLUB_BOARD = 'board/requestDeleteLikeClubBoard',
}

export enum CommonActionTypes {
  REQUEST_ROOT_REGIONS = 'common/requestRootRegions',
  REQUEST_ROOT_INTERESTS = 'common/requestRootInterests',
}

export enum MeetingActionTypes {
  REQUEST_MEETING_CREATE = 'meeting/ requestMeetingCreate',
  REQUEST_MEETING_EDIT = 'meeting/requestMeetingEdit',
  REQUEST_FIRST_MEETING_GROUP_LIST = 'meeting/requestFirstMeetingGroupList',
  REQUEST_NEXT_MEETING_GROUP_LIST = 'meeting/requestNextMeetingGroupList',
  REQUEST_MEETING = 'meeting/requestMeeting',
  REQUEST_DELETE_MEETING = 'meeting/requestDeleteMeeting',
  REQUEST_MEETING_APPLICATION = 'meeting/requestMeetingApplication',
  REQUEST_CANCEL_MEETING_APPLICATION = 'meeting/requestCancelMeetingApplication',
  REQUEST_MEETING_APPLICATION_STATUS = 'meeting/requestMeetingApplicationStatus',
}
