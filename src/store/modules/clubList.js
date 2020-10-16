import {
    ADD_NEXT_CLUB_LIST,
    ADD_NEXT_MY_CLUB_LIST,
    CHANGE_CLUB_LIST_WITH_PAGE,
    CHANGE_INTEREST_SEARCH_FILTER,
    CHANGE_IS_REQUESTING_NEXT_PAGE,
    CHANGE_MY_CLUB_LIST_WITH_PAGE,
    CHANGE_REGION_SEARCH_FILTER,
    CLUB_LIST,
    CLUB_PAGE,
    DEFAULT_SEARCH_FILTER,
    GET_DEFAULT_PAGE,
    INIT_CLUB_LIST_AND_PAGE,
    INIT_MY_CLUB_LIST_AND_PAGE,
    IS_REQUESTING_NEXT_PAGE,
    MY_CLUB_LIST,
    MY_CLUB_PAGE,
    REQUEST_FIRST_CLUB_LIST,
    REQUEST_FIRST_MY_CLUB_LIST,
    REQUEST_NEXT_CLUB_LIST,
    REQUEST_NEXT_MY_CLUB_LIST,
    SEARCH_FILTER,
} from '@/store/type/club_list_type.js';
import { actionsLoadingTemplate } from '@/store/utils/actionsTemplate.js';
import { requestClubListWithPage, requestMyClubListWithPage } from '@/apis/clubList.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    [CLUB_LIST]: [],
    [CLUB_PAGE]: GET_DEFAULT_PAGE(),
    [MY_CLUB_LIST]: [],
    [MY_CLUB_PAGE]: GET_DEFAULT_PAGE(),
    [SEARCH_FILTER]: DEFAULT_SEARCH_FILTER,
    [IS_REQUESTING_NEXT_PAGE]: false,
};

const getters = {
    [CLUB_LIST]: (state) => state[CLUB_LIST],
    [CLUB_PAGE]: (state) => state[CLUB_PAGE],
    [SEARCH_FILTER]: (state) => state[SEARCH_FILTER],
    [MY_CLUB_LIST]: (state) => state[MY_CLUB_LIST],
    [MY_CLUB_PAGE]: (state) => state[MY_CLUB_PAGE],
};

const mutations = {
    [CHANGE_INTEREST_SEARCH_FILTER](state, interestFilter) {
        state[SEARCH_FILTER].interestList = [interestFilter];
    },
    [CHANGE_REGION_SEARCH_FILTER](state, regionFilter) {
        state[SEARCH_FILTER].regionList = [regionFilter];
    },
    [CHANGE_CLUB_LIST_WITH_PAGE](state, { clubList, clubPage }) {
        state[CLUB_LIST] = clubList;
        state[CLUB_PAGE] = clubPage;
    },
    [CHANGE_MY_CLUB_LIST_WITH_PAGE](state, { clubList, clubPage }) {
        state[MY_CLUB_LIST] = clubList;
        state[MY_CLUB_PAGE] = clubPage;
    },
    [ADD_NEXT_CLUB_LIST](state, { clubList, clubPage }) {
        const currentClubList = state[CLUB_LIST];
        state[CLUB_LIST] = [...currentClubList, ...clubList];
        state[CLUB_PAGE] = clubPage;
    },
    [ADD_NEXT_MY_CLUB_LIST](state, { clubList, clubPage }) {
        const currentClubList = state[CLUB_LIST];
        state[MY_CLUB_LIST] = [...currentClubList, ...clubList];
        state[MY_CLUB_PAGE] = clubPage;
    },
    [CHANGE_IS_REQUESTING_NEXT_PAGE](state, loading) {
        state[IS_REQUESTING_NEXT_PAGE] = loading;
    },
    [INIT_CLUB_LIST_AND_PAGE](state) {
        state[CLUB_LIST] = [];
        state[CLUB_PAGE] = GET_DEFAULT_PAGE();
    },
    [INIT_MY_CLUB_LIST_AND_PAGE](state) {
        state[MY_CLUB_LIST] = [];
        state[MY_CLUB_PAGE] = GET_DEFAULT_PAGE();
    },
};

const actions = {
    [REQUEST_FIRST_CLUB_LIST]({ commit, state }) {
        commit(INIT_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const requestParam = RequestConverter.converterClubList(state[CLUB_PAGE], state[SEARCH_FILTER]);
            const clubListInfo = await requestClubListWithPage(requestParam);
            commit(CHANGE_CLUB_LIST_WITH_PAGE, clubListInfo);
        };
        return actionsLoadingTemplate(commit, callback);
    },
    [REQUEST_NEXT_CLUB_LIST]({ commit, state }) {
        if (state[CLUB_PAGE].isLastPage) {
            return Promise.resolve();
        }

        if (state[CLUB_LIST].length > 1000) { // 랜딩 부하 방지를 위해 리스트 최대 개수를 정해놓자.
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.converterClubList(state[CLUB_PAGE], state[SEARCH_FILTER]);
            const clubListInfo = await requestClubListWithPage(requestParam);
            commit(ADD_NEXT_CLUB_LIST, clubListInfo);
        };
        return actionsLoadingTemplate({ commit, name: CHANGE_IS_REQUESTING_NEXT_PAGE }, callback);
    },
    [REQUEST_FIRST_MY_CLUB_LIST]({ commit, state }) {
        commit(INIT_MY_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const requestParam = RequestConverter.converterMyClubList(state[MY_CLUB_PAGE]);
            const clubListInfo = await requestMyClubListWithPage(requestParam);
            commit(CHANGE_MY_CLUB_LIST_WITH_PAGE, clubListInfo);
        };
        return actionsLoadingTemplate(commit, callback);
    },
    [REQUEST_NEXT_MY_CLUB_LIST]({ commit, state }) {
        if (state[MY_CLUB_PAGE].isLastPage) {
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.converterMyClubList(state[MY_CLUB_PAGE]);
            const clubListInfo = await requestMyClubListWithPage(requestParam);
            commit(ADD_NEXT_MY_CLUB_LIST, clubListInfo);
        };
        return actionsLoadingTemplate({ commit, name: CHANGE_IS_REQUESTING_NEXT_PAGE }, callback);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
