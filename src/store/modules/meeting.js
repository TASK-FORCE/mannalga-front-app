import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import meetingApi from '@/apis/MeetingApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/RequestConverter.js';

const state = {
    meetingGroupList: [],
    meeting: DefaultBuilder.buildMeeting(),
    meetingGroupPage: DefaultBuilder.buildPage(),
};

const getters = {
    meeting: (state) => state.meeting,
    meetingGroupList: (state) => state.meetingGroupList,
    meetingGroupPage: (state) => state.meetingGroupPage,
};

const mutations = {
    setMeeting(state, meeting) {
        state.meeting = meeting;
    },

    setMeetingGroupListInfo(state, { meetingGroupList, meetingGroupPage }) {
        state.meetingGroupList = meetingGroupList;
        state.meetingGroupPage = meetingGroupPage;
    },

    addNextMeetingGroupListInfo(state, { meetingGroupList, meetingGroupPage }) {
        state.meetingGroupList = state.meetingGroupList.concat(meetingGroupList);
        state.meetingGroupPage = meetingGroupPage;
    },

    initMeetingList(state) {
        state.meetingList = [];
        state.meetingGroupPage = DefaultBuilder.buildPage();
    },

    changeMeetingApplicationsStatus(state, { meetingSeq, newStatus }) {
        const meetingSeqNum = parseInt(meetingSeq, 10);
        state.meetingList = state.meetingList.map(meeting => {
            if (meeting.seq === meetingSeqNum) {
                return {
                    ...meeting,
                    ...newStatus,
                };
            }
            return meeting;
        });
        if (state.meeting.seq === meetingSeqNum) {
            state.meeting = {
                ...state.meeting,
                ...newStatus,
            };
        }
    },
};

const actions = {
    async requestMeetingCreate({ _ }, clubMeetingCreateInfo) {
        return actionsNormalTemplate(
            async () => {
                await meetingApi.postClubMeetingCreate(clubMeetingCreateInfo);
            },
        );
    },

    async requestFirstMeetingGroupList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                commit('initMeetingList');
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.meetingGroupPage),
                };
                const meetingGroupListInfo = await meetingApi.getMeetingList(requestDto);
                commit('setMeetingGroupListInfo', meetingGroupListInfo);
            },
        );
    },

    async requestNextMeetingGroupList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.meetingGroupPage),
                };
                const meetingListInfo = await meetingApi.getMeetingList(requestDto);
                commit('addNextMeetingGroupListInfo', meetingListInfo);
            },
        );
    },

    async requestMeeting({ commit }, clubAndMeetingSeq) {
        return actionsLoadingTemplate(commit,
            async () => {
                const meeting = await meetingApi.getMeeting(clubAndMeetingSeq);
                commit('setMeeting', meeting);
            });
    },

    async requestMeetingApplication({ commit, dispatch }, meetingApplicationInfo) {
        return actionsNormalTemplate(
            async () => {
                await meetingApi.postMeetingApplication(meetingApplicationInfo);
                dispatch('requestMeetingApplicationStatus', meetingApplicationInfo);
            },
        );
    },

    async requestCancelMeetingApplication({ commit, dispatch }, meetingApplicationInfo) {
        return actionsNormalTemplate(
            async () => {
                await meetingApi.deleteMeetingApplication(meetingApplicationInfo);
                dispatch('requestMeetingApplicationStatus', meetingApplicationInfo);
            },
        );
    },

    async requestMeetingApplicationStatus({ commit }, meetingApplicationInfo) {
        return actionsNormalTemplate(
            async () => {
                const newStatus = await meetingApi.getMeetingApplicationStatus(meetingApplicationInfo);
                commit('changeMeetingApplicationsStatus', {
                    meetingSeq: meetingApplicationInfo.meetingSeq,
                    newStatus,
                });
            },
        );
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
