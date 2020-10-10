import axios from 'axios';

function requestProfile() {
    return axios.get('/api/users/kakao-profile');
}

function postRegister(registerRequestDto) {
    return axios.post('/api/users/regist', registerRequestDto);
}

function requestRegisterStatus(appToken) {
    return axios.get('/api/users/registStatus', { params: appToken });
}

function requestUserSettings() {
    return axios.get('/api/users/settings');
}

export {
    requestProfile,
    postRegister,
    requestRegisterStatus,
    requestUserSettings,
};
