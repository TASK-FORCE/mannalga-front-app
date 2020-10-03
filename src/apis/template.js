import axios from 'axios';

function requestRegionTemplate() {
    return axios.get('/api/regions');
}

function requestInterestTemplate() {
    return axios.get('/api/interestGroup/all');
}

export {
    requestRegionTemplate,
    requestInterestTemplate,
};
