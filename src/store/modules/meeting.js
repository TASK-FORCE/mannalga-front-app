import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import meetingApi from '@/apis/MeetingApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/RequestConverter.js';

const state = {
    meetingList: [],
    meeting: DefaultBuilder.buildMeeting(),
    meetingPage: DefaultBuilder.buildPage(),
};

const getters = {
    meeting: (state) => state.meeting,
    meetingList: (state) => state.meetingList,
    meetingPage: (state) => state.meetingPage,
};

const mutations = {
    setMeeting(state, meeting) {
        state.meeting = meeting;
    },

    setMeetingList(state, { meetingList, meetingPage }) {
        state.meetingList = meetingList;
        state.meetingPage = meetingPage;
    },

    addNextMeetingList(state, { meetingList, meetingPage }) {
        state.meetingList = state.meetingList.concat(meetingList);
        state.meetingPage = meetingPage;
    },

    initMeetingList(state) {
        state.meetingList = [];
        state.meetingPage = DefaultBuilder.buildPage();
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

    async requestFirstMeetingList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                commit('initMeetingList');
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.meetingPage),
                };
                const meetingListInfo = await meetingApi.getMeetingList(requestDto);
                commit('setMeetingList', meetingListInfo);
            },
        );
    },

    async requestNextMeetingList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.meetingPage),
                };
                const meetingListInfo = await meetingApi.getMeetingList(requestDto);
                commit('addNextMeetingList', meetingListInfo);
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
