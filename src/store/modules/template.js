import { requestInterestTemplate, requestRegionTemplate } from '@/apis/template.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_REGION_TEMPLATE, ROOT_INTERESTS, ROOT_REGIONS, SET_INTEREST_TEMPLATE, SET_REGION_TEMPLATE } from '@/store/type/template_type.js';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import { extractResponseData } from '@/store/utils/vuexUtils.js';

const state = {
    [ROOT_REGIONS]: [],
    [ROOT_INTERESTS]: [],
};

const getters = {
    [ROOT_REGIONS](state) {
        return state[ROOT_REGIONS];
    },
    [ROOT_INTERESTS](state) {
        return state[ROOT_INTERESTS];
    },
};

const mutations = {
    [SET_REGION_TEMPLATE](state, rootRegions) {
        state[ROOT_REGIONS] = rootRegions;
    },
    [SET_INTEREST_TEMPLATE](state, rootInterests) {
        state[ROOT_INTERESTS] = rootInterests;
    },
};

const actions = {
    async [REQUEST_REGION_TEMPLATE]({ commit }) {
        return actionsNormalTemplate(async () => {
            const response = await requestRegionTemplate();
            const rootRegions = extractResponseData(response);
            commit(SET_REGION_TEMPLATE, rootRegions);
        });
    },
    async [REQUEST_INTEREST_TEMPLATE]({ commit }) {
        return actionsNormalTemplate(async () => {
            const response = await requestInterestTemplate();
            const interests = extractResponseData(response);
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
