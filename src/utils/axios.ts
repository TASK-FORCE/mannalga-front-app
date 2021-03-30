import axios from 'axios';
import { AuthUtils } from '@/utils/auth';

export class AxiosUtils {
  static setAppTokenAsDefaultHeader(): void {
    const appToken = AuthUtils.getAppToken();
    if (appToken) {
      // eslint-disable-next-line no-param-reassign
      axios.defaults.headers.common.Authorization = `Bearer ${appToken}`;
    }
  }

  static setBaseUrl(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  static setTimeout(timeout: number) {
    axios.defaults.timeout = timeout;
  }
}
