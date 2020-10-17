import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestClubListWithPage(requestParams) {
    return axios.post('/api/clubs/search', requestParams)
        .then(ResponseConverter.extractSuperInventionResponseData)
        .then(ResponseConverter.converterClubList);
}

function requestMyClubListWithPage(requestParams) {
    return axios.get('/api/clubs/my', { data: requestParams })
        .then(ResponseConverter.extractSuperInventionResponseData)
        .then(ResponseConverter.converterClubList);
}

export {
    requestClubListWithPage,
    requestMyClubListWithPage,
};
