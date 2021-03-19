import axios from 'axios';
import authApi from '@/apis/AuthApi.ts';
import { AuthUtils } from '@/utils/auth.js';
import _ from '@/utils/common/lodashWrapper.js';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import RequestConverter from '@/store/converter/RequestConverter.ts';
import { AuthMutationTypes } from '@/store/type/mutationTypes';
import { AuthActionTypes } from '@/store/type/actionTypes';
import { AuthActionContext } from '@/store/type/actionContextTypes';
import { KakaoTokenResponse } from '@/interfaces/auth';

export const state = {
    appToken: AuthUtils.getAppToken() as string,
};
export type AuthState = typeof state;

export const getters = {
    hasToken(state): boolean {
        return _.isNotEmpty(state.appToken);
    },
};

export type AuthGetters = typeof getters;

export const mutations = {
    [AuthMutationTypes.SET_APP_TOKEN](state: AuthState, appToken: string) {
        state.appToken = appToken;
        AuthUtils.saveAppTokenToLocalStorage(appToken);
        AuthUtils.setAppTokenAsDefaultHeader(axios.defaults.headers);
    },
    [AuthMutationTypes.REMOVE_APP_TOKEN](state: AuthState) {
        state.appToken = '';
        AuthUtils.removeAppTokenToLocalStorage();
    },
};
export type AuthMutations = typeof mutations;

export const actions = {
    async [AuthActionTypes.REQUEST_KAKAO_TOKEN_BY_CODE]({ dispatch }: AuthActionContext, code: string): Promise<boolean> {
        return actionsNormalTemplate(async () => {
            const kakaoTokenRequest = RequestConverter.convertKakaoTokenCode(code);
            const kakaoTokenResponse = await authApi.postKakaoTokenToKakaoServer(kakaoTokenRequest);
            return dispatch(AuthActionTypes.REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, kakaoTokenResponse);
        });
    },
    async [AuthActionTypes.REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }: AuthActionContext, kakaoTokenResponse: KakaoTokenResponse): Promise<boolean> {
        return actionsNormalTemplate(
            async () => {
                const serverTokenRequest = RequestConverter.convertKakaoTokenInfo(kakaoTokenResponse);
                const { appToken, isRegistered } = await authApi.postSaveKakaoToken(serverTokenRequest);
                commit(AuthMutationTypes.SET_APP_TOKEN, appToken);
                return isRegistered;
            },
            () => commit(AuthMutationTypes.REMOVE_APP_TOKEN),
        );
    },
};
export type AuthActions = typeof actions;
