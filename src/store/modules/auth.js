import axios from 'axios';
import authApi from '@/apis/AuthApi.js';
import { AuthUtils } from '@/utils/auth.js';
import _ from '@/utils/common/lodashWrapper.js';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import RequestConverter from '@/store/converter/RequestConverter.ts';

const state = {
    appToken: AuthUtils.getAppToken(),
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
        AuthUtils.saveAppTokenToLocalStorage(appToken);
        AuthUtils.setAppTokenAsDefaultHeader(axios.defaults.headers);
    },
    removeAppToken(state) {
        state.appToken = null;
        AuthUtils.removeAppTokenToLocalStorage();
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
