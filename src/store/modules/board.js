import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import boardApi from '@/apis/BoardApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import RequestConverter from '@/store/converter/RequestConverter.js';
import CommentHelper from '@/store/service/helper/CommentHelper.js';
import { BOARD_CATEGORY } from '@/utils/board.js';
import BoardHelper from '@/store/service/helper/BoardHelper.js';

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

    setOnlyBoardList(state, { boardList }) {
        state.boardList = boardList;
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

    changeBoardLike(state, { likeCnt, isLiked }) {
        state.board = {
            ...state.board,
            likeCnt,
            isLiked,
        };
    },
};

const actions = {
    async requestClubBoardCreate({ _ }, clubBoardCreateInfo) {
        return actionsNormalTemplate(async () => {
            await boardApi.postClubBoardCreate(clubBoardCreateInfo);
        });
    },

    async requestFirstBoardList({ commit, state, dispatch }, { clubSeq, category }) {
        return actionsNormalTemplate(async () => {
            commit('initBoardList');

            if (category) {
                const boardListInfo = await BoardHelper.requestBoardList(clubSeq, state.boardPage, category);
                commit('setBoardList', boardListInfo);
            } else {
                // 전체보기로 첫번째 페이지를 조회하는 경우 첫 10개 목록은 공지사항을 보여주고 나머지는 일반 게시판을 보여준다.
                const noticeBoardListInfoPromise = BoardHelper.requestBoardList(clubSeq, DefaultBuilder.buildPage(10), BOARD_CATEGORY.NOTICE.type);
                const normalBoardListInfoPromise = BoardHelper.requestBoardList(clubSeq, state.boardPage, BOARD_CATEGORY.NORMAL.type);
                const noticeBoardListInfo = await noticeBoardListInfoPromise;
                commit('setOnlyBoardList', noticeBoardListInfo);
                const normalBoardListInfo = await normalBoardListInfoPromise;
                commit('addNextBoardList', normalBoardListInfo);
            }
        });
    },

    async requestNextBoardList({ commit, state }, { clubSeq, category }) {
        return actionsNormalTemplate(
            async () => {
                const boardListInfo = await BoardHelper.requestBoardList(clubSeq, state.boardPage, category);
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
                commit('changeBoardLike', { likeCnt, isLiked: true });
            },
        );
    },

    async requestDeleteLikeClubBoard({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { likeCnt } = await boardApi.deleteLikeClubBoard(seqInfo);
                commit('changeBoardLike', { likeCnt, isLiked: false });
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
