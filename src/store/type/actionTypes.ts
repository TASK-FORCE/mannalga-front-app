export enum CommonActionTypes {
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
