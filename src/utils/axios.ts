import axios from 'axios';
import { AuthUtils } from '@/utils/auth';

export class AxiosUtils {
  public static init() {
    // s3 proxy를 위해 주석처리
    // axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_SERVER_URL;
    AxiosUtils.setBaseUrl('/');
    AxiosUtils.setTimeout(process.env.VUE_APP_AXIOS_TIMEOUT);
    AxiosUtils.setAppTokenAsDefaultHeader();
  }

  static setAppTokenAsDefaultHeader(): void {
    const appToken = AuthUtils.getAppToken();
    if (appToken) {
      // eslint-disable-next-line no-param-reassign
      axios.defaults.headers.common.Authorization = `Bearer ${appToken}`;
    }
  }

  private static setBaseUrl(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  private static setTimeout(timeout: number) {
    axios.defaults.timeout = timeout;
  }
}
