import store from '@/store';
import { CLOSE_SNACKBAR, COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { CHANGE_INTEREST_SEARCH_FILTER, CHANGE_REGION_SEARCH_FILTER, CLUB_LIST_MODULE } from '@/store/type/club_list_type.js';
import { ADD_SELECTED_INTEREST_SEQS, ADD_SELECTED_REGIONS, CHANGE_PROFILE_NAME, REMOVE_SELECTED_INTEREST_SEQS, USER } from '@/store/type/user_type.js';
import { combineWithModuleName, createSnackbarOption } from '@/store/helper/vuexUtils.js';

const mutationsHelper = {
    // auth module

    // club module

    // clubList module
    changeRegionSearchFilter: (payload) => commit(CLUB_LIST_MODULE, CHANGE_REGION_SEARCH_FILTER, payload),
    changeInterestSearchFilter: (payload) => commit(CLUB_LIST_MODULE, CHANGE_INTEREST_SEARCH_FILTER, payload),

    // common module
    closeSnackBar: (payload) => commit(COMMON, CLOSE_SNACKBAR, payload),
    openSnackBar: (payload) => commit(COMMON, OPEN_SNACKBAR, createSnackbarOption(payload)),

    // template module

    // user module
    changeProfileName: (payload) => commit(USER, CHANGE_PROFILE_NAME, payload),
    addSelectedRegions: (payload) => commit(USER, ADD_SELECTED_REGIONS, payload),
    addSelectedInterestSeqs: (payload) => commit(USER, ADD_SELECTED_INTEREST_SEQS, payload),
    removeSelectedInterestSeqs: (payload) => commit(USER, REMOVE_SELECTED_INTEREST_SEQS, payload),
};

const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

export { mutationsHelper };
