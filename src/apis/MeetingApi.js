import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class MeetingApi {
    postClubMeeting({ clubSeq, clubMeetingCreateDto }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings`, clubMeetingCreateDto);
    }

    putClubMeeting({ clubSeq, meetingSeq, clubMeetingEditDto }) {
        return axios.put(`/api/clubs/${clubSeq}/meetings/${meetingSeq}`, clubMeetingEditDto);
    }

    getMeetingGroupList({ clubSeq, requestParams }) {
        return axios.get(`/api/clubs/${clubSeq}/meetings`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertMeetingList);
    }

    getMeeting({ clubSeq, meetingSeq }) {
        return axios.get(`/api/clubs/${clubSeq}/meetings/${meetingSeq}`)
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertMeeting);
    }

    postMeetingApplication({ clubSeq, meetingSeq }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    deleteMeetingApplication({ clubSeq, meetingSeq }) {
        return axios.delete(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications`);
    }

    getMeetingApplicationStatus({ clubSeq, meetingSeq }) {
        return axios.get(`/api/clubs/${clubSeq}/meetings/${meetingSeq}/applications/status`)
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertMeetingApplicationStatus);
    }
}

const meetingApi = new MeetingApi();
export default meetingApi;
