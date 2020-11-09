import _ from '@/utils/common/lodashWrapper.js';
import store from '@/store';
import router from '@/router';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

const actionsFetcherService = {
    async fetchInterestAndRegionTemplate(withLoading, routePathWhenFail) {
        if (!_.isEmpty(gettersHelper.rootRegions()) && !_.isEmpty(gettersHelper.rootInterests())) {
            return;
        }

        let regionsPromise;
        let interestsPromise;

        if (withLoading) {
            store.commit(combineWithModuleName(MODULE.COMMON, 'changeLoading'), true);
        }

        if (_.isEmpty(gettersHelper.rootRegions())) {
            regionsPromise = store.dispatch(combineWithModuleName('template', 'requestRegionTemplate'));
        }

        if (_.isEmpty(gettersHelper.rootInterests())) {
            interestsPromise = store.dispatch(combineWithModuleName('template', 'requestInterestTemplate'));
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
                store.commit(combineWithModuleName(MODULE.COMMON, 'changeLoading'), false);
            }
        }
    },
};

export { actionsFetcherService };
