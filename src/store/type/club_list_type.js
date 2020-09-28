import _ from '@/utils/lodashWrapper.js';

const EMPTY_SEARCH_FILTER = {
    stateList: [],
    interestList: [],
};

export const DEFAULT_SEARCH_FILTER = _.cloneDeep(EMPTY_SEARCH_FILTER);
export const GET_DEFAULT_CLUB_LIST_PAGE = () => ({ size: 20, currentPage: 0, nextPage: 0, isLastPage: false });

// module name
export const CLUB_LIST_MODULE = 'clubList';

// state, getters
export const CLUB_LIST = 'clubList';
export const CLUB_PAGE = 'clubPage';
export const SEARCH_FILTER = 'searchFilter';
export const IS_REQUESTING_NEXT_PAGE = 'isRequestingNextPage';
export const IS_LAST_PAGE = 'isLastPage';
export const IS_FIRST_PAGE = 'isFirstPage';

// mutations
export const ADD_NEXT_CLUB_LIST = 'addNextClubList';
export const CHANGE_CLUB_LIST_WITH_PAGE = 'changeClubListWithPage';
export const CHANGE_LOCATION_SEARCH_FILTER = 'changeLocationSearchFilter';
export const CHANGE_INTEREST_SEARCH_FILTER = 'changeInterestSearchFilter';
export const CHANGE_IS_REQUESTING_NEXT_PAGE = 'changeIsRequestingNextPage';
export const INIT_CLUB_LIST_AND_PAGE = 'initClubListAndPage';

// actions
export const REQUEST_FIRST_CLUB_LIST = 'requestFirstClubList';
export const REQUEST_NEXT_CLUB_LIST = 'requestNextClubList';
