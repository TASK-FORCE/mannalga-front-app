import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class CommonApi {
    postTempImage(formData) {
        return axios.post('/api/common/temp/file', formData)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const commonApi = new CommonApi();
export default commonApi;
