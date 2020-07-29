import { requestKakaoToken, saveKakaTokenAndGetAppToken } from '@/apis/login.js';

const state = {
    accessToken: '',
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
};

const actions = {
    async requestKakaoTokenByCode({ dispatch }, code) {
        try {
            const result = await requestKakaoToken(code);
            const kakaoTokenInfo = result.data;
            return dispatch('requestAppTokenByKakaoToken', kakaoTokenInfo);
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo) {
        try {
            const result = await saveKakaTokenAndGetAppToken(kakaoTokenInfo);
            const { appToken, isFirstIssue } = result.data;
            commit('setAppToken', appToken);
            return isFirstIssue;
        } catch (e) {
            console.log(e);
            commit('removeAppToken');
            return e;
        }
    },
};

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const saveAppTokenToLocalStorage = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const removeAppTokenToLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export default {
    state,
    getters,
    mutations,
    actions,
};
