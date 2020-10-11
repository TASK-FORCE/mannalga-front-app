import { requestClubCreate, requestClubData } from '@/apis/club.js';
import {
    DEFAULT_CLUB,
    CLUB_DATA,
    SET_CLUB_DATA,
    REQUEST_CLUB_DATA, REQUEST_CLUB_CREATE,
} from '@/store/type/club_type.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';

const state = {
    // clubData: {
    //     clubInfo: {
    //         seq: '',
    //         clubName: '',
    //         clubDetail: '',
    //         memberCnt: '',
    //         memberMaxCnt: '',
    //         clubInterest: '',
    //         clubLocation: '',
    //         clubImg: '',
    //         testtesttest: 'test',
    //     },
    //     memberInfo: {
    //         // ...
    //     },
    //     boardList: {
    //         // ...
    //     },
    //     albumList: {
    //         // ...
    //     },
    //     scheduleList: {
    //         // ...
    //     },
    //     // ...
    // }
    [CLUB_DATA]: DEFAULT_CLUB,
};

const getters = {
    // clubData(state) {
    //     return state.clubData;
    // }
    [CLUB_DATA](state) {
        return state[CLUB_DATA];
    },
};

const mutations = {
    [SET_CLUB_DATA](state, clubData) {
        state.clubData = clubData;
    },
};

const actions = {
    // async getClubData({ commit }) {
    //     try {
    //         const response = await getClubData();
    //         const { clubData } = response.data;
    //         commit('setClubData', clubData);
    //     } catch (e) {
    //         console.warn(e);
    //     }
    // },
    async [REQUEST_CLUB_DATA]({ commit }, clubSeq) {
        actionsLoadingTemplate(commit, async () => {
            const response = await requestClubData(clubSeq);
            const clubData = response.data;
            commit(SET_CLUB_DATA, clubData);
        });
    },
    async [REQUEST_CLUB_CREATE]({ commit }, clubCreateDto) {
        return actionsNormalTemplate(async () => (requestClubCreate(clubCreateDto)));
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
