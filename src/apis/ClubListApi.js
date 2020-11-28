import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class ClubListApi {
    getClubListWithPage(requestParams) {
        return axios.get('/api/clubs/search', { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertClubList);
    }

    getMyClubListWithPage(requestParams) {
        return axios.get('/api/clubs/my', { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertMyClubList);
    }
}

const clubListApi = new ClubListApi();
export default clubListApi;
