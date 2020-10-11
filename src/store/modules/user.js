import { postRegister, requestProfile, requestRegisterStatus } from '@/apis/user.js';
import {
    ADD_SELECTED_INTEREST_SEQS,
    ADD_SELECTED_REGIONS,
    CHANGE_PROFILE_NAME,
    DEFAULT_PROFILE,
    POST_REGISTER,
    PROFILE,
    REMOVE_SELECTED_INTEREST_SEQS,
    REQUEST_PROFILE,
    REQUEST_REGISTER_STATUS,
    SELECTED_INTEREST_SEQS,
    SELECTED_REGIONS,
    SET_PROFILE,
} from '@/store/type/user_type.js';
import { userBuilder } from '@/utils/builder/builder.js';
import { actionsLoadingTemplate } from '@/store/helper/actionsTemplate.js';
import { extractResponseData } from '@/store/helper/vuexUtils.js';

const state = {
    [PROFILE]: DEFAULT_PROFILE,
    [SELECTED_REGIONS]: {},
    [SELECTED_INTEREST_SEQS]: [],
};

const getters = {
    [PROFILE](state) {
        return state[PROFILE];
    },
    [SELECTED_REGIONS](state) {
        return state[SELECTED_REGIONS];
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
    [ADD_SELECTED_REGIONS](state, selectedRegion) {
        const { priority, value } = selectedRegion;
        state[SELECTED_REGIONS][priority] = value;
    },
    [REMOVE_SELECTED_INTEREST_SEQS](state, index) {
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
            const data = extractResponseData(response);
            const kakaoAccount = data.kakao_account;
            commit(SET_PROFILE, userBuilder.buildProfile(kakaoAccount));
        });
    },
    async [POST_REGISTER]({ commit }, registerRequestDto) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await postRegister(registerRequestDto);
            return response.status === 200 ? Promise.resolve() : Promise.reject();
        });
    },
    async [REQUEST_REGISTER_STATUS]({ commit }, appToken) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await requestRegisterStatus(appToken);
            const data = extractResponseData(response);
            return data.isRegistered;
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
