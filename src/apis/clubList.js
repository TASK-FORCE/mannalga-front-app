import axios from 'axios';

function requestClubListWithPage(requestParams) {
    return axios.post('/api/clubs/search', requestParams);
}

export {
    requestClubListWithPage,
};
