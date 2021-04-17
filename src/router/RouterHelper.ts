import router from '@/router/index.ts';
import { Dictionary } from 'vue-router/types/router';
import { AuthUtils } from '@/utils/auth';
import { generateParamPath, PATH } from '@/router/route_path_type';

class RouterHelper {
  clubSeq = (): number => parseInt(getParams().clubSeq, 10);
  meetingSeq = (): number => parseInt(getParams().meetingSeq, 10);
  boardSeq = (): number => parseInt(getParams().boardSeq, 10);
  albumSeq = (): number => parseInt(getParams().albumSeq, 10);

  /** 에러가 발생하였을 때는 해당 메서드를 통해서만 라우팅을 하도록 한다.
   *  - 토큰 만료(401) 에러의 경우 actionsTemplate.handleException 에서 login page로 푸시를 하므로 중복 라우팅의 우려가 있다.
   */
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
      await router.push(PATH.LOGIN)
        .catch((e) => {
          if (e && e.name !== 'NavigationDuplicated') {
            throw e;
          }
        });
    }
  }

  moveToClubMainPage() {
    const clubSeq = this.clubSeq();
    if (isNaN(clubSeq)) {
      throw new Error('[moveToClubMainPage] seq should not be NaN');
    }
    return router.push(generateParamPath(PATH.CLUB.MAIN, [clubSeq]));
  }
}

const getParams = (): Dictionary<string> => router.currentRoute.params;
const isLoginPage = () => router.currentRoute.path === PATH.LOGIN;

const routerHelper = new RouterHelper();
export default routerHelper;
