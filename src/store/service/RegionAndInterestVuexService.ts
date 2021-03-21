import _ from '@/utils/common/lodashWrapper.ts';
import gettersHelper from '@/store/helper/GettersHelper.js';
import RequestHelper from '@/store/service/helper/RequestHelper.ts';
import actionsHelper from '@/store/helper/ActionsHelper.ts';


class RegionAndInterestVuexService {

    private isDispatching: boolean;

    constructor() {
        this.isDispatching = false;
    }

    async dispatch(withLoading: boolean, routePathWhenFail: string | null) {
        if (this.isCached() || this.isDispatching) {
            return;
        }
        this.isDispatching = true;
        const promiseList: Promise<any>[] = [
            this.dispatchRegions(),
            this.dispatchInterests()
        ];
        await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
        this.isDispatching = false;
    }

    isCached() {
        return !_.isEmpty(gettersHelper.rootRegions()) && !_.isEmpty(gettersHelper.rootInterests());
    }

    dispatchRegions(): Promise<any> {
        if (_.isEmpty(gettersHelper.rootRegions())) {
            return actionsHelper.requestRegionTemplate(null);
        }
        return Promise.resolve();
    }

    dispatchInterests(): Promise<any> {
        if (_.isEmpty(gettersHelper.rootInterests())) {
            return actionsHelper.requestInterestTemplate(null);
        }
        return Promise.resolve();
    }
}

const regionAndInterestVuexService = new RegionAndInterestVuexService();
export default regionAndInterestVuexService;
