import _ from '@/utils/common/lodashWrapper.ts';
import store from '@/store';
import RequestHelper from '@/store/service/helper/RequestHelper.ts';
import { CommonActionTypes } from '@/store/type/actionTypes';
import { InterestGroupTree, RegionTree } from '@/interfaces/common';


class RegionAndInterestVuexService {

  private isDispatching: boolean;

  constructor() {
    this.isDispatching = false;
  }

  async dispatch(withLoading: boolean) {
    if (this.isCached() || this.isDispatching) {
      return;
    }
    this.isDispatching = true;
    const promiseList: Promise<any>[] = [
      this.dispatchRegions(),
      this.dispatchInterests()
    ];
    await RequestHelper.dispatchAll(withLoading, promiseList);
    this.isDispatching = false;
  }

  isCached() {
    return !_.isEmpty(this.getRootRegions()) && !_.isEmpty(this.getRootInterests());
  }

  dispatchRegions(): Promise<any> {
    if (_.isEmpty(this.getRootRegions())) {
      return store.dispatch(CommonActionTypes.REQUEST_ROOT_REGIONS);
    }
    return Promise.resolve();
  }

  dispatchInterests(): Promise<any> {
    if (_.isEmpty(this.getRootInterests())) {
      return store.dispatch(CommonActionTypes.REQUEST_ROOT_INTERESTS);
    }
    return Promise.resolve();
  }

  getRootRegions(): RegionTree[] {
    return store.state.common.rootRegions;
  }

  getRootInterests(): InterestGroupTree[] {
    return store.state.common.rootInterests;
  }
}

const regionAndInterestVuexService = new RegionAndInterestVuexService();
export default regionAndInterestVuexService;
