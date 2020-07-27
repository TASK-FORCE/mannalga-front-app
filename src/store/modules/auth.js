import { requestKakaoToken, saveKakaTokenAndGetAppToken } from '../../apis/login.js';
import router from '../../router';
import { KAKAO } from '../../utils/kakao/utlls.js';

const state = {
    token: '',
};

const getters = {
    hasToken(state) {
        return state && state.length > 0;
    },
};

const mutations = {};

const actions = {
    async requestKakaoToken({ dispatch }, code) {
        try {
            const result = await requestKakaoToken(code);
            const tokenInfo = result.data;
            saveKakaoTokenToLocalStorage(tokenInfo);
            dispatch('saveKakaoToken', tokenInfo);
        } catch (e) {
            await router.push('/login');
        }
    },
    async saveKakaoToken(_, tokenInfo) {
        try {
            const result = await saveKakaTokenAndGetAppToken(tokenInfo);
            const appToken = result.data;
            console.log(appToken);
            saveAppTokenToLocalStorage(appToken);
            removeKakaoTokenInLocalStorage();

            // Check: 토큰 정보를 받을 떄 처음 로그인한 회원인지에 확인필요
            await router.push('/register');
        } catch (e) {
            await router.push('/login');
        }
    },
};

// eslint-disable-next-line camelcase
function saveKakaoTokenToLocalStorage({ access_token, refresh_token }) {
    localStorage.setItem(KAKAO.ACCESS_TOKEN, access_token);
    localStorage.setItem(KAKAO.REFRESH_TOKEN, refresh_token);
}

function removeKakaoTokenInLocalStorage() {
    localStorage.removeItem(KAKAO.ACCESS_TOKEN);
    localStorage.removeItem(KAKAO.REFRESH_TOKEN);
}

function saveAppTokenToLocalStorage({ accessToken, refreshToken }) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export default {
    state,
    getters,
    mutations,
    actions,
};
