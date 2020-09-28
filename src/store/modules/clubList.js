import {
    ADD_NEXT_CLUB_LIST,
    IS_LAST_PAGE,
    CHANGE_CLUB_LIST_WITH_PAGE,
    CHANGE_INTEREST_SEARCH_FILTER,
    CHANGE_IS_REQUESTING_NEXT_PAGE,
    CHANGE_LOCATION_SEARCH_FILTER,
    CLUB_LIST, CLUB_PAGE,
    DEFAULT_SEARCH_FILTER, INIT_CLUB_LIST_AND_PAGE,
    IS_REQUESTING_NEXT_PAGE,
    REQUEST_FIRST_CLUB_LIST,
    REQUEST_NEXT_CLUB_LIST,
    SEARCH_FILTER, GET_DEFAULT_CLUB_LIST_PAGE, IS_FIRST_PAGE,
} from '@/store/type/club_list_type.js';
import { actionsLoadingTemplate } from '@/store/helper/actionsTemplate.js';
import { requestClubListWithPage } from '@/apis/clubList.js';
import { transformService } from '@/store/service/transformService.js';
import { extractResponseData } from '@/store/helper/vuexUtils.js';

const state = {
    [CLUB_LIST]: [],
    [CLUB_PAGE]: GET_DEFAULT_CLUB_LIST_PAGE(),
    [SEARCH_FILTER]: DEFAULT_SEARCH_FILTER,
    [IS_REQUESTING_NEXT_PAGE]: false,
};

const getters = {
    [CLUB_LIST](state) {
        return state[CLUB_LIST];
    },
    [CLUB_PAGE](state) {
        return state[CLUB_PAGE];
    },
    [SEARCH_FILTER](state) {
        return state[SEARCH_FILTER];
    },
    [IS_LAST_PAGE](state) {
        const { isLastPage } = state[CLUB_PAGE];
        return isLastPage;
    },
    [IS_FIRST_PAGE](state) {
        const { currentPage } = state[CLUB_PAGE];
        return currentPage === 0;
    },
};

const mutations = {
    [CHANGE_INTEREST_SEARCH_FILTER](state, interestFilter) {
        state[SEARCH_FILTER].interestList = [interestFilter];
    },
    [CHANGE_LOCATION_SEARCH_FILTER](state, locationFilter) {
        state[SEARCH_FILTER].stateList = [locationFilter];
    },
    [CHANGE_CLUB_LIST_WITH_PAGE](state, { clubList, clubPage }) {
        state[CLUB_LIST] = clubList;
        state[CLUB_PAGE] = clubPage;
    },
    [ADD_NEXT_CLUB_LIST](state, { clubList, clubPage }) {
        const currentClubList = state[CLUB_LIST];
        state[CLUB_LIST] = [...currentClubList, ...clubList];
        state[CLUB_PAGE] = clubPage;
    },
    [CHANGE_IS_REQUESTING_NEXT_PAGE](state, loading) {
        state[IS_REQUESTING_NEXT_PAGE] = loading;
    },
    [INIT_CLUB_LIST_AND_PAGE](state) {
        state[CLUB_LIST] = [];
        state[CLUB_PAGE] = GET_DEFAULT_CLUB_LIST_PAGE();
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
        if (clubPage.isLastPage) {
            return Promise.resolve();
        }

        const commitInfo = {
            commit,
            name: CHANGE_IS_REQUESTING_NEXT_PAGE,
        };

        const callback = async () => {
            const response = await requestClubListWithPage(buildClubListRequestParam(state));
            commit(ADD_NEXT_CLUB_LIST, extractClubListAndPage(response));
        };

        return actionsLoadingTemplate(commitInfo, callback);
    },
};

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
        offset: nextPage, // TODO 백엔드가 변경해주면 변경하자.
        searchOptions: { ...(state[SEARCH_FILTER]) },
    };
}
export default {
    state,
    getters,
    mutations,
    actions,
};
