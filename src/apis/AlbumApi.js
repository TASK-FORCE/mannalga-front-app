import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class AlbumApi {
    getClubAlbumList({ clubSeq, requestParams }) {
        return axios.get(`/api/club/${clubSeq}/album`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertAlbumList);
    }

    postClubAlbumCreate({ clubSeq, clubAlbumCreateDto }) {
        return axios.post(`/api/club/${clubSeq}/album`, clubAlbumCreateDto);
    }

    postClubAlbumCommentWrite({ clubSeq, albumSeq, albumCommentWriteDto }) {
        return axios.post(`/api/club/${clubSeq}/album/${albumSeq}/comment`, albumCommentWriteDto);
    }

    getClubAlbumCommentList({ clubSeq, albumSeq, requestParams }) {
        return axios.get(`/api/club/${clubSeq}/album/${albumSeq}/comment`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertAlbumCommentList);
    }

    postLikeClubAlbum({ clubSeq, albumSeq }) {
        return axios.post(`/api/club/${clubSeq}/album/${albumSeq}/like`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    deleteLikeClubAlbum({ clubSeq, albumSeq }) {
        return axios.delete(`/api/club/${clubSeq}/album/${albumSeq}/like`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const albumApi = new AlbumApi();
export default albumApi;
