// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Kakao from '@/utils/kakao/sdk.js';

export function moveToKakaoLoginPage() {
  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.VUE_APP_KAKAO_JS_APP_KEY);
  }
  Kakao.Auth.authorize({
    redirectUri: KAKAO.REDIRECT_URL,
  });
}

export const KAKAO = {
  ACCESS_TOKEN: 'kakaoAccessToken',
  REFRESH_TOKEN: 'kakaoRefreshToken',
  REDIRECT_URL: `${window.location.protocol}//${window.location.host}/login`,
};
