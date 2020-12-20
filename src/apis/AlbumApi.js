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
}

const albumApi = new AlbumApi();
export default albumApi;