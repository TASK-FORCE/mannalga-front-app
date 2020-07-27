import axios from 'axios';

function requestKakaoToken(code) {
    return axios.post('https://kauth.kakao.com/oauth/token', {}, {
        params: {
            grant_type: 'authorization_code',
            client_id: '13e2755860168ed71fc60231d92fb6ef', // TODO (분리)
            redirect_uri: 'http://localhost:8081/login', // TODO (분리)
            code,
        },
    });
}

function saveKakaTokenAndGetAppToken(kakaoToken) {
    return axios.post('/api/saveKakaoToken', kakaoToken);
}

export {
    requestKakaoToken,
    saveKakaTokenAndGetAppToken,
};

// access_token: "JOJ3kjwE9-WZ4UcsHBV98IadyP1rZZ5bFXpneQopyV4AAAFzkRPw1Q"
// expires_in: 21599
// refresh_token: "pBtxqm37_a5JQc30oe2m3tnRZeioubV6PAVWRwopyV4AAAFzkRPw0w"
// refresh_token_expires_in: 5183999
// scope: "gender profile"
// token_type: "bearer"
