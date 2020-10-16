import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestProfile() {
    return axios.get('/api/users/kakao-profile')
        .then(ResponseConverter.extractSuperInventionResponseData)
        .then(ResponseConverter.converterProfile);
}

function postRegister(registerRequestDto) {
    return axios.post('/api/users/regist', registerRequestDto)
        .then(ResponseConverter.extractSuperInventionResponseData);
}

function requestRegisterStatus(appToken) {
    return axios.get('/api/users/registStatus', { params: appToken })
        .then(ResponseConverter.extractSuperInventionResponseData);
}

function requestUserSettings() {
    return axios.get('/api/users/settings')
        .then(ResponseConverter.extractSuperInventionResponseData);
}

export {
    requestProfile,
    postRegister,
    requestRegisterStatus,
    requestUserSettings,
};
