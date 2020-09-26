import _ from '@/utils/lodashWrapper.js';
import { getterHelper } from '@/store/helper/getterHelper.js';
import store from '@/store';
import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';
import { REQUEST_INTEREST_TEMPLATE, REQUEST_LOCATION_TEMPLATE, TEMPLATE } from '@/store/type/template_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { MESSAGE } from '@/utils/constant/constant.js';

const actionsFetcherService = {
    async fetchInterestAndLocationTemplate(withLoading, failCallBack) {
        if (!_.isEmpty(getterHelper.rootLocations()) && !_.isEmpty(getterHelper.rootInterests())) {
            return;
        }

        let locationsPromise;
        let interestsPromise;

        if (withLoading) {
            store.commit(`${COMMON}/${CHANGE_LOADING}`, true);
        }

        if (_.isEmpty(getterHelper.rootLocations())) {
            locationsPromise = store.dispatch(`${TEMPLATE}/${REQUEST_LOCATION_TEMPLATE}`);
        }

        if (_.isEmpty(getterHelper.rootInterests())) {
            interestsPromise = store.dispatch(`${TEMPLATE}/${REQUEST_INTEREST_TEMPLATE}`);
        }

        try {
            await Promise.all([locationsPromise, interestsPromise]);
        } catch (e) {
            if (failCallBack) {
                failCallBack();
            }
            mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY);
        } finally {
            if (withLoading) {
                store.commit(`${COMMON}/${CHANGE_LOADING}`, false);
            }
        }
    },
};

export { actionsFetcherService };
