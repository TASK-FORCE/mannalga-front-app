import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class BoardApi {
    getClubBoardList({ clubSeq, requestParams }) {
        return axios.get(`/api/clubs/${clubSeq}/board`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertBoardList);
    }

    postClubBoardCreate({ clubSeq, clubBoardDto }) {
        return axios.post(`/api/clubs/${clubSeq}/board`, clubBoardDto);
    }

    getClubBoard({ clubSeq, boardSeq }) {
        return axios.get(`/api/clubs/${clubSeq}/board/${boardSeq}`)
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertBoard);
    }
}

const boardApi = new BoardApi();
export default boardApi;
