import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import clubApi from '@/apis/ClubApi.js';
import { MODULE } from '@/store/type/type.js';
import { CLUB_ROLE } from '@/utils/role.js';

const state = {
    clubData: DefaultBuilder.buildClub(),
    clubInfo: DefaultBuilder.buildClubInfo(),
    currentUserInfo: DefaultBuilder.buildCurrentUserInfo(),
    clubUserList: [],
    selectedClubRegions: {},
    currentTab: null,
};

const getters = {
    clubData: (state) => state.clubData,
    clubInfo: (state) => state.clubInfo,
    clubName: (state) => state.clubInfo.name,
    currentUserInfo: (state) => state.currentUserInfo,
    clubUserList: (state) => state.clubUserList,
    selectedClubRegions: (state) => state.selectedClubRegions,
    currentTab: (state) => state.currentTab,
};

const mutations = {
    setClubInfo(state, clubInfo) {
        state.clubInfo = clubInfo;
    },
    setCurrentTab(state, tab) {
        state.currentTab = tab;
    },
    setCurrentUserInfo(state, userInfo) {
        const { role, isLiked } = userInfo || {};
        state.currentUserInfo = {
            isMaster: role && !!role.includes(CLUB_ROLE.MASTER),
            isManager: role && !!role.includes(CLUB_ROLE.MANAGER),
            isMember: role && !!role.includes(CLUB_ROLE.MEMBER),
            roles: role,
            isLiked,
        };
    },
    setClubUserList(state, userList) {
        state.clubUserList = userList;
    },
};

const actions = {
    async requestClubInfoAndUserInfo({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            const { clubInfo, userInfo, userList } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit('setClubInfo', clubInfo);
            commit('setCurrentUserInfo', userInfo);
            commit('setClubUserList', userList);
        });
    },
    async requestClubCreate({ commit }, clubCreateRequestDto) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubCreate(clubCreateRequestDto);
            commit(`${MODULE.CLUB_LIST}/initClubListAndPage`, {}, { root: true });
            commit(`${MODULE.CLUB_LIST}/initMyClubListAndPage`, {}, { root: true });
        });
    },

    async requestClubChange({ commit, dispatch }, clubChangeRequestInfo) {
        return actionsNormalTemplate(async () => {
            await clubApi.putClubCreate(clubChangeRequestInfo);
            commit(`${MODULE.CLUB_LIST}/initClubListAndPage`, {}, { root: true });
            commit(`${MODULE.CLUB_LIST}/initMyClubListAndPage`, {}, { root: true });
            dispatch('requestClubInfoAndUserInfo', clubChangeRequestInfo.clubSeq);
        });
    },
    async requestClubJoin({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubJoin(clubSeq);
            const { clubInfo, userInfo, userList } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit('setClubInfo', clubInfo);
            commit('setCurrentUserInfo', userInfo);
            commit('setClubUserList', userList);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
