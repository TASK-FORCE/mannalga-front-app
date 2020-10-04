import {
    ADD_NEXT_CLUB_LIST,
    ADD_NEXT_MY_CLUB_LIST,
    CHANGE_CLUB_LIST_WITH_PAGE,
    CHANGE_INTEREST_SEARCH_FILTER,
    CHANGE_IS_REQUESTING_NEXT_PAGE, CHANGE_MY_CLUB_LIST_WITH_PAGE,
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
import { actionsLoadingTemplate } from '@/store/helper/actionsTemplate.js';
import { requestClubListWithPage, requestMyClubListWithPage } from '@/apis/clubList.js';
import { transformService } from '@/store/service/transformService.js';
import { extractResponseData } from '@/store/helper/vuexUtils.js';

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
            const response = await requestClubListWithPage(buildClubListRequestParam(state));
            commit(CHANGE_CLUB_LIST_WITH_PAGE, extractClubListAndPage(response));
        };
        return actionsLoadingTemplate(commit, callback);
    },
    [REQUEST_NEXT_CLUB_LIST]({ commit, state }) {
        const clubPage = state[CLUB_PAGE];
        const callback = async () => {
            const response = await requestClubListWithPage(buildClubListRequestParam(state));
            commit(ADD_NEXT_CLUB_LIST, extractClubListAndPage(response));
        };
        return requestNextClubList(commit, clubPage, callback);
    },
    [REQUEST_FIRST_MY_CLUB_LIST]({ commit, state }) {
        commit(INIT_MY_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const response = await requestMyClubListWithPage(buildMyClubListRequestParam(state));
            commit(CHANGE_MY_CLUB_LIST_WITH_PAGE, extractClubListAndPage(response));
        };
        return actionsLoadingTemplate(commit, callback);
    },
    [REQUEST_NEXT_MY_CLUB_LIST]({ commit, state }) {
        const clubPage = state[CLUB_PAGE];
        const callback = async () => {
            const response = await requestMyClubListWithPage(buildMyClubListRequestParam(state));
            commit(ADD_NEXT_MY_CLUB_LIST, extractClubListAndPage(response));
        };
        return requestNextClubList(commit, clubPage, callback);
    },
};

function requestNextClubList(commit, pageInfo, callback) {
    if (pageInfo.isLastPage) {
        return Promise.resolve();
    }

    const commitInfo = {
        commit,
        name: CHANGE_IS_REQUESTING_NEXT_PAGE,
    };

    return actionsLoadingTemplate(commitInfo, callback);
}

function extractClubListAndPage(response) {
    const data = extractResponseData(response);
    const clubList = data.content;
    const clubPage = transformService.transformToPage(data);
    return { clubList, clubPage };
}

function buildClubListRequestParam(state) {
    const { size, nextPage } = state[CLUB_PAGE];
    return {
        size,
        page: nextPage,
        searchOptions: { ...(state[SEARCH_FILTER]) },
    };
}

function buildMyClubListRequestParam(state) {
    const { size, nextPage } = state[CLUB_PAGE];
    return {
        size,
        page: nextPage,
    };
}

export default {
    state,
    getters,
    mutations,
    actions,
};
