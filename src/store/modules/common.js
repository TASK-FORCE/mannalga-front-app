const state = {
    loading: false,
};

const getters = {
    isLoading(state) {
        return state.loading;
    },
};

const mutations = {
    changeLoading(state, value) {
        state.loading = !!value;
    },
};

const actions = {
    startLoading({ commit }) {
        commit('changeLoading', true);
    },
    endLoading({ commit }) {
        commit('changeLoading', false);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
