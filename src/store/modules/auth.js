import { requestKakaoToken, saveKakaoTokenAndGetAppToken } from '@/apis/login.js';
import { getAccessToken, removeAppTokenToLocalStorage, saveAppTokenToLocalStorage } from '@/utils/authUtils.js';

const state = {
    accessToken: getAccessToken(),
};

const getters = {
    isAuth(state) {
        return !!state.accessToken;
    },
};

const mutations = {
    setAppToken(state, { accessToken, refreshToken }) {
        state.accessToken = accessToken;
        saveAppTokenToLocalStorage(accessToken, refreshToken);
    },
    removeAppToken(state) {
        state.accessToken = '';
        removeAppTokenToLocalStorage();
    },
    validationFail(state) {
        state.validationFail = true;
    },
};

const actions = {
    async requestKakaoTokenByCode({ dispatch }, code) {
        try {
            const response = await requestKakaoToken(code);
            const kakaoTokenInfo = response.data;
            return dispatch('requestAppTokenByKakaoToken', kakaoTokenInfo);
        } catch (e) {
            console.warn(e);
            return e;
        }
    },
    async requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo) {
        try {
            const response = await saveKakaoTokenAndGetAppToken(kakaoTokenInfo);
            const { appToken, isFirstIssue } = response.data;
            commit('setAppToken', appToken);
            return isFirstIssue;
        } catch (e) {
            console.warn(e);
            commit('removeAppToken');
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
