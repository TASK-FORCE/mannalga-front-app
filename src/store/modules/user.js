import { postRegister, requestProfile } from '@/apis/user.js';

const state = {
    profile: {},
    selectedLocations: [],
    selectedInterests: [],
};

const getters = {
    profile(state) {
        return state.profile;
    },
    selectedLocations(state) {
        return state.selectedLocations;
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
    removeSelectedLocations(state, index) {
        state.selectedLocations.splice(index, 1);
    },
    addSelectedLocations(state, targetLocations) {
        state.selectedLocations.push(targetLocations);
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
