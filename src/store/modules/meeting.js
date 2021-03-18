import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import meetingApi from '@/apis/MeetingApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import RequestConverter from '@/store/converter/RequestConverter.ts';

const defaultPage = DefaultBuilder.buildPage(20);

const state = {
    meetingGroupList: [],
    meeting: DefaultBuilder.buildMeeting(),
    meetingGroupPage: defaultPage,
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
        state.meetingGroupPage = meetingGroupPage;
        if (meetingGroupList.length === 0) {
            return;
        }
        let lastGroupForPresent = state.meetingGroupList.pop();
        const firstGroupForNew = meetingGroupList.shift();
        if (lastGroupForPresent.groupYearMonth === firstGroupForNew.groupYearMonth) {
            lastGroupForPresent = {
                groupYearMonth: lastGroupForPresent.groupYearMonth,
                meetings: lastGroupForPresent.meetings.concat(firstGroupForNew.meetings),
            };
        } else {
            meetingGroupList.unshift(firstGroupForNew);
        }
        state.meetingGroupList.push(lastGroupForPresent);
        state.meetingGroupList = state.meetingGroupList.concat(meetingGroupList);
    },

    initMeetingGroupList(state) {
        state.meetingGroupList = [];
        state.meetingGroupPage = defaultPage;
    },

    changeMeetingApplicationsStatus(state, { meetingSeq, newStatus }) {
        const meetingSeqNum = parseInt(meetingSeq, 10);
        state.meetingGroupList = state.meetingGroupList
            .map(meetingGroup => ({
                groupYearMonth: meetingGroup.groupYearMonth,
                meetings: meetingGroup.meetings.map(meeting => {
                    if (meeting.seq === meetingSeqNum) {
                        return {
                            ...meeting,
                            ...newStatus,
                        };
                    }
                    return meeting;
                }),
            }));
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
                await meetingApi.postClubMeeting(clubMeetingCreateInfo);
            },
        );
    },

    async requestMeetingEdit({ _ }, clubMeetingEditInfo) {
        return actionsNormalTemplate(
            async () => {
                await meetingApi.putClubMeeting(clubMeetingEditInfo);
            },
        );
    },

    async requestFirstMeetingGroupList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                commit('initMeetingGroupList');
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.meetingGroupPage),
                };
                const meetingGroupListInfo = await meetingApi.getMeetingGroupList(requestDto);
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
                const meetingGroupListInfo = await meetingApi.getMeetingGroupList(requestDto);
                commit('addNextMeetingGroupListInfo', meetingGroupListInfo);
            },
        );
    },

    async requestMeeting({ commit }, clubAndMeetingSeq) {
        return actionsLoadingTemplate(async () => {
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
