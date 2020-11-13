import store from '@/store';
import { combineWithModuleName, createSnackbarOption } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class MutationsHelper {
    // clubList module
    changeClubSearchFilterInfo = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchFilterInfo', payload);

    // common module
    closeSnackBar = (payload) => commit(MODULE.COMMON, 'closeSnackBar', payload);
    openSnackBar = (payload) => commit(MODULE.COMMON, 'openSnackBar', createSnackbarOption(payload));
    changeCommonLoading = (payload) => commit(MODULE.COMMON, 'changeLoading', payload);

    // user module
    changeProfileName = (payload) => commit(MODULE.USER, 'changeProfileName', payload);
    addSelectedRegions = (payload) => commit(MODULE.USER, 'addSelectedRegions', payload);
    addSelectedInterestSeqs = (payload) => commit(MODULE.USER, 'addSelectedInterestSeqs', payload);
    removeSelectedInterestSeqs = (payload) => commit(MODULE.USER, 'removeSelectedInterestSeqs', payload);
}

const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

const mutationsHelper = new MutationsHelper();
export default mutationsHelper;
