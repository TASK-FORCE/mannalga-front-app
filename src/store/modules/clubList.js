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
    SEARCH_FILTER,
} from '@/store/type/club_list_type.js';
import { actionsLoadingTemplate } from '@/store/helper/helper.js';
import { requestClubListWithPage } from '@/apis/clubList.js';
import { transformService } from '@/store/helper/transform.js';

const state = {
    [CLUB_LIST]: [],
    [CLUB_PAGE]: {},
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
        state[CLUB_PAGE] = {};
    },
};

const actions = {
    /** TODO
     * 백엔드에서 page 정보가 제대로 정해지면 actions를 호출하는 곳에서 requestParam을 넘겨주도록 변경하자.
     */
    [REQUEST_FIRST_CLUB_LIST]({ commit, state }) {
        commit(INIT_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const response = await requestClubListWithPage(requestParamWithFirstPage(state));
            commit(CHANGE_CLUB_LIST_WITH_PAGE, extractClubListAndPage(response));
        };
        return actionsLoadingTemplate(commit, callback);
    },
    [REQUEST_NEXT_CLUB_LIST]({ commit, state }) {
        if (state[CLUB_PAGE].isLastPage) {
            return Promise.resolve();
        }

        const commitInfo = {
            commit,
            name: CHANGE_IS_REQUESTING_NEXT_PAGE,
        };

        const callback = async () => {
            const response = await requestClubListWithPage(requestParamWithNextPage(state));
            commit(ADD_NEXT_CLUB_LIST, extractClubListAndPage(response));
        };

        return actionsLoadingTemplate(commitInfo, callback);
    },
};

function extractClubListAndPage(response) {
    const { data } = response.data;
    const clubList = data.content;
    const clubPage = transformService.transformPage(data);
    return { clubList, clubPage };
}

const requestParamWithFirstPage = (state) => ({
    size: 20,
    offset: 0,
    searchOptions: { ...(state[SEARCH_FILTER]) },
});

const requestParamWithNextPage = (state) => {
    const { size, nextPage } = state[CLUB_PAGE];
    return {
        size,
        offset: nextPage, // TODO 백엔드가 변경해주면 변경하자.
        searchOptions: { ...(state[SEARCH_FILTER]) },
    };
};
export default {
    state,
    getters,
    mutations,
    actions,
};
