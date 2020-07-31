import { requestProfile } from '@/apis/user.js';

const state = {
    profile: {
        name: '',
        gender: '',
        dayOfBirth: '',
        img: '',
    },
};

const getters = {
    profile(state) {
        return state.profile;
    },
    profileIsEmpty() {
        return true;
    },
};

const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
    },
    changeName(state, name) {
        state.profile.name = name;
    },
};

const actions = {
    async requestProfile({ commit }) {
        try {
            const response = await requestProfile();
            const { profile } = response.data;
            commit('setProfile', profile);
        } catch (e) {
            console.warn(e);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
