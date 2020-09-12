import axios from 'axios';

function requestClubsWithPage(requestParams) {
    return axios.post('/api/clubs', { data: requestParams });
}

export {
    requestClubsWithPage,
};
