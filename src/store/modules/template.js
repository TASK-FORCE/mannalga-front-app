import { requestLocationTemplate } from '@/apis/template.js';

const state = {
    locationTemplate: [],
};

const getters = {
    locationTemplate(state) {
        return state.locationTemplate;
    },
};

const mutations = {
    setLocationTemplate(state, locationTemplate) {
        state.locationTemplate = locationTemplate;
    },
};

const actions = {
    async requestLocationTemplate({ commit }) {
        try {
            commit('common/changeLoading', true, { root: true });
            const response = await requestLocationTemplate();
            const { data } = response;
            commit('setLocationTemplate', data.locationTemplate);
        } catch (e) {
            console.warn(e);
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
