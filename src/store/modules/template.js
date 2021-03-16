import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import templateApi from '@/apis/TemplateApi.js';

const state = {
    rootRegions: [],
    rootInterests: [],
};

const getters = {
    rootRegions: (state) => state.rootRegions,
    rootInterests: (state) => state.rootInterests,
};

const mutations = {
    setRegionTemplate(state, rootRegions) {
        state.rootRegions = rootRegions;
    },
    setInterestTemplate(state, rootInterests) {
        state.rootInterests = rootInterests;
    },
};

const actions = {
    async requestRegionTemplate({ commit }) {
        return actionsNormalTemplate(async () => {
            const rootRegions = await templateApi.getRegionTemplate();
            commit('setRegionTemplate', rootRegions);
        });
    },
    async requestInterestTemplate({ commit }) {
        return actionsNormalTemplate(async () => {
            const interests = await templateApi.getInterestTemplate();
            commit('setInterestTemplate', interests);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
