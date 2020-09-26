import store from '@/store';
import { COMMON, IS_LOADING, SNACKBAR_OPTIONS } from '@/store/type/common_type.js';
import { ROOT_INTERESTS, ROOT_LOCATIONS, TEMPLATE } from '@/store/type/template_type.js';
import { PROFILE, SELECTED_INTEREST_SEQS, SELECTED_LOCATIONS, USER } from '@/store/type/user_type.js';
import { AUTH } from '@/store/type/auth_type.js';
import { CLUB_LIST, CLUB_LIST_MODULE, CLUB_PAGE, IS_LAST_PAGE, SEARCH_FILTER } from '@/store/type/club_list_type.js';

const { getters } = store;

const getterHelper = {
    isLoading: () => get(COMMON, IS_LOADING),
    snackBarOptions: () => get(COMMON, SNACKBAR_OPTIONS),

    isAuth: () => get(AUTH, 'isAuth'),
    appToken: () => get(AUTH, 'appToken'),

    rootLocations: () => get(TEMPLATE, ROOT_LOCATIONS),
    rootInterests: () => get(TEMPLATE, ROOT_INTERESTS),

    profile: () => get(USER, PROFILE),
    selectedLocations: () => get(USER, SELECTED_LOCATIONS),
    selectedInterestSeqs: () => get(USER, SELECTED_INTEREST_SEQS),

    clubList: () => get(CLUB_LIST_MODULE, CLUB_LIST),
    clubPage: () => get(CLUB_LIST_MODULE, CLUB_PAGE),
    searchFilter: () => get(CLUB_LIST_MODULE, SEARCH_FILTER),
    isLastPage: () => get(CLUB_LIST_MODULE, IS_LAST_PAGE),
};

const get = (moduleName, getterName) => getters[`${moduleName}/${getterName}`];

export { getterHelper };
