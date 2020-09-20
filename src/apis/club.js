import axios from 'axios';

function requestClubData(clubSeq) {
    return axios.get('/api/clubs/clubData', { params: clubSeq });
}

export {
    requestClubData,
};
