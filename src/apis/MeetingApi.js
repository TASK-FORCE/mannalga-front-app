import axios from 'axios';

class MeetingApi {
    postClubMeetingCreate({ clubSeq, clubMeetingCreateDto }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings`, clubMeetingCreateDto);
    }
}

const meetingApi = new MeetingApi();
export default meetingApi;
