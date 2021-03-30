import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { ClubListRequest, ClubListResponse, MyClubListRequest, MyClubListResponse } from '@/interfaces/clubList';

const clubListApi = {
  getClubListWithPage(clubListRequest: ClubListRequest): Promise<ClubListResponse> {
    return axios.get('/api/clubs/search', { params: clubListRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertClubList);
  },

  getMyClubListWithPage(clubListRequest: MyClubListRequest): Promise<MyClubListResponse> {
    return axios.get('/api/clubs/my', { params: clubListRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertMyClubList);
  }
}
export default clubListApi;
