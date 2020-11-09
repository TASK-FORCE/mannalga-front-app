import _ from '@/utils/common/lodashWrapper.js';

const EMPTY_SEARCH_FILTER = {
    regionList: [],
    interestList: [],
};

export const DEFAULT_SEARCH_FILTER = _.cloneDeep(EMPTY_SEARCH_FILTER);
export const GET_DEFAULT_PAGE = () => ({ size: 20, currentPage: 0, nextPage: 0, isLastPage: false });
export const GET_DEFAULT_MY_CLUB_CONTEXT = () => ({
    seq: 0,
    userSeq: 0,
    club: {
        seq: 0,
        name: null,
        description: null,
        maximumNumber: 0,
        userCount: 0,
        mainImageUrl: null,
    },
    roles: [],
});

// module name
export const CLUB_LIST_MODULE = 'clubList';

// state, getters
export const CLUB_LIST = 'clubList';
export const CLUB_PAGE = 'clubPage';
export const MY_CLUB_LIST = 'myClubList';
export const MY_CLUB_PAGE = 'myClubPage';
export const IS_REQUESTING_NEXT_PAGE = 'isRequestingNextPage';

// mutations
export const ADD_NEXT_CLUB_LIST = 'addNextClubList';
export const ADD_NEXT_MY_CLUB_LIST = 'addNextMyClubList';
export const CHANGE_CLUB_LIST_WITH_PAGE = 'changeClubListWithPage';
export const CHANGE_MY_CLUB_LIST_WITH_PAGE = 'changeMyClubListWithPage';
export const CHANGE_IS_REQUESTING_NEXT_PAGE = 'changeIsRequestingNextPage';
export const INIT_CLUB_LIST_AND_PAGE = 'initClubListAndPage';
export const INIT_MY_CLUB_LIST_AND_PAGE = 'initMyClubListAndPage';

// actions
export const REQUEST_FIRST_CLUB_LIST = 'requestFirstClubList';
export const REQUEST_NEXT_CLUB_LIST = 'requestNextClubList';

export const REQUEST_FIRST_MY_CLUB_LIST = 'requestFirstMyClubList';
export const REQUEST_NEXT_MY_CLUB_LIST = 'requestNextMyClubList';
