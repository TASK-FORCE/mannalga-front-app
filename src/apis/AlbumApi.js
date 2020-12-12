import axios from 'axios';

class AlbumApi {
    postClubAlbumCreate({ clubSeq, clubAlbumCreateDto }) {
        return axios.post(`/api/club/${clubSeq}/album`, clubAlbumCreateDto);
    }
}

const albumApi = new AlbumApi();
export default albumApi;
