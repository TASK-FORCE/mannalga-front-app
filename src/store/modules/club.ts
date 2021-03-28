import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import clubApi from '@/apis/ClubApi.ts';
import { ClubRole } from '@/utils/role.ts';
import { ClubListMutationTypes, ClubMutationTypes } from '@/store/type/mutationTypes';
import { ClubActionContext } from '@/store/type/actionContextTypes';
import {
  ClubDetailContext,
  ClubInfo,
  ClubListPageTab,
  ClubUserInfo,
  ClubUserKickRequest,
  ClubUserRoleChangeRequest,
  ClubWriteRequest,
  ClubWriteRequestWithSeq,
  CurrentUserInfo
} from '@/interfaces/club';
import { ClubActionTypes } from '@/store/type/actionTypes';

export const state = {
  clubInfo: DefaultBuilder.clubInfo() as ClubInfo,
  currentUserInfo: DefaultBuilder.currentUserInfo() as CurrentUserInfo,
  clubUserList: [] as ClubUserInfo[],
  currentTab: ClubListPageTab.CLUB as ClubListPageTab,
};
export type ClubState = typeof state

export const mutations = {
  [ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT](state: ClubState, { clubInfo, userInfo, userList }: ClubDetailContext) {
    state.clubInfo = clubInfo;
    state.clubUserList = userList;
    const { role, isLiked, userSeq } = userInfo || {};
    state.currentUserInfo = {
      isMaster: role && !!role.includes(ClubRole.MASTER),
      isManager: role && !!role.includes(ClubRole.MANAGER),
      isMember: role && !!role.includes(ClubRole.MEMBER),
      roles: role,
      isLiked,
      userSeq
    };
  },
  [ClubMutationTypes.SET_CURRENT_TAB](state: ClubState, tab: ClubListPageTab) {
    state.currentTab = tab;
  },
  [ClubMutationTypes.CHANGE_USER_ROLE](state: ClubState, { clubUserSeq, role }: ClubUserRoleChangeRequest) {
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
  [ClubMutationTypes.DELETE_USER](state: ClubState, { clubUserSeq }: ClubUserKickRequest) {
    state.clubUserList = state.clubUserList
      .filter(user => user.clubUserSeq !== clubUserSeq);
  },
};
export type ClubMutations = typeof mutations;

export const actions = {
  async [ClubActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO]({ commit }: ClubActionContext, clubSeq: number) {
    return actionsNormalTemplate(async () => {
      const clubDetailContext = await clubApi.getClubInfoAndUserInfo(clubSeq);
      commit(ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT, clubDetailContext);
    });
  },
  async [ClubActionTypes.REQUEST_CLUB_CREATE]({ commit }: ClubActionContext, clubCreateRequestDto: ClubWriteRequest) {
    return actionsNormalTemplate(async () => {
      await clubApi.postClubCreate(clubCreateRequestDto);
      commit(ClubListMutationTypes.INIT_CLUB_LIST_AND_PAGE, undefined, { root: true });
      commit(ClubListMutationTypes.INIT_MY_CLUB_LIST_AND_PAGE, undefined, { root: true });
    });
  },
  async [ClubActionTypes.REQUEST_CLUB_CHANGE]({ commit, dispatch }: ClubActionContext, clubWriteRequestWishSeq: ClubWriteRequestWithSeq) {
    return actionsNormalTemplate(async () => {
      await clubApi.putClubCreate(clubWriteRequestWishSeq);
      commit(ClubListMutationTypes.INIT_CLUB_LIST_AND_PAGE, undefined, { root: true });
      commit(ClubListMutationTypes.INIT_MY_CLUB_LIST_AND_PAGE, undefined, { root: true });
      dispatch(ClubActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO, clubWriteRequestWishSeq.clubSeq);
    });
  },
  async [ClubActionTypes.REQUEST_CLUB_JOIN]({ commit }: ClubActionContext, clubSeq: number) {
    return actionsNormalTemplate(async () => {
      await clubApi.postClubJoin(clubSeq);
      const clubDetailContext = await clubApi.getClubInfoAndUserInfo(clubSeq);
      commit(ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT, clubDetailContext);
    });
  },
  async [ClubActionTypes.REQUEST_CHANGE_USER_ROLE]({ commit }: ClubActionContext, clubUserRoleChangeRequest: ClubUserRoleChangeRequest) {
    return actionsNormalTemplate(async () => {
      await clubApi.putUserRole(clubUserRoleChangeRequest);
      commit(ClubMutationTypes.CHANGE_USER_ROLE, clubUserRoleChangeRequest);
    });
  },
  async [ClubActionTypes.REQUEST_KICK_USER]({ commit }: ClubActionContext, clubUserKickRequest: ClubUserKickRequest) {
    return actionsNormalTemplate(async () => {
      await clubApi.deleteKickUser(clubUserKickRequest);
      commit(ClubMutationTypes.DELETE_USER, clubUserKickRequest);
    });
  },
  async [ClubActionTypes.REQUEST_CLUB_WITHDRAW]({ commit }: ClubActionContext, clubSeq: number) {
    return actionsNormalTemplate(async () => {
      await clubApi.deleteWithdraw(clubSeq);
    });
  },
  async [ClubActionTypes.REQUEST_CLUB_DELETE]({ commit }: ClubActionContext, clubSeq: number) {
    return actionsNormalTemplate(async () => {
      await clubApi.deleteClub(clubSeq);
    })
  }
};
export type ClubActions = typeof actions;
