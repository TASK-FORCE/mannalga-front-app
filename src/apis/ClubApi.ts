import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { ClubDetailContext, ClubUserKickRequest, ClubUserRoleChangeRequest, ClubWriteRequest, ClubWriteRequestWithSeq } from '@/interfaces/club';

const clubApi = {
  getClubInfoAndUserInfo(clubSeq: number): Promise<ClubDetailContext> {
    return axios.get(`/api/clubs/${clubSeq}`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  postClubCreate(clubCreateDto: ClubWriteRequest) {
    return axios.post('/api/clubs', clubCreateDto)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  putClubCreate({ clubSeq, clubWriteRequest }: ClubWriteRequestWithSeq) {
    return axios.put(`/api/clubs/${clubSeq}`, clubWriteRequest);
  },

  postClubJoin(seq: number) {
    return axios.post(`/api/clubs/${seq}/users`);
  },

  putUserRole({ clubSeq, clubUserSeq, role }: ClubUserRoleChangeRequest) {
    return axios.put(`/api/clubs/${clubSeq}/users/${clubUserSeq}/roles`, [role]);
  },

  deleteKickUser({ clubSeq, clubUserSeq }: ClubUserKickRequest) {
    return axios.delete(`/api/clubs/${clubSeq}/kick/${clubUserSeq}`);
  },

  deleteWithdraw(clubSeq: number) {
    return axios.delete(`/api/clubs/${clubSeq}/withdraw`);
  },

  deleteClub(clubSeq: number) {
    return axios.delete(`/api/clubs/${clubSeq}`);
  }
}
export default clubApi;
