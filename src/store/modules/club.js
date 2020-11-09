import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import clubApi from '@/apis/ClubApi.js';

const state = {
    clubData: defaultBuilder.buildClub(),
};

const getters = {
    clubData: (state) => state.clubData,
    clubName: (state) => state.clubData.clubInfo.name,
};

const mutations = {
    setClubData(state, clubData) {
        state.clubData = clubData;
    },
};

const actions = {
    async requestClubData({ commit }, clubSeq) {
        return actionsLoadingTemplate(commit, async () => {
            const response = await clubApi.getClubData(clubSeq);
            const clubData = response.data;
            commit('setClubData', clubData);
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
