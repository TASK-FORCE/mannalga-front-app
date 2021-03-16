import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';

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

    getClubBoardCommentList({ clubSeq, boardSeq, requestParams }) {
        return axios.get(`/api/club/${clubSeq}/board/${boardSeq}/comment`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertBoardCommentList);
    }

    postClubBoardCommentWrite({ clubSeq, boardSeq, boardCommentWriteDto, parentCommentSeq }) {
        return axios.post(`/api/club/${clubSeq}/board/${boardSeq}/comment`, boardCommentWriteDto, {
            params: { parentCommentSeq },
        });
    }

    getClubBoardSubCommentList({ clubSeq, boardSeq, parentCommentSeq }) {
        return axios.get(`/api/club/${clubSeq}/board/${boardSeq}/comment/${parentCommentSeq}?depthLimit=2`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    postLikeClubBoard({ clubSeq, boardSeq }) {
        return axios.post(`/api/club/${clubSeq}/board/${boardSeq}/like`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    deleteLikeClubBoard({ clubSeq, boardSeq }) {
        return axios.delete(`/api/club/${clubSeq}/board/${boardSeq}/like`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const boardApi = new BoardApi();
export default boardApi;
