import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

class AuthApi {
    postKakaoTokenToKakaoServer(requestParam) {
        return axios.post('https://kauth.kakao.com/oauth/token', {}, { params: { ...requestParam } })
            .then(ResponseConverter.extractResponseData);
    }

    postSaveKakaoToken(kakaoToken) {
        return axios.post('/api/users/saveKakaoToken', kakaoToken)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

const authApi = new AuthApi();
export default authApi;
