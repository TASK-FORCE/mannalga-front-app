import store from '@/store';
import { buildSnackBarOption, SnackBarOption } from '@/utils/snackbarUtils.js';
import { CLOSE_SNACKBAR, COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { CHANGE_INTEREST_SEARCH_FILTER, CHANGE_LOCATION_SEARCH_FILTER, CLUB_LIST_MODULE } from '@/store/type/club_list_type.js';
import { ADD_SELECTED_INTEREST_SEQS, ADD_SELECTED_LOCATIONS, CHANGE_PROFILE_NAME, REMOVE_SELECTED_INTEREST_SEQS, USER } from '@/store/type/user_type.js';

const mutationsHelper = {
    closeSnackBar: (payload) => commit(COMMON, CLOSE_SNACKBAR, payload),
    openSnackBar: (payload) => commit(COMMON, OPEN_SNACKBAR, snackbarOption(payload)),

    changeProfileName: (payload) => commit(USER, CHANGE_PROFILE_NAME, payload),
    addSelectedLocations: (payload) => commit(USER, ADD_SELECTED_LOCATIONS, payload),
    addSelectedInterestSeqs: (payload) => commit(USER, ADD_SELECTED_INTEREST_SEQS, payload),
    removeSelectedInterestSeqs: (payload) => commit(USER, REMOVE_SELECTED_INTEREST_SEQS, payload),

    changeLocationSearchFilter: (payload) => commit(CLUB_LIST_MODULE, CHANGE_LOCATION_SEARCH_FILTER, payload),
    changeInterestSearchFilter: (payload) => commit(CLUB_LIST_MODULE, CHANGE_INTEREST_SEARCH_FILTER, payload),
};

const commit = (moduleName, commitName, payload) => store.commit(`${moduleName}/${commitName}`, payload);

const snackbarOption = (value) => {
    let snackBarOption;
    if (value instanceof SnackBarOption) {
        snackBarOption = value;
    } else if (typeof value === 'string') {
        snackBarOption = buildSnackBarOption(value);
    } else {
        snackBarOption = buildSnackBarOption();
    }
    return snackBarOption;
};

export { mutationsHelper };
