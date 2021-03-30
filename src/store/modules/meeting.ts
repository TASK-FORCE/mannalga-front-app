import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import meetingApi from '@/apis/MeetingApi.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import RequestConverter from '@/apis/converter/RequestConverter.ts';
import { MeetingMutationTypes } from '@/store/type/mutationTypes';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { MeetingActionContext } from '@/store/type/actionContextTypes';
import { Meeting, MeetingApplicationStatus, MeetingFeedGroup, MeetingGroupListResponse, MeetingSeqContext, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';
import { Page } from '@/interfaces/common';

const FIRST_PAGE = DefaultBuilder.page(20);

export const state = {
  meeting: DefaultBuilder.meeting() as Meeting,
  meetingGroupList: [] as MeetingFeedGroup[],
  meetingGroupPage: FIRST_PAGE as Page,
};
export type MeetingState = typeof state;

export const mutations = {
  [MeetingMutationTypes.SET_MEETING](state: MeetingState, meeting: Meeting) {
    state.meeting = meeting;
  },
  [MeetingMutationTypes.SET_MEETING_GROUP_LIST_INFO](state: MeetingState, { meetingGroupList, meetingGroupPage }: MeetingGroupListResponse) {
    state.meetingGroupList = meetingGroupList;
    state.meetingGroupPage = meetingGroupPage;
  },
  [MeetingMutationTypes.ADD_NEXT_MEETING_GROUP_LIST_INFO](state: MeetingState, { meetingGroupList: newMeetingGroupList, meetingGroupPage }: MeetingGroupListResponse) {
    state.meetingGroupPage = meetingGroupPage;
    if (newMeetingGroupList.length === 0) {
      return;
    }

    const lastGroupForPresent: MeetingFeedGroup | undefined = state.meetingGroupList.pop()
    const firstGroupForNew: MeetingFeedGroup | undefined = newMeetingGroupList.shift()

    if (!lastGroupForPresent || !firstGroupForNew) {
      return;
    }

    if (lastGroupForPresent.groupYearMonth === firstGroupForNew.groupYearMonth) {
      state.meetingGroupList.push({
        groupYearMonth: lastGroupForPresent.groupYearMonth,
        meetings: lastGroupForPresent.meetings.concat(firstGroupForNew.meetings),
      });
      state.meetingGroupList = state.meetingGroupList.concat(newMeetingGroupList);
    } else {
      state.meetingGroupList.push(lastGroupForPresent);
      state.meetingGroupList.push(firstGroupForNew);
      state.meetingGroupList = state.meetingGroupList.concat(newMeetingGroupList);
    }
  },
  [MeetingMutationTypes.INIT_MEETING_GROUP_LIST](state: MeetingState) {
    state.meetingGroupList = [];
    state.meetingGroupPage = FIRST_PAGE;
  },
  [MeetingMutationTypes.CHANGE_MEETING_APPLICATIONS_STATUS](state: MeetingState, { meetingSeq, isRegistered, applicationUsers }: MeetingApplicationStatus) {
    state.meetingGroupList = state.meetingGroupList
      .map(meetingGroup => ({
        groupYearMonth: meetingGroup.groupYearMonth,
        meetings: meetingGroup.meetings.map(meeting => {
          if (meeting.seq === meetingSeq) {
            return {
              ...meeting,
              isRegistered: isRegistered,
              applicationUsers: applicationUsers
            };
          }
          return meeting;
        }),
      }));
    if (state.meeting.seq === meetingSeq) {
      state.meeting = {
        ...state.meeting,
        isRegistered,
        applicationUsers
      };
    }
  },
};
export type MeetingMutations = typeof mutations;

export const actions = {
  async [MeetingActionTypes.REQUEST_MEETING_CREATE]({ commit }: MeetingActionContext, meetingWriteRequestWithSeq: MeetingWriteRequestWithSeq) {
    return actionsNormalTemplate(
      async () => {
        await meetingApi.postClubMeeting(meetingWriteRequestWithSeq);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_MEETING_EDIT]({ commit }: MeetingActionContext, meetingWriteRequestWithSeq: MeetingWriteRequestWithSeq) {
    return actionsNormalTemplate(
      async () => {
        await meetingApi.putClubMeeting(meetingWriteRequestWithSeq);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_FIRST_MEETING_GROUP_LIST]({ commit, state }: MeetingActionContext, clubSeq: number) {
    return actionsNormalTemplate(
      async () => {
        commit(MeetingMutationTypes.INIT_MEETING_GROUP_LIST);
        const meetingPageRequest = RequestConverter.convertMeetingPageRequest(clubSeq, state.meetingGroupPage);
        const meetingGroupListResponse = await meetingApi.getMeetingGroupList(meetingPageRequest);
        commit(MeetingMutationTypes.SET_MEETING_GROUP_LIST_INFO, meetingGroupListResponse);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_NEXT_MEETING_GROUP_LIST]({ commit, state }: MeetingActionContext, clubSeq: number) {
    return actionsNormalTemplate(
      async () => {
        const meetingPageRequest = RequestConverter.convertMeetingPageRequest(clubSeq, state.meetingGroupPage);
        const meetingGroupListResponse = await meetingApi.getMeetingGroupList(meetingPageRequest);
        commit(MeetingMutationTypes.ADD_NEXT_MEETING_GROUP_LIST_INFO, meetingGroupListResponse);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_MEETING]({ commit }: MeetingActionContext, meetingSeqContext: MeetingSeqContext) {
    return actionsLoadingTemplate(async () => {
      const meeting = await meetingApi.getMeeting(meetingSeqContext);
      commit(MeetingMutationTypes.SET_MEETING, meeting);
    });
  },
  async [MeetingActionTypes.REQUEST_DELETE_MEETING]({ commit }: MeetingActionContext, meetingSeqContext: MeetingSeqContext) {
    return actionsLoadingTemplate(async () => {
      await meetingApi.deleteMeeting(meetingSeqContext);
    });
  },
  async [MeetingActionTypes.REQUEST_MEETING_APPLICATION]({ commit, dispatch }: MeetingActionContext, meetingSeqContext: MeetingSeqContext) {
    return actionsNormalTemplate(
      async () => {
        await meetingApi.postMeetingApplication(meetingSeqContext);
        dispatch(MeetingActionTypes.REQUEST_MEETING_APPLICATION_STATUS, meetingSeqContext);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_CANCEL_MEETING_APPLICATION]({ commit, dispatch }: MeetingActionContext, meetingSeqContext: MeetingSeqContext) {
    return actionsNormalTemplate(
      async () => {
        await meetingApi.deleteMeetingApplication(meetingSeqContext);
        dispatch(MeetingActionTypes.REQUEST_MEETING_APPLICATION_STATUS, meetingSeqContext);
      },
    );
  },
  async [MeetingActionTypes.REQUEST_MEETING_APPLICATION_STATUS]({ commit }: MeetingActionContext, meetingSeqContext: MeetingSeqContext) {
    return actionsNormalTemplate(
      async () => {
        const meetingApplicationStatus = await meetingApi.getMeetingApplicationStatus(meetingSeqContext);
        commit(MeetingMutationTypes.CHANGE_MEETING_APPLICATIONS_STATUS, meetingApplicationStatus);
      },
    );
  },
};
export type MeetingActions = typeof actions;
