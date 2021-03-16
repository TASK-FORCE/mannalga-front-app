import router from '@/router';
import { PATH } from '@/router/route_path_type.js';
import store from '@/store/index.ts';
import { MutationTypes } from '@/store/type/methodTypes.ts';

class RequestHelper {
    static async dispatchAll(withLoading, routePathWhenFail, promiseList) {
        try {
            if (withLoading) {
                store.commit(MutationTypes.CHANGE_LOADING, true);
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
                store.commit(MutationTypes.CHANGE_LOADING, false);
            }
        }
    }
}

export default RequestHelper;
