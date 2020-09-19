import axios from 'axios';

function uploadTempImage(image) {
    const formData = new FormData();
    formData.append('file', image);
    return axios.post('/api/common/temp/file', formData);
}

export {
    uploadTempImage,
};
