import axios from 'axios';

function requestClubData(clubSeq) {
    return axios.get('/api/clubs/clubData', { params: clubSeq });
}

function requestClubCreate(clubCreateDto) {
    return axios.post('/api/clubs', clubCreateDto);
}

export {
    requestClubData,
    requestClubCreate,
};
