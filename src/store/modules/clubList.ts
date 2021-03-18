import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import clubListApi from '@/apis/ClubListApi.ts';
import RequestConverter from '@/store/converter/RequestConverter.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes';
import { Page } from '@/interfaces/common';
import { ClubFeed, ClubListResponse, ClubSearchContext, InterestForSearch, MyClubFeed, MyClubListResponse, RegionForSearch } from '@/interfaces/clubList';
import { ClubListActionContext } from '@/store/type/actionContextTypes';

export const state = {
    clubList: [] as ClubFeed[],
    clubPage: DefaultBuilder.buildPage() as Page,
    myClubList: [] as MyClubFeed[],
    myClubPage: DefaultBuilder.buildPage() as Page,
    clubSearchContext: DefaultBuilder.clubSearchContext() as ClubSearchContext,
    isRequestingNextPage: false as boolean,
};
export type ClubListState = typeof state;


export const mutations = {
    [MutationTypes.CHANGE_CLUB_LIST_WITH_PAGE](state: ClubListState, { clubList, clubPage }: ClubListResponse) {
        state.clubList = clubList;
        state.clubPage = clubPage;
    },
    [MutationTypes.CHANGE_MY_CLUB_LIST_WITH_PAGE](state: ClubListState, { myClubList, myClubPage }: MyClubListResponse) {
        state.myClubList = myClubList;
        state.myClubPage = myClubPage;
    },
    [MutationTypes.ADD_NEXT_CLUB_LIST](state: ClubListState, { clubList, clubPage }: ClubListResponse) {
        state.clubList = state.clubList.concat(clubList);
        state.clubPage = clubPage;
    },
    [MutationTypes.ADD_NEXT_MY_CLUB_LIST](state: ClubListState, { myClubList, myClubPage }: MyClubListResponse) {
        state.myClubList = state.myClubList.concat(myClubList);
        state.myClubPage = myClubPage;
    },
    [MutationTypes.CHANGE_IS_REQUESTING_NEXT_PAGE](state: ClubListState, loading: boolean) {
        state.isRequestingNextPage = loading;
    },
    [MutationTypes.INIT_CLUB_LIST_AND_PAGE](state: ClubListState) {
        state.clubList = [];
        state.clubPage = DefaultBuilder.buildPage();
    },
    [MutationTypes.INIT_MY_CLUB_LIST_AND_PAGE](state: ClubListState) {
        state.myClubList = [];
        state.myClubPage = DefaultBuilder.buildPage();
    },
    [MutationTypes.CHANGE_CLUB_SEARCH_REGION](state: ClubListState, region: RegionForSearch) {
        state.clubSearchContext = {
            ...state.clubSearchContext,
            region,
        };
    },
    [MutationTypes.CHANGE_CLUB_SEARCH_INTEREST](state: ClubListState, interest: InterestForSearch) {
        state.clubSearchContext = {
            ...state.clubSearchContext,
            interest,
        };
    },
    [MutationTypes.CHANGE_CLUB_SEARCH_TEXT](state: ClubListState, searchText: string) {
        state.clubSearchContext = {
            ...state.clubSearchContext,
            searchText: searchText ? searchText.trim() : null,
        };
    },
};
export type ClubListMutations = typeof mutations;

export const actions = {
    [ActionTypes.REQUEST_FIRST_CLUB_LIST]({ commit, state }: ClubListActionContext, disableLoading: boolean) {
        commit(MutationTypes.INIT_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const requestParam = RequestConverter.convertClubList(state.clubPage, state.clubSearchContext);
            const clubListResponse = await clubListApi.getClubListWithPage(requestParam);
            commit(MutationTypes.CHANGE_CLUB_LIST_WITH_PAGE, clubListResponse);
        };
        return disableLoading ? actionsNormalTemplate(callback) : actionsLoadingTemplate(callback);
    },
    [ActionTypes.REQUEST_NEXT_CLUB_LIST]({ commit, state }: ClubListActionContext) {
        if (state.clubPage.isLastPage) {
            return Promise.resolve();
        }

        if (state.clubList.length > 1000) { // 랜딩 부하 방지를 위해 리스트 최대 개수를 정해놓자.
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.convertClubList(state.clubPage, state.clubSearchContext);
            const clubListResponse = await clubListApi.getClubListWithPage(requestParam);
            commit(MutationTypes.ADD_NEXT_CLUB_LIST, clubListResponse);
        };
        return actionsLoadingTemplate(callback, MutationTypes.CHANGE_IS_REQUESTING_NEXT_PAGE);
    },
    [ActionTypes.REQUEST_FIRST_MY_CLUB_LIST]({ commit, state }: ClubListActionContext, disableLoading: boolean) {
        commit(MutationTypes.INIT_MY_CLUB_LIST_AND_PAGE);
        const callback = async () => {
            const requestParam = RequestConverter.convertMyClubList(state.myClubPage);
            const myClubListResponse = await clubListApi.getMyClubListWithPage(requestParam);
            commit(MutationTypes.CHANGE_MY_CLUB_LIST_WITH_PAGE, myClubListResponse);
        };
        return disableLoading ? actionsNormalTemplate(callback) : actionsLoadingTemplate(callback);
    },
    [ActionTypes.REQUEST_NEXT_MY_CLUB_LIST]({ commit, state }: ClubListActionContext) {
        if (state.myClubPage.isLastPage) {
            return Promise.resolve();
        }
        const callback = async () => {
            const requestParam = RequestConverter.convertMyClubList(state.myClubPage);
            const myClubListResponse = await clubListApi.getMyClubListWithPage(requestParam);
            commit(MutationTypes.ADD_NEXT_MY_CLUB_LIST, myClubListResponse);
        };
        return actionsLoadingTemplate(callback, MutationTypes.CHANGE_IS_REQUESTING_NEXT_PAGE);
    },
};
export type ClubListActions = typeof actions;
