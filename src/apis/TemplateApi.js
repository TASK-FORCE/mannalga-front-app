import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class TemplateApi {
    getRegionTemplate() {
        return axios.get('/api/regions')
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getInterestTemplate() {
        return axios.get('/api/interestGroup/all')
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const templateApi = new TemplateApi();
export default templateApi;
