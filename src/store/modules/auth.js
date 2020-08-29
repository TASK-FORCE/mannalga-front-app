import axios from 'axios';
import { requestKakaoToken, saveKakaoTokenAndGetAppToken } from '@/apis/login.js';
import { getAppToken, removeAppTokenToLocalStorage, saveAppTokenToLocalStorage, setAppTokenAsDefaultHeader } from '@/utils/authUtils.js';
import { APP_TOKEN, IS_AUTH, REMOVE_APP_TOKEN, REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, REQUEST_KAKAO_TOKEN_BY_CODE, SET_APP_TOKEN } from '@/store/type/auth_type.js';
import _ from '@/utils/lodashWrapper.js';
import { actionsNormalTemplate } from '@/store/helper/helper.js';

const state = {
    [APP_TOKEN]: getAppToken(),
};

const getters = {
    [IS_AUTH](state) {
        return _.isNotEmpty(state[APP_TOKEN]);
    },
    [APP_TOKEN](state) {
        return state[APP_TOKEN];
    },
};

const mutations = {
    [SET_APP_TOKEN](state, appToken) {
        state[APP_TOKEN] = appToken;
        saveAppTokenToLocalStorage(appToken);
        setAppTokenAsDefaultHeader(axios.defaults.headers);
    },
    [REMOVE_APP_TOKEN](state) {
        state[APP_TOKEN] = '';
        removeAppTokenToLocalStorage();
    },
};

const actions = {
    async [REQUEST_KAKAO_TOKEN_BY_CODE]({ dispatch }, code) {
        actionsNormalTemplate(async () => {
            const response = await requestKakaoToken(code);
            const kakaoTokenInfo = response.data;
            return dispatch(REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, kakaoTokenInfo);
        });
    },
    async [REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }, kakaoTokenInfo) {
        return actionsNormalTemplate(
            async () => {
                const response = await saveKakaoTokenAndGetAppToken(kakaoTokenInfo);
                const { appToken, isRegistered } = response.data;
                commit(SET_APP_TOKEN, appToken);
                return isRegistered;
            },
            () => commit(REMOVE_APP_TOKEN),
        );
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
