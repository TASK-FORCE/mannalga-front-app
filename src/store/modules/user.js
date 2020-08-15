import { postRegister, requestProfile } from '@/apis/user.js';
import { DEFAULT_PROFILE } from '@/store/type.js';

const state = {
    profile: DEFAULT_PROFILE,
    selectedLocationSeqs: [],
    selectedInterests: [],
};

const getters = {
    profile(state) {
        return state.profile;
    },
    selectedLocationSeqs(state) {
        return state.selectedLocationSeqs;
    },
    selectedInterests(state) {
        return state.selectedInterests;
    },
};

const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
    },
    changeProfileName(state, name) {
        state.profile.name = name;
    },
    removeSelectedLocationSeq(state, index) {
        state.selectedLocationSeqs.splice(index, 1);
    },
    addSelectedLocationSeqs(state, stateNameWithRoot) {
        state.selectedLocationSeqs.push(stateNameWithRoot);
    },
};

const actions = {
    async requestProfile({ commit }) {
        try {
            commit('common/changeLoading', true, { root: true });
            const response = await requestProfile();
            const { profile } = response.data;
            commit('setProfile', profile);
        } catch (e) {
            console.warn(e);
            throw e;
        } finally {
            commit('common/changeLoading', false, { root: true });
        }
    },
    async postRegister({ commit }, registerInfo) {
        try {
            commit('common/changeLoading', true, { root: true });
            const response = await postRegister(registerInfo);
            const { success } = response.data;
            return success ? Promise.resolve() : Promise.reject();
        } catch (e) {
            console.warn(e);
            return Promise.reject();
        } finally {
            commit('common/changeLoading', false, { root: true });
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
