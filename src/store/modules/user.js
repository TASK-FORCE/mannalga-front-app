import { postRegister, requestProfile, requestRegisterStatus } from '@/apis/user.js';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import {
    ADD_SELECTED_INTEREST_SEQS,
    ADD_SELECTED_LOCATION_SEQS, CHANGE_PROFILE_NAME, DEFAULT_PROFILE, POST_REGISTER, PROFILE,
    REMOVE_SELECTED_LOCATION_SEQS, REQUEST_PROFILE, REQUEST_REGISTER_STATUS, SELECTED_INTEREST_SEQS, SELECTED_LOCATION_SEQS, SET_PROFILE,
} from '@/store/type/user_type.js';
import { userBuilder } from '@/utils/builder/builder.js';
import { REQUEST_INTEREST_TEMPLATE } from '@/store/type/template_type.js';
import { actionsLoadingTemplate } from '@/store/helper/helper.js';

const state = {
    [PROFILE]: DEFAULT_PROFILE,
    [SELECTED_LOCATION_SEQS]: [],
    [SELECTED_INTEREST_SEQS]: [],
};

const getters = {
    [PROFILE](state) {
        return state[PROFILE];
    },
    [SELECTED_LOCATION_SEQS](state) {
        return state[SELECTED_LOCATION_SEQS];
    },
    [SELECTED_INTEREST_SEQS](state) {
        return state[SELECTED_INTEREST_SEQS];
    },
};

const mutations = {
    [SET_PROFILE](state, profile) {
        state.profile = profile;
    },
    [CHANGE_PROFILE_NAME](state, name) {
        state.profile.name = name;
    },
    [REMOVE_SELECTED_LOCATION_SEQS](state, index) {
        state[SELECTED_LOCATION_SEQS].splice(index, 1);
    },
    [ADD_SELECTED_LOCATION_SEQS](state, stateNameWithRoot) {
        state[SELECTED_LOCATION_SEQS].push(stateNameWithRoot);
    },
    [REQUEST_INTEREST_TEMPLATE](state, index) {
        state[SELECTED_INTEREST_SEQS].splice(index, 1);
    },
    [ADD_SELECTED_INTEREST_SEQS](state, stateNameWithRoot) {
        state[SELECTED_INTEREST_SEQS].push(stateNameWithRoot);
    },
};

const actions = {
    async [REQUEST_PROFILE]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await requestProfile();
            const kakaoAccount = response.data.kakao_account;
            commit(SET_PROFILE, userBuilder.buildProfile(kakaoAccount));
        });
    },
    async [POST_REGISTER]({ commit }, registerRequestDto) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await postRegister(registerRequestDto);
            return response.state === 200 ? Promise.resolve() : Promise.reject();
        });
    },
    async [REQUEST_REGISTER_STATUS]({ commit }, appToken) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await requestRegisterStatus(appToken);
            return response.data.isRegistered;
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
