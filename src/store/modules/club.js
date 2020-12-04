import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import clubApi from '@/apis/ClubApi.js';
import { MODULE } from '@/store/type/type.js';
import { CLUB_ROLE } from '@/utils/common/constant/constant.js';

const state = {
    clubData: defaultBuilder.buildClub(),
    clubInfo: defaultBuilder.buildClubInfo(),
    userInfo: defaultBuilder.buildUserInfo(),
};

const getters = {
    clubData: (state) => state.clubData,
    clubInfo: (state) => state.clubInfo,
    clubName: (state) => state.clubInfo.name,
    userInfo: (state) => state.userInfo,
};

const mutations = {
    setClubInfo(state, clubInfo) {
        state.clubInfo = clubInfo;
    },
    setUserInfo(state, userInfo) {
        const { role, isLiked } = userInfo || {};
        state.userInfo = {
            isMaster: role && !!role.includes(CLUB_ROLE.MASTER),
            isManager: role && !!role.includes(CLUB_ROLE.MANAGER),
            isMember: role && !!role.includes(CLUB_ROLE.MEMBER),
            roles: role,
            isLiked,
        };
    },
};

const actions = {
    async requestClubInfoAndUserInfo({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            const { clubInfo, userInfo } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit('setClubInfo', clubInfo);
            commit('setUserInfo', userInfo);
        });
    },
    async requestClubCreate({ commit }, clubCreateInfo) {
        return actionsNormalTemplate(async () => {
            const clubCreateRequestDto = RequestConverter.convertClubCreateInfo(clubCreateInfo);
            await clubApi.postClubCreate(clubCreateRequestDto);
            commit(`${MODULE.CLUB_LIST}/initClubListAndPage`, {}, { root: true });
            commit(`${MODULE.CLUB_LIST}/initMyClubListAndPage`, {}, { root: true });
        });
    },
    async requestClubJoin({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubJoin(clubSeq);
            const { clubInfo, userInfo } = await clubApi.getClubInfoAndUserInfo(clubSeq);
            commit('setClubInfo', clubInfo);
            commit('setUserInfo', userInfo);
        });
    },
    async requestClubBoardCreate({ _ }, clubBoardCreateInfo) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubBoardCreate(clubBoardCreateInfo);
        });
    },
    async requestClubMeetingCreate({ _ }, clubMeetingCreateInfo) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubMeetingCreate(clubMeetingCreateInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
