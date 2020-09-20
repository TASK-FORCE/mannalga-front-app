import _ from '@/utils/lodashWrapper.js';

const EMPTY_CLUB_LIST_WITH_PAGE = {
    clubs: [
        // {
        //     seq: 0,
        //     name: '',
        //     description: '',
        //     maximumNumber: 0,
        //     userCount: 0,
        //     mainImageUrl: '',
        //     interests: [{
        //         seq: 0,
        //         name: '',
        //     }],
        //     states: [{
        //         seq: 0,
        //         name: '',
        //         superStateRoot: '',
        //         level: 0,
        //     }],
        // },
    ],
    page: {
        size: 15,
        totalElements: 0,
        totalPages: 0,
        number: 0,
    },
};

const EMPTY_SEARCH_FILTER = {
    stateList: [],
    interestList: [],
};

export const DEFAULT_CLUB_LIST_WITH_PAGE = _.cloneDeep(EMPTY_CLUB_LIST_WITH_PAGE);
export const DEFAULT_SEARCH_FILTER = _.cloneDeep(EMPTY_SEARCH_FILTER);

// module name
export const CLUB_LIST_MODULE = 'clubList';

// state, getters
export const CLUB_LIST_WITH_PAGE = 'clubListWithPage';
export const SEARCH_FILTER = 'searchFilter';
export const IS_REQUESTING_NEXT_PAGE = 'isRequestingNextPage';
export const CAN_REQUEST_NEXT_PAGE = 'canRequestNextPage';

// mutations
export const ADD_NEXT_CLUB_LIST = 'addNextClubList';
export const CHANGE_CLUB_LIST_WITH_PAGE = 'changeClubListWithPage';
export const CHANGE_LOCATION_SEARCH_FILTER = 'changeLocationSearchFilter';
export const CHANGE_INTEREST_SEARCH_FILTER = 'changeInterestSearchFilter';
export const CHANGE_IS_REQUESTING_NEXT_PAGE = 'changeIsRequestingNextPage';

// actions
export const REQUEST_FIRST_CLUB_LIST = 'requestFirstClubList';
export const REQUEST_NEXT_CLUB_LIST = 'requestNextClubList';
