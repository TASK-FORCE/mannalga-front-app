import { postRegister, requestProfile } from '@/apis/user.js';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import {
    ADD_SELECTED_LOCATION_SEQS, CHANGE_PROFILE_NAME, DEFAULT_PROFILE, POST_REGISTER, PROFILE,
    REMOVE_SELECTED_LOCATION_SEQS, REQUEST_PROFILE, SELECTED_INTERESTS, SELECTED_LOCATION_SEQS, SET_PROFILE,
} from '@/store/type/user_type.js';

const state = {
    [PROFILE]: DEFAULT_PROFILE,
    [SELECTED_LOCATION_SEQS]: [],
    [SELECTED_INTERESTS]: [],
};

const getters = {
    [PROFILE](state) {
        return state[PROFILE];
    },
    [SELECTED_LOCATION_SEQS](state) {
        return state[SELECTED_LOCATION_SEQS];
    },
    [SELECTED_INTERESTS](state) {
        return state[SELECTED_INTERESTS];
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
};

const actions = {
    async [REQUEST_PROFILE]({ commit }) {
        try {
            commit(`${COMMON}/${CHANGE_LOADING}`, true, { root: true });
            const response = await requestProfile();
            const { profile } = response.data;
            commit(SET_PROFILE, profile);
        } catch (e) {
            console.warn(e);
            throw e;
        } finally {
            commit(`${COMMON}/${CHANGE_LOADING}`, false, { root: true });
        }
    },
    async [POST_REGISTER]({ commit }, registerInfo) {
        try {
            commit(`${COMMON}/${CHANGE_LOADING}`, true, { root: true });
            const response = await postRegister(registerInfo);
            const { success } = response.data;
            return success ? Promise.resolve() : Promise.reject();
        } catch (e) {
            console.warn(e);
            return Promise.reject();
        } finally {
            commit(`${COMMON}/${CHANGE_LOADING}`, false, { root: true });
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
