import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import meetingApi from '@/apis/MeetingApi.js';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async requestClubMeetingCreate({ _ }, clubMeetingCreateInfo) {
        return actionsNormalTemplate(async () => {
            await meetingApi.postClubMeetingCreate(clubMeetingCreateInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
