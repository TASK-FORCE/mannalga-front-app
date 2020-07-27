import Kakao from './sdk.js';

function moveToKakaoLoginPage() {
    if (!Kakao.isInitialized()) {
        Kakao.init('870d398df8472b4126a17391a04bc037'); // TODO
    }
    Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8081/login', // TODO
    });
}

const KAKAO = {
    ACCESS_TOKEN: 'kakaoAccessToken',
    REFRESH_TOKEN: 'kakaoRefreshToken',
};

export {
    moveToKakaoLoginPage,
    KAKAO,
};
