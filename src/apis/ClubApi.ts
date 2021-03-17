import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { ClubDetailContext } from '@/interfaces/club';

const clubApi = {
    getClubInfoAndUserInfo(clubSeq: number): Promise<ClubDetailContext> {
        return axios.get(`/api/clubs/${clubSeq}`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    },

    postClubCreate(clubCreateDto) {
        return axios.post('/api/clubs', clubCreateDto)
            .then(ResponseConverter.extractSuperInventionResponseData);
    },

    putClubCreate({ clubSeq, clubWriteRequest }) {
        return axios.put(`/api/clubs/${clubSeq}`, clubWriteRequest);
    },

    postClubJoin(seq) {
        return axios.post(`/api/clubs/${seq}/users`);
    },

    putUserRole({ clubSeq, clubUserSeq, role }) {
        return axios.put(`/api/clubs/${clubSeq}/users/${clubUserSeq}/roles`, [role]);
    },

    deleteKickUser({ clubSeq, clubUserSeq }) {
        return axios.delete(`/api/clubs/${clubSeq}/kick/${clubUserSeq}`);
    },

    deleteWithdraw(clubSeq) {
        return axios.delete(`/api/clubs/${clubSeq}/withdraw`);
    },
}
export default clubApi;
