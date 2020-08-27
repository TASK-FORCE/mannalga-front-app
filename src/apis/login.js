import axios from 'axios';
import { KAKAO } from '@/utils/kakao/utlls.js';
import { kakaoTokenBuilder } from '@/utils/builder/builder.js';

function requestKakaoToken(code) {
    return axios.post('https://kauth.kakao.com/oauth/token', {}, {
        params: {
            grant_type: 'authorization_code',
            client_id: process.env.VUE_APP_KAKAO_REST_APP_KEY,
            redirect_uri: KAKAO.REDIRECT_URL,
            code,
        },
    });
}

function saveKakaoTokenAndGetAppToken(kakaoToken) {
    const requestDto = kakaoTokenBuilder.buildRequestDto(kakaoToken);
    return axios.post('/api/users/saveKakaoToken', requestDto);
}

export {
    requestKakaoToken,
    saveKakaoTokenAndGetAppToken,
};
