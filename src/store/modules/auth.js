import { requestKakaoToken, saveKakaTokenAndGetAppToken } from '../../apis/login.js';
import router from '../../router';

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
};

const actions = {
    async requestKakaoTokenByCode({ dispatch }, code) {
        try {
            const result = await requestKakaoToken(code);
            const kakaoTokenInfo = result.data;
            dispatch('requestAppTokenByKakaoToken', kakaoTokenInfo);
        } catch (e) {
            router.push('/login');
        }
    },
    async requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo) {
        try {
            const result = await saveKakaTokenAndGetAppToken(kakaoTokenInfo);
            const { appToken, isFirstIssue } = result.data;
            commit('setAppToken', appToken);
            if (isFirstIssue) {
                router.push('/register');
            } else {
                router.push('/main');
            }
        } catch (e) {
            router.push('/login');
        }
    },
};

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

function saveAppTokenToLocalStorage(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

export default {
    state,
    getters,
    mutations,
    actions,
};
