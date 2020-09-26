import { requestInterestTemplate, requestLocationTemplate } from '@/apis/template.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_LOCATION_TEMPLATE, ROOT_INTERESTS, ROOT_LOCATIONS, SET_INTEREST_TEMPLATE, SET_LOCATION_TEMPLATE } from '@/store/type/template_type.js';
import { actionsNormalTemplate } from '@/store/helper/actionsTemplate.js';

const state = {
    [ROOT_LOCATIONS]: [],
    [ROOT_INTERESTS]: [],
};

const getters = {
    [ROOT_LOCATIONS](state) {
        return state[ROOT_LOCATIONS];
    },
    [ROOT_INTERESTS](state) {
        return state[ROOT_INTERESTS];
    },
};

const mutations = {
    [SET_LOCATION_TEMPLATE](state, rootStates) {
        state[ROOT_LOCATIONS] = rootStates;
    },
    [SET_INTEREST_TEMPLATE](state, rootInterests) {
        state[ROOT_INTERESTS] = rootInterests;
    },
};

const actions = {
    async [REQUEST_LOCATION_TEMPLATE]({ commit }) {
        return actionsNormalTemplate(async () => {
            const response = await requestLocationTemplate();
            const rootStates = response.data;
            commit(SET_LOCATION_TEMPLATE, rootStates);
        });
    },
    async [REQUEST_INTEREST_TEMPLATE]({ commit }) {
        return actionsNormalTemplate(async () => {
            const response = await requestInterestTemplate();
            const interests = response.data;
            commit(SET_INTEREST_TEMPLATE, interests);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
