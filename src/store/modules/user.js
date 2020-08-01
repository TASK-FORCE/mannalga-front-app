import { postRegister, requestProfile } from '@/apis/user.js';

const state = {
    profile: {
        name: '',
        gender: '',
        dayOfBirth: '',
        img: '',
    },
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
    changeName(state, name) {
        state.profile.name = name;
    },
    changeSelectedLocations(state, { mainLocationId, subLocationId }) {
        const lengthBeforeFilter = state.selectedLocations.length;
        state.selectedLocations = state.selectedLocations.filter(ids => ids.mainLocationId !== mainLocationId || ids.subLocationId !== subLocationId);
        const lengthAfterFilter = state.selectedLocations.length;
        if (lengthBeforeFilter === lengthAfterFilter) {
            state.selectedLocations.unshift({ mainLocationId, subLocationId });
        }
        state.selectedLocations = state.selectedLocations.filter((_, index) => index < 3);
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
