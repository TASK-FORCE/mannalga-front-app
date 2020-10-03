import _ from '@/utils/lodashWrapper.js';
import store from '@/store';
import router from '@/router';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_REGION_TEMPLATE, TEMPLATE } from '@/store/type/template_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { combineWithModuleName } from '@/store/helper/vuexUtils.js';

const actionsFetcherService = {
    async fetchInterestAndRegionTemplate(withLoading, routePathWhenFail) {
        if (!_.isEmpty(gettersHelper.rootRegions()) && !_.isEmpty(gettersHelper.rootInterests())) {
            return;
        }

        let regionsPromise;
        let interestsPromise;

        if (withLoading) {
            store.commit(combineWithModuleName(COMMON, CHANGE_LOADING), true);
        }

        if (_.isEmpty(gettersHelper.rootRegions())) {
            regionsPromise = store.dispatch(combineWithModuleName(TEMPLATE, REQUEST_REGION_TEMPLATE));
        }

        if (_.isEmpty(gettersHelper.rootInterests())) {
            interestsPromise = store.dispatch(combineWithModuleName(TEMPLATE, REQUEST_INTEREST_TEMPLATE));
        }

        try {
            await Promise.all([regionsPromise, interestsPromise]);
        } catch (e) {
            console.warn(e);
            let catchPromise = Promise.resolve();
            if (routePathWhenFail) {
                catchPromise = router.push(routePathWhenFail);
            }
            catchPromise.then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY));
        } finally {
            if (withLoading) {
                store.commit(combineWithModuleName(COMMON, CHANGE_LOADING), false);
            }
        }
    },
};

export { actionsFetcherService };
