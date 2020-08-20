import { requestKakaoToken, saveKakaoTokenAndGetAppToken } from '@/apis/login.js';
import { getAccessToken, removeAppTokenToLocalStorage, saveAppTokenToLocalStorage } from '@/utils/authUtils.js';
import { APP_TOKEN, REMOVE_APP_TOKEN, REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, REQUEST_KAKAO_TOKEN_BY_CODE, SET_APP_TOKEN } from '@/store/type/auth_type.js';

const state = {
    [APP_TOKEN]: getAccessToken(),
};

const getters = {};

const mutations = {
    [SET_APP_TOKEN](state, appToken) {
        state[APP_TOKEN] = appToken;
        saveAppTokenToLocalStorage(appToken);
    },
    [REMOVE_APP_TOKEN](state) {
        state[APP_TOKEN] = '';
        removeAppTokenToLocalStorage();
    },
};

const actions = {
    async [REQUEST_KAKAO_TOKEN_BY_CODE]({ dispatch }, code) {
        try {
            const response = await requestKakaoToken(code);
            const kakaoTokenInfo = response.data;
            return dispatch(REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, kakaoTokenInfo);
        } catch (e) {
            console.warn(e);
            return e;
        }
    },
    async [REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }, kakaoTokenInfo) {
        try {
            const response = await saveKakaoTokenAndGetAppToken(kakaoTokenInfo);
            const { appToken, isFirst } = response.data;
            commit(SET_APP_TOKEN, appToken);
            return isFirst;
        } catch (e) {
            console.warn(e);
            commit(REMOVE_APP_TOKEN);
            return e;
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
