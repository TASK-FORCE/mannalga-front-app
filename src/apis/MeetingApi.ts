import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { Meeting, MeetingApplicationStatus, MeetingGroupListResponse, MeetingPageRequest, MeetingSeqContext, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';

const meetingApi = {
  postClubMeeting({ clubSeq, meetingWriteRequest }: MeetingWriteRequestWithSeq): Promise<void> {
    return axios.post(`/api/clubs/${clubSeq}/meetings`, meetingWriteRequest);
  },

  putClubMeeting({ clubSeq, meetingSeq, meetingWriteRequest }: MeetingWriteRequestWithSeq): Promise<void> {
    return axios.put(`/api/clubs/${clubSeq}/meetings/${meetingSeq}`, meetingWriteRequest);
  },

  getMeetingGroupList({ clubSeq, pageRequest }: MeetingPageRequest): Promise<MeetingGroupListResponse> {
    return axios.get(`/api/clubs/${clubSeq}/meetings`, { params: pageRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertMeetingList);
  },

  getMeeting({ clubSeq, meetingSeq }: MeetingSeqContext): Promise<Meeting> {
    return axios.get(`/api/clubs/${clubSeq}/meetings/${meetingSeq}`)
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertMeeting);
  },

  postMeetingApplication({ clubSeq, meetingSeq }: MeetingSeqContext): Promise<void> {
    return axios.post(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  deleteMeetingApplication({ clubSeq, meetingSeq }: MeetingSeqContext): Promise<void> {
    return axios.delete(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications`);
  },

  getMeetingApplicationStatus({ clubSeq, meetingSeq }: MeetingSeqContext): Promise<MeetingApplicationStatus> {
    return axios.get(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications/status`)
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(data => ResponseConverter.convertMeetingApplicationStatus(data, meetingSeq));
  },
};

export default meetingApi;
