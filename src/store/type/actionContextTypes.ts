import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';
import { MergedActions, MergedMutations, RootState } from '@/store/type/types';
import { CommonState } from '@/store/modules/common';
import { ClubState } from '@/store/modules/club';
import { ClubListState } from '@/store/modules/clubList';
import { UserState } from '@/store/modules/user';
import { AuthState } from '@/store/modules/auth';
import { AlbumState } from '@/store/modules/album';
import { BoardState } from '@/store/modules/board';

export type CommonActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<CommonState, RootState>, 'commit' | 'dispatch'>

export type ClubActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<ClubState, RootState>, 'commit' | 'dispatch'>

export type ClubListActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<ClubListState, RootState>, 'commit' | 'dispatch'>

export type UserActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit' | 'dispatch'>

export type AuthActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<AuthState, RootState>, 'commit' | 'dispatch'>

export type AlbumActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<AlbumState, RootState>, 'commit' | 'dispatch'>

export type BoardActionContext = {
    commit<K extends keyof MergedMutations, P extends Parameters<MergedMutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<MergedMutations[K]>;
    dispatch<K extends keyof MergedActions>(
        key: K,
        payload?: Parameters<MergedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<MergedActions[K]>;
} & Omit<ActionContext<BoardState, RootState>, 'commit' | 'dispatch'>
