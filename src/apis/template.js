import axios from 'axios';

function requestLocationTemplate() {
    return axios.get('/api/states');
}

function requestInterestTemplate() {
    return axios.get('/api/interestGroup/all');
}

export {
    requestLocationTemplate,
    requestInterestTemplate,
};
