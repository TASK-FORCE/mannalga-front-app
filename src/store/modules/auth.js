import axios from 'axios';
import authApi from '@/apis/AuthApi.js';
import { getAppToken, removeAppTokenToLocalStorage, saveAppTokenToLocalStorage, setAppTokenAsDefaultHeader } from '@/utils/auth/authUtils.js';
import _ from '@/utils/common/lodashWrapper.js';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    appToken: getAppToken(),
};

const getters = {
    hasToken(state) {
        return _.isNotEmpty(state.appToken);
    },
    appToken(state) {
        return state.appToken;
    },
};

const mutations = {
    setAppToken(state, appToken) {
        state.appToken = appToken;
        saveAppTokenToLocalStorage(appToken);
        setAppTokenAsDefaultHeader(axios.defaults.headers);
    },
    removeAppToken(state) {
        state.appToken = '';
        removeAppTokenToLocalStorage();
    },
};

const actions = {
    async requestKakaoTokenByCode({ dispatch }, code) {
        return actionsNormalTemplate(async () => {
            const requestParam = RequestConverter.convertKakaoTokenCode(code);
            const kakaoTokenInfo = await authApi.postKakaoTokenToKakaoServer(requestParam);
            return dispatch('requestAppTokenByKakaoToken', kakaoTokenInfo);
        });
    },
    async requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo) {
        return actionsNormalTemplate(
            async () => {
                const requestParam = RequestConverter.convertKakaoTokenInfo(kakaoTokenInfo);
                const { appToken, isRegistered } = await authApi.postSaveKakaoToken(requestParam);
                commit('setAppToken', appToken);
                return isRegistered;
            },
            () => commit('removeAppToken'),
        );
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
