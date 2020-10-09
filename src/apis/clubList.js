import axios from 'axios';

function requestClubListWithPage(requestParams) {
    return axios.post('/api/clubs/search', requestParams);
}

function requestMyClubListWithPage(requestParams) {
    return axios.get('/api/clubs/my', {
        data: requestParams,
    });
}

export {
    requestClubListWithPage,
    requestMyClubListWithPage,
};
