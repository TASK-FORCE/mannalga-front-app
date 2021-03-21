import router from '@/router';
import { PATH } from '@/router/route_path_type.ts';
import store from '@/store/index.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';

class RequestHelper {
  static async dispatchAll(
    withLoading: boolean,
    routePathWhenFail: string | null,
    promiseList: Promise<any>[]
  ) {
    try {
      if (withLoading) {
        store.commit(UIMutationTypes.CHANGE_LOADING, true);
      }
      await Promise.all(promiseList);
    } catch (e) {
      if (routePathWhenFail) {
        if (routePathWhenFail === PATH.BACK) {
          router.back();
        } else {
          router.push(routePathWhenFail);
        }
      }
      throw e;
    } finally {
      if (withLoading) {
        store.commit(UIMutationTypes.CHANGE_LOADING, false);
      }
    }
  }
}

export default RequestHelper;
