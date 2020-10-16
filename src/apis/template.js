import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestRegionTemplate() {
    return axios.get('/api/regions')
        .then(ResponseConverter.extractSuperInventionResponseData);
}

function requestInterestTemplate() {
    return axios.get('/api/interestGroup/all')
        .then(ResponseConverter.extractSuperInventionResponseData);
}

export {
    requestRegionTemplate,
    requestInterestTemplate,
};
