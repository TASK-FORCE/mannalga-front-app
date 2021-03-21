import { CommitOptions, DispatchOptions, Store } from 'vuex';
import { UIActions, UIMutations, UIState } from '@/store/modules/ui';
import { ClubActions, ClubMutations, ClubState } from '@/store/modules/club';
import { ClubListActions, ClubListMutations, ClubListState } from '@/store/modules/clubList';
import { UserActions, UserMutations, UserState } from '@/store/modules/user';
import { AuthActions, AuthGetters, AuthMutations, AuthState } from '@/store/modules/auth';
import { AlbumActions, AlbumMutations, AlbumState } from '@/store/modules/album';
import { BoardActions, BoardMutations, BoardState } from '@/store/modules/board';

export type RootState = {
    ui: UIState;
    club: ClubState;
    clubList: ClubListState;
    user: UserState;
    auth: AuthState;
    album: AlbumState;
    board: BoardState;
}

export type MergedGetters = AuthGetters

export type MergedMutations =
    UIMutations & ClubMutations & ClubListMutations &
    UserMutations & AuthMutations & AlbumMutations &
    BoardMutations & {
    [key: string]: any
}
export type MergedActions =
    UIActions & ClubActions & ClubListActions &
    UserActions & AuthActions & AlbumActions &
    BoardActions & {
    [key: string]: any
}

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
