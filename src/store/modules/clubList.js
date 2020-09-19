import {
    ADD_NEXT_CLUB_LIST,
    CAN_REQUEST_NEXT_PAGE,
    CHANGE_CLUB_LIST_WITH_PAGE,
    CHANGE_INTEREST_SEARCH_FILTER,
    CHANGE_IS_REQUESTING_NEXT_PAGE,
    CHANGE_LOCATION_SEARCH_FILTER,
    CLUB_LIST_WITH_PAGE,
    DEFAULT_CLUB_LIST_WITH_PAGE,
    DEFAULT_SEARCH_FILTER,
    IS_REQUESTING_NEXT_PAGE,
    REQUEST_FIRST_CLUB_LIST,
    REQUEST_NEXT_CLUB_LIST,
    SEARCH_FILTER,
} from '@/store/type/club_list_type.js';
import { actionsLoadingTemplate } from '@/store/helper/helper.js';
import { requestClubsWithPage } from '@/apis/clubList.js';

const state = {
    [CLUB_LIST_WITH_PAGE]: DEFAULT_CLUB_LIST_WITH_PAGE,
    [SEARCH_FILTER]: DEFAULT_SEARCH_FILTER,
    [IS_REQUESTING_NEXT_PAGE]: false,
};

const getters = {
    [CLUB_LIST_WITH_PAGE](state) {
        return state[CLUB_LIST_WITH_PAGE];
    },
    [SEARCH_FILTER](state) {
        return state[SEARCH_FILTER];
    },
    [CAN_REQUEST_NEXT_PAGE](state, _, rootState) {
        const { isLastPage } = state[CLUB_LIST_WITH_PAGE].page;
        const { loading } = rootState.common;
        const isRequestingNextPage = state[IS_REQUESTING_NEXT_PAGE];
        return !isLastPage && !isRequestingNextPage && !loading;
    },
};

const mutations = {
    [CHANGE_INTEREST_SEARCH_FILTER](state, interestFilter) {
        state[SEARCH_FILTER].interestList = [interestFilter];
    },
    [CHANGE_LOCATION_SEARCH_FILTER](state, locationFilter) {
        state[SEARCH_FILTER].stateList = [locationFilter];
    },
    [CHANGE_CLUB_LIST_WITH_PAGE](state, clubsWithPage) {
        state[CLUB_LIST_WITH_PAGE] = clubsWithPage;
    },
    [ADD_NEXT_CLUB_LIST](state, clubsWithPage) {
        const { clubs: currentClubs } = state[CLUB_LIST_WITH_PAGE];
        state[CLUB_LIST_WITH_PAGE].clubs = [...currentClubs, ...clubsWithPage.clubs];
        state[CLUB_LIST_WITH_PAGE].page = clubsWithPage.page;
    },
    [CHANGE_IS_REQUESTING_NEXT_PAGE](state, loading) {
        state[IS_REQUESTING_NEXT_PAGE] = loading;
    },
};

const actions = {
    /** TODO
     * 백엔드에서 page 정보가 제대로 정해지면 actions를 호출하는 곳에서 requestParam을 넘겨주도록 변경하자.
     */
    [REQUEST_FIRST_CLUB_LIST]({ commit, state }) {
        const callback = async () => {
            const searchFilter = state[SEARCH_FILTER];
            const response = await requestClubsWithPage(
                {
                    size: 10,
                    offset: 0,
                    ...searchFilter,
                },
            );
            const clubsWithPage = response.data;
            commit(CHANGE_CLUB_LIST_WITH_PAGE, clubsWithPage);
        };
        return actionsLoadingTemplate(commit, callback);
    },
    async [REQUEST_NEXT_CLUB_LIST]({ commit, state }) {
        const commitInfo = {
            commit,
            name: CHANGE_IS_REQUESTING_NEXT_PAGE,
        };
        const callback = async () => {
            const searchFilter = state[SEARCH_FILTER];
            const { page } = state[CLUB_LIST_WITH_PAGE];
            if (page.isLastPage) {
                return;
            }
            const response = await requestClubsWithPage(
                {
                    size: page.size,
                    offset: ((page.number + 1) * page.size) + 1,
                    ...searchFilter,
                },
            );
            const clubsWithPage = response.data;
            commit(ADD_NEXT_CLUB_LIST, clubsWithPage);
        };
        return actionsLoadingTemplate(commitInfo, callback);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
