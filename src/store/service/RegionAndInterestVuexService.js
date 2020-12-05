import _ from '@/utils/common/lodashWrapper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import RequestHelper from '@/store/service/helper/RequestHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

function isCached() {
    return _.isNotEmpty(gettersHelper.rootRegions()) && _.isNotEmpty(gettersHelper.rootInterests());
}

function dispatchRegions() {
    if (_.isEmpty(gettersHelper.rootRegions())) {
        return actionsHelper.requestRegionTemplate();
    }
    return Promise.resolve();
}

function dispatchInterests() {
    if (_.isEmpty(gettersHelper.rootInterests())) {
        return actionsHelper.requestInterestTemplate();
    }
    return Promise.resolve();
}

class RegionAndInterestVuexService {
    async dispatch(withLoading, routePathWhenFail) {
        if (isCached()) {
            return;
        }
        const promiseList = [dispatchRegions(), dispatchInterests()];
        await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
    }
}

const regionAndInterestVuexService = new RegionAndInterestVuexService();
export default regionAndInterestVuexService;
