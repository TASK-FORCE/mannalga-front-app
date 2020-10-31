import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestClubData(clubSeq) {
    return axios.get('/api/clubs/clubData', { params: clubSeq });
}

function requestClubCreate(clubCreateDto) {
    return axios.post('/api/clubs', clubCreateDto)
        .then(ResponseConverter.extractSuperInventionResponseData);
}

function requestClubJoin(seq) {
    return axios.post(`/api/clubs/${seq}/users`);
}

export {
    requestClubData,
    requestClubCreate,
    requestClubJoin,
};
