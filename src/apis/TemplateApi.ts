import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';

const templateApi = {
    getRegionTemplate() {
        return axios.get('/api/regions')
            .then(ResponseConverter.extractSuperInventionResponseData);
    },

    getInterestTemplate() {
        return axios.get('/api/interestGroup/all')
            .then(ResponseConverter.extractSuperInventionResponseData);
    },
};

export default templateApi;
