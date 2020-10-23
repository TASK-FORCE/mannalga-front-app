import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestKakaoProfile() {
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

function requestUserProfile() {
    return axios.get('/api/users/profile')
        .then(ResponseConverter.extractSuperInventionResponseData);
}

function requestUserRegions() {
    return axios.get('/api/users/regions')
        .then(ResponseConverter.extractSuperInventionResponseData)
        .then(ResponseConverter.convertUserRegions);
}

function requestChangeUserRegions(userRegionsChangeDto) {
    return axios.put('/api/users/regions', userRegionsChangeDto);
}

function requestUserInterest() {
    return axios.get('/api/users/interests')
        .then(ResponseConverter.extractSuperInventionResponseData)
        .then(ResponseConverter.convertUserInterests);
}

function requestChangeUserInterests(userInterestsChangeDto) {
    return axios.put('/api/users/interests', userInterestsChangeDto);
}

export {
    requestKakaoProfile,
    postRegister,
    requestRegisterStatus,
    requestUserProfile,
    requestUserRegions,
    requestChangeUserRegions,
    requestUserInterest,
    requestChangeUserInterests,
};
