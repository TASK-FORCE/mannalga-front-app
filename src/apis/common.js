import axios from 'axios';

function uploadTempImage(formData) {
    return axios.post('/api/common/temp/file', formData);
}

export {
    uploadTempImage,
};
