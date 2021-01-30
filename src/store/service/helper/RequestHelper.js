import mutationsHelper from '@/store/helper/MutationsHelper.js';
import router from '@/router';
import { PATH } from '@/router/route_path_type.js';

class RequestHelper {
    static async dispatchAll(withLoading, routePathWhenFail, promiseList) {
        try {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(true);
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
                mutationsHelper.changeCommonLoading(false);
            }
        }
    }
}

export default RequestHelper;
