import store from '@/store';
import { CLOSE_SNACKBAR, COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { ADD_SELECTED_INTEREST_SEQS, ADD_SELECTED_REGIONS, CHANGE_PROFILE_NAME, REMOVE_SELECTED_INTEREST_SEQS, USER } from '@/store/type/user_type.js';
import { combineWithModuleName, createSnackbarOption } from '@/store/utils/vuexUtils.js';

const mutationsHelper = {
    // auth module

    // club module

    // clubList module

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
