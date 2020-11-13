import _ from '@/utils/common/lodashWrapper.js';
import store from '@/store';
import router from '@/router';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';

function isCached() {
    return _.isNotEmpty(gettersHelper.rootRegions()) && _.isNotEmpty(gettersHelper.rootInterests());
}

function requestRegions() {
    if (_.isEmpty(gettersHelper.rootRegions())) {
        return store.dispatch(combineWithModuleName('template', 'requestRegionTemplate'));
    }
    return Promise.resolve();
}

function requestInterests() {
    if (_.isEmpty(gettersHelper.rootInterests())) {
        return store.dispatch(combineWithModuleName('template', 'requestInterestTemplate'));
    }
    return Promise.resolve();
}

function handlingError(routePathWhenFail) {
    let catchPromise = Promise.resolve();
    if (routePathWhenFail) {
        catchPromise = router.push(routePathWhenFail);
    }
    catchPromise.then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY));
}

class RegionAndInterestRequester {
    async request(withLoading, routePathWhenFail) {
        if (isCached()) {
            return;
        }

        try {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(true);
            }
            await Promise.all([requestRegions(), requestInterests()]);
        } catch (e) {
            console.warn(e);
            handlingError(routePathWhenFail);
        } finally {
            if (withLoading) {
                mutationsHelper.changeCommonLoading(false);
            }
        }
    }
}

const regionAndInterestRequester = new RegionAndInterestRequester();
export default regionAndInterestRequester;
