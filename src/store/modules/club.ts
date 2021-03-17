import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import clubApi from '@/apis/ClubApi.ts';
import { CLUB_ROLE } from '@/utils/role.js';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes';
import { ClubActionContext } from '@/store/type/actionContextTypes';
import { ClubInfo, ClubListPageTab, ClubUserInfo, ClubUserKickRequest, ClubUserRoleChangeRequest, ClubWriteRequest, ClubWriteRequestWithSeq, CurrentUserInfo } from '@/interfaces/club';

export const state = {
    clubInfo: DefaultBuilder.clubInfo() as ClubInfo,
    currentUserInfo: DefaultBuilder.currentUserInfo() as CurrentUserInfo,
    clubUserList: [] as ClubUserInfo[],
    currentTab: null as ClubListPageTab,
};
export type ClubState = typeof state

export const mutations = {
    [MutationTypes.SET_CLUB_INFO](state: ClubState, clubInfo: ClubInfo) {
        state.clubInfo = clubInfo;
    },
    [MutationTypes.SET_CURRENT_TAB](state: ClubState, tab: ClubListPageTab) {
        state.currentTab = tab;
    },
    [MutationTypes.SET_CURRENT_USER_INFO](state: ClubState, userInfo: ClubUserInfo) {
        const { role, isLiked } = userInfo || {};
        state.currentUserInfo = {
            isMaster: role && !!role.includes(CLUB_ROLE.MASTER),
            isManager: role && !!role.includes(CLUB_ROLE.MANAGER),
            isMember: role && !!role.includes(CLUB_ROLE.MEMBER),
            roles: role,
            isLiked,
        };
    },
    [MutationTypes.SET_CLUB_USER_LIST](state: ClubState, userList: ClubUserInfo[]) {
        state.clubUserList = userList;
    },
    [MutationTypes.CHANGE_USER_ROLE](state: ClubState, { clubUserSeq, role }: ClubUserRoleChangeRequest) {
        state.clubUserList = state.clubUserList
            .map(user => {
                if (user.clubUserSeq === clubUserSeq) {
                    return {
                        ...user,
                        role: [role],
                    };
                }
                return user;
            });
    },
    [MutationTypes.DELETE_USER](state: ClubState, { clubUserSeq }: ClubUserKickRequest) {
        state.clubUserList = state.clubUserList
            .filter(user => user.clubUserSeq !== clubUserSeq);
    },
};
export type ClubMutations = typeof mutations;

export const actions = {
    async [ActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO]({ commit }: ClubActionContext, clubSeq) {
        return actionsNormalTemplate(async () => {
            const { clubInfo, userInfo, userList } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit(MutationTypes.SET_CLUB_INFO, clubInfo);
            commit(MutationTypes.SET_CURRENT_USER_INFO, userInfo);
            commit(MutationTypes.SET_CLUB_USER_LIST, userList);
        });
    },
    async [ActionTypes.REQUEST_CLUB_CREATE]({ commit }: ClubActionContext, clubCreateRequestDto: ClubWriteRequest) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubCreate(clubCreateRequestDto);
            commit(MutationTypes.INIT_CLUB_LIST_AND_PAGE, {}, { root: true });
            commit(MutationTypes.INIT_MY_CLUB_LIST_AND_PAGE, {}, { root: true });
        });
    },
    async [ActionTypes.REQUEST_CLUB_CHANGE]({ commit, dispatch }: ClubActionContext, clubWriteRequestWishSeq: ClubWriteRequestWithSeq) {
        return actionsNormalTemplate(async () => {
            await clubApi.putClubCreate(clubWriteRequestWishSeq);
            commit(MutationTypes.INIT_CLUB_LIST_AND_PAGE, {}, { root: true });
            commit(MutationTypes.INIT_MY_CLUB_LIST_AND_PAGE, {}, { root: true });
            dispatch(ActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO, clubWriteRequestWishSeq.clubSeq);
        });
    },
    async [ActionTypes.REQUEST_CLUB_JOIN]({ commit }: ClubActionContext, clubSeq: number) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubJoin(clubSeq);
            const { clubInfo, userInfo, userList } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit(MutationTypes.SET_CLUB_INFO, clubInfo);
            commit(MutationTypes.SET_CURRENT_USER_INFO, userInfo);
            commit(MutationTypes.SET_CLUB_USER_LIST, userList);
        });
    },
    async [ActionTypes.REQUEST_CHANGE_USER_ROLE]({ commit }: ClubActionContext, clubUserRoleChangeRequest: ClubUserRoleChangeRequest) {
        return actionsNormalTemplate(async () => {
            await clubApi.putUserRole(clubUserRoleChangeRequest);
            commit(MutationTypes.CHANGE_USER_ROLE, clubUserRoleChangeRequest);
        });
    },
    async [ActionTypes.REQUEST_KICK_USER]({ commit }: ClubActionContext, clubUserKickRequest: ClubUserKickRequest) {
        return actionsNormalTemplate(async () => {
            await clubApi.deleteKickUser(clubUserKickRequest);
            commit(MutationTypes.DELETE_USER, clubUserKickRequest);
        });
    },
    async [ActionTypes.REQUEST_CLUB_WITHDRAW]({ commit }: ClubActionContext, clubSeq: number) {
        return actionsNormalTemplate(async () => {
            await clubApi.deleteWithdraw(clubSeq);
        });
    },
};
export type ClubActions = typeof actions;
