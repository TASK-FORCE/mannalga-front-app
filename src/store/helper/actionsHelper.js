import store from '@/store';
import { COMMON, UPLOAD_TEMP_IMAGE } from '@/store/type/common_type.js';
import {
    POST_REGISTER,
    REQUEST_CHANGE_USER_INTEREST,
    REQUEST_CHANGE_USER_REGIONS,
    REQUEST_KAKAO_PROFILE,
    REQUEST_REGISTER_STATUS,
    REQUEST_USER_INTERESTS,
    REQUEST_USER_PROFILE,
    REQUEST_USER_REGIONS,
    USER,
} from '@/store/type/user_type.js';
import { AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { CLUB_LIST_MODULE, REQUEST_FIRST_CLUB_LIST, REQUEST_FIRST_MY_CLUB_LIST, REQUEST_NEXT_CLUB_LIST, REQUEST_NEXT_MY_CLUB_LIST } from '@/store/type/club_list_type.js';
import { CLUB, REQUEST_CLUB_BOARD_CREATE, REQUEST_CLUB_CREATE, REQUEST_CLUB_DATA, REQUEST_CLUB_JOIN } from '@/store/type/club_type.js';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';

const actionsHelper = {
    // auth module
    requestKakaoTokenByCode: (payload) => dispatch(AUTH, REQUEST_KAKAO_TOKEN_BY_CODE, payload),

    // club module
    requestClubCreate: (payload) => dispatch(CLUB, REQUEST_CLUB_CREATE, payload),
    requestClubData: (payload) => dispatch(CLUB, REQUEST_CLUB_DATA, payload),
    requestClubJoin: (payload) => dispatch(CLUB, REQUEST_CLUB_JOIN, payload),
    requestClubCreateBoard: (payload) => dispatch(CLUB, REQUEST_CLUB_BOARD_CREATE, payload),

    // clubList module
    requestFirstClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_FIRST_CLUB_LIST, payload),
    requestNextClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_NEXT_CLUB_LIST, payload),

    requestFirstMyClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_FIRST_MY_CLUB_LIST, payload),
    requestNextMyClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_NEXT_MY_CLUB_LIST, payload),

    // common module
    uploadTempImage: (payload) => dispatch(COMMON, UPLOAD_TEMP_IMAGE, payload),

    // template module

    // user module
    requestKakaoProfile: (payload) => dispatch(USER, REQUEST_KAKAO_PROFILE, payload),
    postRegister: (payload) => dispatch(USER, POST_REGISTER, payload),
    requestRegisterStatus: (payload) => dispatch(USER, REQUEST_REGISTER_STATUS, payload),
    requestUserProfile: (payload) => dispatch(USER, REQUEST_USER_PROFILE, payload),
    requestUserRegions: (payload) => dispatch(USER, REQUEST_USER_REGIONS, payload),
    requestUserInterests: (payload) => dispatch(USER, REQUEST_USER_INTERESTS, payload),
    requestChangeUserRegions: (payload) => dispatch(USER, REQUEST_CHANGE_USER_REGIONS, payload),
    requestChangeUserInterests: (payload) => dispatch(USER, REQUEST_CHANGE_USER_INTEREST, payload),
};

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

export { actionsHelper };
