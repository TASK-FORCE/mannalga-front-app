import store from '@/store';
import _ from '@/utils/lodashWrapper.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_LOCATION_TEMPLATE, TEMPLATE } from '@/store/type/template_type.js';
import { CHANGE_LOADING, COMMON, UPLOAD_TEMP_IMAGE } from '@/store/type/common_type.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { getterHelper } from '@/store/helper/getterHelper.js';
import { POST_REGISTER, REQUEST_PROFILE, REQUEST_REGISTER_STATUS, USER } from '@/store/type/user_type.js';
import { AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { CLUB_LIST_MODULE, REQUEST_FIRST_CLUB_LIST, REQUEST_NEXT_CLUB_LIST } from '@/store/type/club_list_type.js';
import { CLUB, REQUEST_CLUB_CREATE } from '@/store/type/club_type.js';

async function fetchInterestAndLocationTemplate(withLoading, failCallBack) {
    if (!_.isEmpty(getterHelper.rootLocations()) && !_.isEmpty(getterHelper.rootInterests())) {
        return;
    }

    let locationsPromise;
    let interestsPromise;

    if (withLoading) {
        store.commit(`${COMMON}/${CHANGE_LOADING}`, true);
    }

    if (_.isEmpty(getterHelper.rootLocations())) {
        locationsPromise = dispatch(TEMPLATE, REQUEST_LOCATION_TEMPLATE);
    }

    if (_.isEmpty(getterHelper.rootInterests())) {
        interestsPromise = dispatch(TEMPLATE, REQUEST_INTEREST_TEMPLATE);
    }

    try {
        await Promise.all([locationsPromise, interestsPromise]);
    } catch (e) {
        if (failCallBack) {
            failCallBack();
        }
        mutationsHelper.openSnackBar(buildSnackBarOption(MESSAGE.SERVER_INSTABILITY));
    } finally {
        if (withLoading) {
            store.commit(`${COMMON}/${CHANGE_LOADING}`, false);
        }
    }
}

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

const dispatch = (moduleName, actionsName, payload) => store.dispatch(`${moduleName}/${actionsName}`, payload);

export { fetchInterestAndLocationTemplate, actionsHelper };
