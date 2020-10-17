import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function uploadTempImage(formData) {
    return axios.post('/api/common/temp/file', formData)
        .then(ResponseConverter.extractSuperInventionResponseData);
}

export {
    uploadTempImage,
};
