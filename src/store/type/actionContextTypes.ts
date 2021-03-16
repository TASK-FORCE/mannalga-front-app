import { ActionContext } from 'vuex';
import { MergedMutations, RootState } from '@/store/type/types';
import { CommonState } from '@/store/modules/common';

export type CommonActionContext = {
    commit<K extends keyof MergedMutations>(
        key: K,
        payload: Parameters<MergedMutations[K]>[1]
    ): ReturnType<MergedMutations[K]>;
} & Omit<ActionContext<CommonState, RootState>, 'commit'>
