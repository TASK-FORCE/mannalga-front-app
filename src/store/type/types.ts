import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { CommonActions, CommonMutations, CommonState } from '@/store/modules/common';
import { ClubActions, ClubMutations, ClubState } from '@/store/modules/club';

export type RootState = {
    common: CommonState,
    club: ClubState,
}

type MergedGetters = {}
export type MergedMutations = CommonMutations & ClubMutations
export type MergedActions = CommonActions & ClubActions

type MyGetters = {
    getters: {
        [K in keyof MergedGetters]: ReturnType<MergedGetters[K]>
    }
}
type MyMutations = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
}

type MyActions = {
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>
}


export type MyStore = Omit<Store<RootState>, 'getters' | 'commit' | 'dispatch'> & MyGetters & MyMutations & MyActions;
