import { requestLocationTemplate } from '@/apis/template.js';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import { REQUEST_STATES, SET_LOCATION_TEMPLATE, ROOT_STATES } from '@/store/type/template_type.js';

const state = {
    [ROOT_STATES]: [],
};

const getters = {
    [ROOT_STATES](state) {
        return state[ROOT_STATES];
    },
};

const mutations = {
    [SET_LOCATION_TEMPLATE](state, rootStates) {
        state.rootStates = rootStates;
    },
};

const actions = {
    async [REQUEST_STATES]({ commit }) {
        try {
            commit(`${COMMON}/${CHANGE_LOADING}`, true, { root: true });
            const response = await requestLocationTemplate();
            const rootStates = response.data;
            commit(SET_LOCATION_TEMPLATE, rootStates);
        } catch (e) {
            console.warn(e);
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
