import { requestClubCreate, requestClubData } from '@/apis/club.js';
import { CLUB_DATA, GET_DEFAULT_CLUB, REQUEST_CLUB_CREATE, REQUEST_CLUB_DATA, SET_CLUB_DATA } from '@/store/type/club_type.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    [CLUB_DATA]: GET_DEFAULT_CLUB(),
};

const getters = {
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
    async [REQUEST_CLUB_DATA]({ commit }, clubSeq) {
        actionsLoadingTemplate(commit, async () => {
            const response = await requestClubData(clubSeq);
            const clubData = response.data;
            commit(SET_CLUB_DATA, clubData);
        });
    },
    async [REQUEST_CLUB_CREATE]({ commit }, clubCreateInfo) {
        return actionsNormalTemplate(async () => {
            const clubCreateRequestDto = RequestConverter.convertClubCreateInfo(clubCreateInfo);
            await requestClubCreate(clubCreateRequestDto);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
