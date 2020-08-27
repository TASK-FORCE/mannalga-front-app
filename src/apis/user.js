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

export {
    requestProfile,
    postRegister,
    requestRegisterStatus,
};
