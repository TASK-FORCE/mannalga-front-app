import { requestLocationTemplate } from '@/apis/template.js';

const state = {
    /**
     * @field level: int
     * @field name: str
     * @field subStates: []
     * @field superStateRoot: str
     */
    rootStates: [],
};

const getters = {
    rootStates(state) {
        return state.rootStates;
    },
};

const mutations = {
    setLocationTemplate(state, rootStates) {
        state.rootStates = rootStates;
    },
};

const actions = {
    async requestStates({ commit }) {
        try {
            commit('common/changeLoading', true, { root: true });
            const response = await requestLocationTemplate();
            const rootStates = response.data;
            commit('setLocationTemplate', rootStates);
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
