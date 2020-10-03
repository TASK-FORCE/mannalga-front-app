import store from '@/store';
import { COMMON, UPLOAD_TEMP_IMAGE } from '@/store/type/common_type.js';
import { POST_REGISTER, REQUEST_PROFILE, REQUEST_REGISTER_STATUS, USER } from '@/store/type/user_type.js';
import { AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { CLUB_LIST_MODULE, REQUEST_FIRST_CLUB_LIST, REQUEST_NEXT_CLUB_LIST } from '@/store/type/club_list_type.js';
import { CLUB, REQUEST_CLUB_CREATE } from '@/store/type/club_type.js';
import { combineWithModuleName } from '@/store/helper/vuexUtils.js';

const actionsHelper = {
    uploadTempImage: (payload) => dispatch(COMMON, UPLOAD_TEMP_IMAGE, payload),

    requestProfile: (payload) => dispatch(USER, REQUEST_PROFILE, payload),
    postRegister: (payload) => dispatch(USER, POST_REGISTER, payload),
    requestRegisterStatus: (payload) => dispatch(USER, REQUEST_REGISTER_STATUS, payload),

    requestKakaoTokenByCode: (payload) => dispatch(AUTH, REQUEST_KAKAO_TOKEN_BY_CODE, payload),

    requestClubCreate: (payload) => dispatch(CLUB, REQUEST_CLUB_CREATE, payload),

    requestFirstClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_FIRST_CLUB_LIST, payload),
    requestNextClubList: (payload) => dispatch(CLUB_LIST_MODULE, REQUEST_NEXT_CLUB_LIST, payload),
};

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

export { actionsHelper };
