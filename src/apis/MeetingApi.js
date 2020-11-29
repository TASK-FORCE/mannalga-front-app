import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class MeetingApi {
    postClubMeetingCreate({ clubSeq, clubMeetingCreateDto }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings`, clubMeetingCreateDto);
    }

    getMeetingList({ clubSeq, requestParams }) {
        return axios.get(`/api/clubs/${clubSeq}/meetings`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const meetingApi = new MeetingApi();
export default meetingApi;
