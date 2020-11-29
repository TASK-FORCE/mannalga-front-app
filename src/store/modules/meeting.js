import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import meetingApi from '@/apis/MeetingApi.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    meetingList: [],
    meetingPage: defaultBuilder.buildPage(),
};

const getters = {
    meetingList: (state) => state.meetingList,
    meetingPage: (state) => state.meetingPage,
};

const mutations = {
    setMeetingList(state, { meetingList, meetingPage }) {
        state.meetingList = meetingList;
        state.meetingPage = meetingPage;
    },
};

const actions = {
    async requestMeetingCreate({ _ }, clubMeetingCreateInfo) {
        return actionsNormalTemplate(async () => {
            await meetingApi.postClubMeetingCreate(clubMeetingCreateInfo);
        });
    },

    async requestFirstMeetingList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(async () => {
            const requestDto = {
                clubSeq,
                requestParams: RequestConverter.convertPage(state.meetingPage),
            };
            const meetingListInfo = await meetingApi.getMeetingList(requestDto);
            commit('setMeetingList', meetingListInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
