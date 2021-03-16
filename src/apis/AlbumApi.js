import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';

class AlbumApi {
    getClubAlbum({ clubSeq, albumSeq }) {
        return axios.get(`/api/club/${clubSeq}/album/${albumSeq}`)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getClubAlbumList({ clubSeq, requestParams }) {
        return axios.get(`/api/club/${clubSeq}/album`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertAlbumList);
    }

    postClubAlbumCreate({ clubSeq, clubAlbumCreateDto }) {
        return axios.post(`/api/club/${clubSeq}/album`, clubAlbumCreateDto);
    }

    postClubAlbumCommentWrite({ clubSeq, albumSeq, albumCommentWriteDto, parentCommentSeq }) {
        return axios.post(`/api/club/${clubSeq}/album/${albumSeq}/comment`, albumCommentWriteDto, {
            params: { parentCommentSeq },
        });
    }

    getClubAlbumCommentList({ clubSeq, albumSeq, requestParams }) {
        return axios.get(`/api/club/${clubSeq}/album/${albumSeq}/comment`, { params: requestParams })
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertAlbumCommentList);
    }

    getClubAlbumSubCommentList({ clubSeq, albumSeq, parentCommentSeq }) {
        return axios.get(`/api/club/${clubSeq}/album/${albumSeq}/comment/${parentCommentSeq}?depthLimit=2`)
            .then(ResponseConverter.extractSuperInventionResponseData);
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
