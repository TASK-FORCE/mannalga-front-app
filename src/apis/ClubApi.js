import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';

class ClubApi {
    getClubInfoAndUserInfo(clubSeq) {
        return axios.get(`/api/clubs/${clubSeq}`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    postClubCreate(clubCreateDto) {
        return axios.post('/api/clubs', clubCreateDto)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    putClubCreate({ clubSeq, clubChangeRequestDto }) {
        return axios.put(`/api/clubs/${clubSeq}`, clubChangeRequestDto);
    }

    postClubJoin(seq) {
        return axios.post(`/api/clubs/${seq}/users`);
    }

    postClubMeetingCreate({ clubSeq, clubMeetingCreateDto }) {
        return axios.post(`/api/clubs/${clubSeq}/meetings`, clubMeetingCreateDto);
    }

    putUserRole({ clubSeq, clubUserSeq, role }) {
        return axios.put(`/api/clubs/${clubSeq}/users/${clubUserSeq}/roles`, [role]);
    }

    deleteKickUser({ clubSeq, clubUserSeq }) {
        return axios.delete(`/api/clubs/${clubSeq}/kick/${clubUserSeq}`);
    }

    deleteWithdraw(clubSeq) {
        return axios.delete(`/api/clubs/${clubSeq}/withdraw`);
    }
}

const clubApi = new ClubApi();
export default clubApi;
