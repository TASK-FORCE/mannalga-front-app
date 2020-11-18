import { actionsLoadingTemplate } from '@/store/utils/actionsTemplate.js';
import clubListApi from '@/apis/ClubListApi.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    clubList: [],
    clubPage: defaultBuilder.buildPage(),
    myClubList: [],
    myClubPage: defaultBuilder.buildPage(),
    clubSearchFilterInfo: defaultBuilder.buildClubSearchFilterInfo(),
    isRequestingNextPage: false,
};

const getters = {
    clubList: (state) => state.clubList,
    clubPage: (state) => state.clubPage,
    myClubList: (state) => state.myClubList,
    myClubPage: (state) => state.myClubPage,
    clubSearchFilterInfo: (state) => state.clubSearchFilterInfo,
};

const mutations = {
    changeClubListWithPage(state, { clubList, clubPage }) {
        state.clubList = clubList;
        state.clubPage = clubPage;
    },
    changeMyClubListWithPage(state, { clubList, clubPage }) {
        state.myClubList = clubList;
        state.myClubPage = clubPage;
    },
    addNextClubList(state, { clubList, clubPage }) {
        const currentClubList = state.clubList;
        state.clubList = [...currentClubList, ...clubList];
        state.clubPage = clubPage;
    },
    addNextMyClubList(state, { clubList, clubPage }) {
        const currentClubList = state.myClubList;
        state.myClubList = [...currentClubList, ...clubList];
        state.myClubPage = clubPage;
    },
    changeIsRequestingNextPage(state, loading) {
        state.isRequestingNextPage = loading;
    },
    initClubListAndPage(state) {
        state.clubList = [];
        state.clubPage = defaultBuilder.buildPage();
    },
    initMyClubListAndPage(state) {
        state.myClubList = [];
        state.myClubPage = defaultBuilder.buildPage();
    },
    changeClubSearchRegion(state, region) {
        state.clubSearchFilterInfo = {
            ...state.clubSearchFilterInfo,
            region,
        };
    },
    changeClubSearchInterest(state, interest) {
        state.clubSearchFilterInfo = {
            ...state.clubSearchFilterInfo,
            interest,
        };
    },
    changeClubSearchText(state, searchText) {
        state.clubSearchFilterInfo = {
            ...state.clubSearchFilterInfo,
            searchText: searchText ? searchText.trim() : null,
        };
    },
};

const actions = {
    requestFirstClubList({ commit, state }) {
        commit('initClubListAndPage');
        const callback = async () => {
            const requestParam = RequestConverter.convertClubList(state.clubPage, state.clubSearchFilterInfo);
            const clubListInfo = await clubListApi.getClubListWithPage(requestParam);
            commit('changeClubListWithPage', clubListInfo);
        };
        return actionsLoadingTemplate(commit, callback);
    },
    requestNextClubList({ commit, state }) {
        if (state.clubPage.isLastPage) {
            return Promise.resolve();
        }

        if (state.clubList.length > 1000) { // 랜딩 부하 방지를 위해 리스트 최대 개수를 정해놓자.
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.convertClubList(state.clubPage, state.clubSearchFilterInfo);
            const clubListInfo = await clubListApi.getClubListWithPage(requestParam);
            commit('addNextClubList', clubListInfo);
        };
        return actionsLoadingTemplate({ commit, name: 'changeIsRequestingNextPage' }, callback);
    },
    requestFirstMyClubList({ commit, state }) {
        commit('initMyClubListAndPage');
        const callback = async () => {
            const requestParam = RequestConverter.convertMyClubList(state.myClubPage);
            const clubListInfo = await clubListApi.getMyClubListWithPage(requestParam);
            commit('changeMyClubListWithPage', clubListInfo);
        };
        return actionsLoadingTemplate(commit, callback);
    },
    requestNextMyClubList({ commit, state }) {
        if (state.myClubPage.isLastPage) {
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.convertMyClubList(state.myClubPage);
            const clubListInfo = await clubListApi.getMyClubListWithPage(requestParam);
            commit('addNextMyClubList', clubListInfo);
        };
        return actionsLoadingTemplate({ commit, name: 'changeIsRequestingNextPage' }, callback);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
