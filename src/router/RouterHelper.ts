import router from '@/router/index.ts';
import { Dictionary } from 'vue-router/types/router';
import { AuthUtils } from '@/utils/auth';
import { PATH } from '@/router/route_path_type';

class RouterHelper {
  clubSeq = (): number => parseInt(getParams().clubSeq, 10);
  meetingSeq = (): number => parseInt(getParams().meetingSeq, 10);
  boardSeq = (): number => parseInt(getParams().boardSeq, 10);
  albumSeq = (): number => parseInt(getParams().albumSeq, 10);

  // 401 에러는 actionTemplate에서 login page로 push하므로 push를 진행하지 않는다.
  async pushWhenException(e: any, path: string) {
    if (!AuthUtils.isUnauthorizedError(e)) {
      if (path === PATH.BACK) {
        router.back();
      } else {
        await router.push(path);
      }
    }
  }

  async pushWhenUnauthorizedError() {
    if (!isLoginPage()) {
      await router.push(PATH.LOGIN);
    }
  }
}

const getParams = (): Dictionary<string> => router.currentRoute.params;
const isLoginPage = () => router.currentRoute.path === PATH.LOGIN;

const routerHelper = new RouterHelper();
export default routerHelper;
