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
            const response = await requestLocationTemplate();
            const { data } = response;
            commit('setLocationTemplate', data.locationTemplate);
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
