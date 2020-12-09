import mutationsHelper from '@/store/helper/MutationsHelper.js';
import router from '@/router';

class RequestHelper {
    static async dispatchAll(withLoading, routePathWhenFail, promiseList) {
        try {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(true);
            }
            await Promise.all(promiseList);
        } catch (e) {
            if (routePathWhenFail) {
                router.push(routePathWhenFail);
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
