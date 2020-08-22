import axios from 'axios';

function requestProfile() {
    return axios.get('/api/users/kakao-profile');
}

function postRegister(registerRequestDto) {
    return axios.post('/api/users/regist', registerRequestDto);
}

export {
    requestProfile,
    postRegister,
};
