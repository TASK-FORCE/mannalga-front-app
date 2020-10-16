import axios from 'axios';
import ResponseConverter from '@/apis/converter/responseConverter.js';

function requestKakaoToken(requestParam) {
    return axios.post('https://kauth.kakao.com/oauth/token', {}, { params: { ...requestParam } })
        .then(ResponseConverter.extractResponseData);
}

function saveKakaoTokenAndGetAppToken(kakaoToken) {
    return axios.post('/api/users/saveKakaoToken', kakaoToken)
        .then(ResponseConverter.extractSuperInventionResponseData);
}

export {
    requestKakaoToken,
    saveKakaoTokenAndGetAppToken,
};
