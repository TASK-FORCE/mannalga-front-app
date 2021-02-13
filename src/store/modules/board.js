import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import boardApi from '@/apis/BoardApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/RequestConverter.js';
import CommentHelper from '@/store/service/helper/CommentHelper.js';

const state = {
    boardList: [],
    boardPage: DefaultBuilder.buildPage(),
    board: DefaultBuilder.buildAlbum(),
    boardCommentList: [],
    boardCommentPage: DefaultBuilder.buildPage(),
};

const getters = {
    boardList: (state) => state.boardList,
    boardPage: (state) => state.boardPage,
    board: (state) => state.board,
    boardCommentList: (state) => state.boardCommentList,
    boardCommentPage: (state) => state.boardCommentPage,
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

    setBoard(state, board) {
        state.board = board;
    },

    setBoardCommentList(state, { boardCommentList, boardCommentPage }) {
        state.boardCommentList = boardCommentList;
        state.boardCommentPage = boardCommentPage;
    },

    addNextBoardCommentList(state, { boardCommentList, boardCommentPage }) {
        state.boardCommentList = state.boardCommentList.concat(boardCommentList);
        state.boardCommentPage = boardCommentPage;
    },

    addNextBoardCommentListWithCheckDuplicate(state, { boardCommentList, boardCommentPage }) {
        const alreadyExistSeqs = state.boardCommentList.map(({ commentSeq }) => commentSeq);
        boardCommentList
            .filter(({ commentSeq }) => !alreadyExistSeqs.includes(commentSeq))
            .forEach(comment => state.boardCommentList.push(comment));
        state.boardCommentPage = boardCommentPage;
    },

    initBoardCommentList(state) {
        state.boardCommentList = [];
        state.boardCommentPage = DefaultBuilder.buildPage();
    },

    countChildBoardCommentCnt(state, seq) {
        state.boardCommentList = state.boardCommentList
            .map(comment => {
                if (comment.commentSeq === seq) {
                    return {
                        ...comment,
                        childCommentCnt: comment.childCommentCnt + 1,
                    };
                }
                return comment;
            });
    },

    changeBoardLike(state, { likeCnt, isLike }) {
        state.board = {
            ...state.board,
            likeCnt,
            isLike,
        };
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

    async requestBoard({ commit, state }, clubAndBoardSeq) {
        return actionsNormalTemplate(
            async () => {
                const board = await boardApi.getClubBoard(clubAndBoardSeq);
                commit('setBoard', board);
            },
        );
    },

    async requestFirstBoardCommentList({ commit, state }, boardCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => {
                commit('initBoardCommentList');
                const requestDto = {
                    ...boardCommentRequestInfo,
                    requestParams: RequestConverter.convertPage(state.boardCommentPage),
                };
                const boardListInfo = await boardApi.getClubBoardCommentList(requestDto);
                commit('setBoardCommentList', boardListInfo);
            },
        );
    },

    async requestNextBoardCommentList({ commit, state }, boardCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    ...boardCommentRequestInfo,
                    requestParams: RequestConverter.convertPage(state.boardCommentPage),
                };
                const boardListInfo = await boardApi.getClubBoardCommentList(requestDto);
                commit('addNextBoardCommentList', boardListInfo);
            },
        );
    },

    async requestAllBoardCommentListWithPaging({ commit, state }, boardCommentRequestInfo) {
        return CommentHelper.requestAllCommentListWithPaging(
            boardCommentRequestInfo,
            () => state.boardCommentPage,
            async (requestDto) => {
                const boardListInfo = await boardApi.getClubBoardCommentList(requestDto);
                commit('addNextBoardCommentListWithCheckDuplicate', boardListInfo);
            },
            async (requestDto) => {
                const boardListInfo = await boardApi.getClubBoardCommentList(requestDto);
                commit('addNextBoardCommentList', boardListInfo);
            },
        );
    },

    async requestBoardCommentWrite({ _ }, boardCommentWriteInfo) {
        return actionsNormalTemplate(
            async () => {
                await boardApi.postClubBoardCommentWrite(boardCommentWriteInfo);
            },
        );
    },

    async requestAllBoardSubCommentList({ _ }, boardSubCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => boardApi.getClubBoardSubCommentList(boardSubCommentRequestInfo),
        );
    },

    async requestApplyLikeClubBoard({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { likeCnt } = await boardApi.postLikeClubBoard(seqInfo);
                commit('changeBoardLike', { likeCnt, isLike: true });
            },
        );
    },

    async requestDeleteLikeClubBoard({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { likeCnt } = await boardApi.deleteLikeClubBoard(seqInfo);
                commit('changeBoardLike', { likeCnt, isLike: false });
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
