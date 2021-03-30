import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { KakaoTokenRequest, KakaoTokenResponse, ServerTokenRequest } from '@/interfaces/auth.ts';

const authApi = {
  postKakaoTokenToKakaoServer(kakaoTokenRequest: KakaoTokenRequest): Promise<KakaoTokenResponse> {
    return axios.post('https://kauth.kakao.com/oauth/token', {}, { params: { ...kakaoTokenRequest } })
      .then(ResponseConverter.extractResponseData);
  },

  postSaveKakaoToken(serverTokenRequest: ServerTokenRequest) {
    return axios.post('/api/users/saveKakaoToken', serverTokenRequest)
      .then(ResponseConverter.extractSuperInventionResponseData);
  }
}

export default authApi;
