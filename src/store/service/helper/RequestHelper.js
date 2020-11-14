import mutationsHelper from '@/store/helper/MutationsHelper.js';
import router from '@/router';
import { MESSAGE } from '@/utils/common/constant/constant.js';

function handleError(routePathWhenFail) {
    let catchPromise = Promise.resolve();
    if (routePathWhenFail) {
        catchPromise = router.push(routePathWhenFail);
    }
    catchPromise.then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY));
}

class RequestHelper {
    static async dispatchAll(withLoading, routePathWhenFail, promiseList) {
        try {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(true);
            }
            await Promise.all(promiseList);
        } catch (e) {
            console.warn(e);
            handleError(routePathWhenFail);
        } finally {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(false);
            }
        }
    }
}

export default RequestHelper;
