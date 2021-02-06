import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import boardApi from '@/apis/BoardApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/RequestConverter.js';

const state = {
    boardList: [],
    boardPage: DefaultBuilder.buildPage(),
};

const getters = {
    boardList: (state) => state.boardList,
    boardPage: (state) => state.boardPage,
};

const mutations = {
    setBoardList(state, { boardList, boardPage }) {
        state.boardList = boardList;
        state.boardPage = boardPage;
    },

    addNextBoardList(state, { boardList, boardPage }) {
        state.boardList = state.boardList.concat(boardList);
        state.boardPage = boardPage;
    },

    initBoardList(state) {
        state.boardList = [];
        state.boardPage = DefaultBuilder.buildPage();
    },
};

const actions = {
    async requestClubBoardCreate({ _ }, clubBoardCreateInfo) {
        return actionsNormalTemplate(async () => {
            await boardApi.postClubBoardCreate(clubBoardCreateInfo);
        });
    },

    async requestFirstBoardList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(async () => {
            commit('initBoardList');
            const requestDto = {
                clubSeq,
                requestParams: RequestConverter.convertPage(state.boardPage),
            };
            const boardListInfo = await boardApi.getClubBoardList(requestDto);
            commit('setBoardList', boardListInfo);
        });
    },

    async requestNextBoardList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.boardPage),
                };
                const boardListInfo = await boardApi.getClubBoardList(requestDto);
                commit('addNextBoardList', boardListInfo);
            },
        );
    },

};

export default {
    state,
    getters,
    mutations,
    actions,
};
