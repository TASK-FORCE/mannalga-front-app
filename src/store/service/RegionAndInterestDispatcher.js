import _ from '@/utils/common/lodashWrapper.js';
import store from '@/store';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import RequestHelper from '@/store/service/helper/RequestHelper.js';

function isCached() {
    return _.isNotEmpty(gettersHelper.rootRegions()) && _.isNotEmpty(gettersHelper.rootInterests());
}

function dispatchRegions() {
    if (_.isEmpty(gettersHelper.rootRegions())) {
        return store.dispatch(combineWithModuleName('template', 'requestRegionTemplate'));
    }
    return Promise.resolve();
}

function dispatchInterests() {
    if (_.isEmpty(gettersHelper.rootInterests())) {
        return store.dispatch(combineWithModuleName('template', 'requestInterestTemplate'));
    }
    return Promise.resolve();
}

class RegionAndInterestDispatcher {
    async dispatch(withLoading, routePathWhenFail) {
        if (isCached()) {
            return;
        }
        const promiseList = [dispatchRegions(), dispatchInterests()];
        RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
    }
}

const regionAndInterestDispatcher = new RegionAndInterestDispatcher();
export default regionAndInterestDispatcher;
