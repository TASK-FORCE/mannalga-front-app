import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';
import { getMeetings } from '@/views/clubDetail/components/meeting/data.js';

class MeetingApi {
    postClubMeetingCreate({ clubSeq, clubMeetingCreateDto }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings`, clubMeetingCreateDto);
    }

    getMeetingList({ clubSeq, requestParams }) {
        // return axios.get(`/api/clubs/${clubSeq}/meetings`, { params: requestParams })
        return getMeetings()
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
