import { requestKakaoToken, saveKakaoTokenAndGetAppToken } from '@/apis/login.js';
import { getAccessToken, removeAppTokenToLocalStorage, saveAppTokenToLocalStorage } from '@/utils/authUtils.js';
import { REMOVE_APP_TOKEN, REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, REQUEST_KAKAO_TOKEN_BY_CODE, SET_APP_TOKEN } from '@/store/type/auth_type.js';

const state = {
    accessToken: getAccessToken(),
};

const getters = {};

const mutations = {
    [SET_APP_TOKEN](state, { accessToken, refreshToken }) {
        state.accessToken = accessToken;
        saveAppTokenToLocalStorage(accessToken, refreshToken);
    },
    [REMOVE_APP_TOKEN](state) {
        state.accessToken = '';
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
            const { appToken, isFirstIssue } = response.data;
            commit(SET_APP_TOKEN, appToken);
            return isFirstIssue;
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
