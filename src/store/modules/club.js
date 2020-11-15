import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import clubApi from '@/apis/ClubApi.js';

const state = {
    clubData: defaultBuilder.buildClub(),
    clubInfo: defaultBuilder.buildClubInfo(),
    userInfo: defaultBuilder.buildUserInfo(),
};

const getters = {
    clubData: (state) => state.clubData,
    clubInfo: (state) => state.clubInfo,
    clubName: (state) => state.clubData.clubInfo.name,
    userInfo: (state) => state.userInfo,
};

const mutations = {
    setClubInfo(state, clubInfo) {
        state.clubInfo = clubInfo;
    },
    setUserInfo(state, userInfo) {
        const { role, isLiked } = userInfo;
        state.userInfo = {
            isMaster: role && !!role.find(roleName => roleName === 'MASTER'),
            isManager: role && !!role.find(roleName => roleName === 'MANAGER'),
            isMember: role && !!role.find(roleName => roleName === 'CLUB_MEMBER'),
            roles: userInfo.role,
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
        });
    },
    async requestClubJoin({ commit }, clubSeq) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubJoin(clubSeq);
        });
    },
    async requestClubBoardCreate({ _ }, clubBoardCreateInfo) {
        return actionsNormalTemplate(async () => {
            await clubApi.postClubBoardCreate(clubBoardCreateInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
