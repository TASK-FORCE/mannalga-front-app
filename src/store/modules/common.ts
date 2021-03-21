import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import templateApi from '@/apis/TemplateApi.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes';
import { CommonActionTypes } from '@/store/type/actionTypes';
import { CommonActionContext } from '@/store/type/actionContextTypes';
import { InterestGroupTree, RegionTree } from '@/interfaces/common';

export const state = {
    rootRegions: [] as RegionTree[],
    rootInterests: [] as InterestGroupTree[],
};
export type CommonState = typeof state;

export const mutations = {
    [CommonMutationTypes.SET_ROOT_REGIONS](state: CommonState, rootRegions: RegionTree[]) {
        state.rootRegions = rootRegions;
    },
    [CommonMutationTypes.SET_ROOT_INTERESTS](state: CommonState, rootInterests: InterestGroupTree[]) {
        state.rootInterests = rootInterests;
    },
};
export type CommonMutations = typeof mutations;

export const actions = {
    async [CommonActionTypes.REQUEST_ROOT_REGIONS]({ commit }: CommonActionContext) {
        return actionsNormalTemplate(async () => {
            const rootRegions = await templateApi.getRegionTemplate();
            commit(CommonMutationTypes.SET_ROOT_REGIONS, rootRegions);
        });
    },
    async [CommonActionTypes.REQUEST_ROOT_INTERESTS]({ commit }: CommonActionContext) {
        return actionsNormalTemplate(async () => {
            const interests = await templateApi.getInterestTemplate();
            commit(CommonMutationTypes.SET_ROOT_INTERESTS, interests);
        });
    },
};
export type CommonActions = typeof actions;

