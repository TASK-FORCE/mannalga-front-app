import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import boardApi from '@/apis/BoardApi.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import RequestConverter from '@/apis/converter/RequestConverter.ts';
import CommentHelper from '@/store/service/helper/CommentHelper.ts';
import BoardHelper from '@/store/service/helper/BoardHelper.ts';
import { BoardMutationTypes } from '@/store/type/mutationTypes';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { Comment, Page } from '@/interfaces/common';
import {
  Board,
  BoardCommentListResponse,
  BoardCommentPageRequest,
  BoardCommentWriteRequest,
  BoardFeed,
  BoardLikeChange,
  BoardListRequest,
  BoardListResponse,
  BoardSeqContext,
  BoardSubCommentRequest,
  BoardWriteRequestWishSeq
} from '@/interfaces/board/board';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import { BoardActionContext } from '@/store/type/actionContextTypes';

export const state = {
  boardList: [] as BoardFeed[],
  boardPage: DefaultBuilder.page() as Page,
  board: DefaultBuilder.board() as Board,
  boardCommentList: [] as Comment[],
  boardCommentPage: DefaultBuilder.page() as Page,
};
export type BoardState = typeof state;

export const mutations = {
  [BoardMutationTypes.SET_BOARD_LIST](state: BoardState, { boardList, boardPage }: BoardListResponse) {
    state.boardList = boardList;
    state.boardPage = boardPage;
  },
  [BoardMutationTypes.SET_ONLY_BOARD_LIST](state: BoardState, { boardList }: BoardListResponse) {
    state.boardList = boardList;
  },
  [BoardMutationTypes.ADD_NEXT_BOARD_LIST](state: BoardState, { boardList, boardPage }: BoardListResponse) {
    state.boardList = state.boardList.concat(boardList);
    state.boardPage = boardPage;
  },
  [BoardMutationTypes.INIT_BOARD_LIST](state: BoardState) {
    state.boardList = [];
    state.boardPage = DefaultBuilder.page();
  },
  [BoardMutationTypes.SET_BOARD](state: BoardState, board: Board) {
    state.board = board;
  },
  [BoardMutationTypes.SET_BOARD_COMMENT_LIST](state: BoardState, { boardCommentList, boardCommentPage }: BoardCommentListResponse) {
    state.boardCommentList = boardCommentList;
    state.boardCommentPage = boardCommentPage;
  },
  [BoardMutationTypes.ADD_NEXT_BOARD_COMMENT_LIST](state: BoardState, { boardCommentList, boardCommentPage }: BoardCommentListResponse) {
    state.boardCommentList = state.boardCommentList.concat(boardCommentList);
    state.boardCommentPage = boardCommentPage;
  },
  [BoardMutationTypes.ADD_NEXT_BOARD_COMMENT_LIST_WITH_CHECK_DUPLICATE](state: BoardState, { boardCommentList, boardCommentPage }: BoardCommentListResponse) {
    const alreadyExistSeqs = state.boardCommentList.map(({ commentSeq }) => commentSeq);
    boardCommentList
      .filter(({ commentSeq }) => !alreadyExistSeqs.includes(commentSeq))
      .forEach(comment => state.boardCommentList.push(comment));
    state.boardCommentPage = boardCommentPage;
  },
  [BoardMutationTypes.INIT_BOARD_COMMENT_LIST](state: BoardState) {
    state.boardCommentList = [];
    state.boardCommentPage = DefaultBuilder.page();
  },
  [BoardMutationTypes.COUNT_COMMENT_CNT_OF_PARENT_COMMENT](state: BoardState, commentSeq: number) {
    state.boardCommentList = state.boardCommentList
      .map(comment => {
        if (comment.commentSeq === commentSeq) {
          return {
            ...comment,
            childCommentCnt: comment.childCommentCnt + 1,
          };
        }
        return comment;
      });
  },
  [BoardMutationTypes.CHANGE_BOARD_LIKE](state: BoardState, { boardSeq, likeCnt, isLiked }: BoardLikeChange) {
    state.boardList = state.boardList.map(board => {
      if (board.boardSeq === boardSeq) {
        return {
          ...board,
          likeCnt,
          isLiked,
        };
      }
      return board;
    });

    state.board = {
      ...state.board,
      likeCnt,
      isLiked,
    };
  },
  [BoardMutationTypes.COUNT_COMMENT_CNT_OF_BOARD](state: BoardState, boardSeq: number) {
    state.boardList = state.boardList.map(board => {
      if (board.boardSeq === boardSeq) {
        return {
          ...board,
          commentCnt: board.commentCnt + 1,
        };
      }
      return board;
    });
  },
};
export type BoardMutations = typeof mutations;

export const actions = {
  async [BoardActionTypes.REQUEST_CLUB_BOARD_CREATE]({ commit }: BoardActionContext, boardWriteRequestWishSeq: BoardWriteRequestWishSeq) {
    return actionsNormalTemplate(async () => {
      await boardApi.postClubBoardCreate(boardWriteRequestWishSeq);
    });
  },
  async [BoardActionTypes.REQUEST_CLUB_BOARD_EDIT]({ commit }: BoardActionContext, boardWriteRequestWishSeq: BoardWriteRequestWishSeq) {
    return actionsNormalTemplate(async () => {
      await boardApi.putClubBoardEdit(boardWriteRequestWishSeq);
    });
  },
  async [BoardActionTypes.REQUEST_FIRST_BOARD_LIST]({ commit, state, dispatch }: BoardActionContext, boardListRequest: BoardListRequest) {
    return actionsNormalTemplate(async () => {
      commit(BoardMutationTypes.INIT_BOARD_LIST);

      if (boardListRequest.category) {
        const boardListResponse = await BoardHelper.requestBoardList(boardListRequest, state.boardPage);
        commit(BoardMutationTypes.SET_BOARD_LIST, boardListResponse);
      } else {
        // 전체보기로 첫번째 페이지를 조회하는 경우 첫 10개 목록은 공지사항을 보여주고 나머지는 일반 게시판을 보여준다.
        const noticeBoardListResponsePromise: Promise<BoardListResponse> = BoardHelper.requestBoardList(
          { ...boardListRequest, category: BoardCategory.NOTICE.type },
          DefaultBuilder.page(10)
        );
        const normalBoardListResponsePromise: Promise<BoardListResponse> = BoardHelper.requestBoardList(
          { ...boardListRequest, category: BoardCategory.NORMAL.type }
          , state.boardPage
        );
        const noticeBoardListResponse = await noticeBoardListResponsePromise;
        commit(BoardMutationTypes.SET_ONLY_BOARD_LIST, noticeBoardListResponse);
        const normalBoardListResponse = await normalBoardListResponsePromise;
        commit(BoardMutationTypes.ADD_NEXT_BOARD_LIST, normalBoardListResponse);
      }
    });
  },
  async [BoardActionTypes.REQUEST_NEXT_BOARD_LIST]({ commit, state }: BoardActionContext, boardListRequest: BoardListRequest) {
    return actionsNormalTemplate(
      async () => {
        const boardListResponse = await BoardHelper.requestBoardList(boardListRequest, state.boardPage);
        commit(BoardMutationTypes.ADD_NEXT_BOARD_LIST, boardListResponse);
      },
    );
  },
  async [BoardActionTypes.REQUEST_BOARD]({ commit, state }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return actionsNormalTemplate(
      async () => {
        const board = await boardApi.getClubBoard(boardSeqContext);
        commit(BoardMutationTypes.SET_BOARD, board);
      },
    );
  },
  async [BoardActionTypes.REQUEST_FIRST_BOARD_COMMENT_LIST]({ commit, state }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return actionsNormalTemplate(
      async () => {
        commit(BoardMutationTypes.INIT_BOARD_COMMENT_LIST);
        const boardCommentPageRequest = RequestConverter.convertBoardCommentPageRequest(boardSeqContext, state.boardCommentPage);
        const boardCommentListResponse = await boardApi.getClubBoardCommentList(boardCommentPageRequest);
        commit(BoardMutationTypes.SET_BOARD_COMMENT_LIST, boardCommentListResponse);
      },
    );
  },
  async [BoardActionTypes.REQUEST_NEXT_BOARD_COMMENT_LIST]({ commit, state }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return actionsNormalTemplate(
      async () => {
        const boardCommentPageRequest = RequestConverter.convertBoardCommentPageRequest(boardSeqContext, state.boardCommentPage);
        const boardCommentListResponse = await boardApi.getClubBoardCommentList(boardCommentPageRequest);
        commit(BoardMutationTypes.ADD_NEXT_BOARD_COMMENT_LIST, boardCommentListResponse);
      },
    );
  },
  async [BoardActionTypes.REQUEST_ALL_BOARD_COMMENT_LIST_WITH_PAGING]({ commit, state }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return CommentHelper.requestAllCommentListWithPaging<BoardCommentPageRequest>(
      (page: Page) => RequestConverter.convertBoardCommentPageRequest(boardSeqContext, page),
      () => state.boardCommentPage,
      async (boardCommentPageRequest: BoardCommentPageRequest) => {
        const boardCommentListResponse = await boardApi.getClubBoardCommentList(boardCommentPageRequest);
        commit(BoardMutationTypes.ADD_NEXT_BOARD_COMMENT_LIST_WITH_CHECK_DUPLICATE, boardCommentListResponse);
      },
      async (boardCommentPageRequest: BoardCommentPageRequest) => {
        const boardCommentListResponse = await boardApi.getClubBoardCommentList(boardCommentPageRequest);
        commit(BoardMutationTypes.ADD_NEXT_BOARD_COMMENT_LIST, boardCommentListResponse);
      },
    );
  },
  async [BoardActionTypes.REQUEST_BOARD_COMMENT_WRITE]({ commit }: BoardActionContext, boardCommentWriteRequest: BoardCommentWriteRequest) {
    return actionsNormalTemplate(
      async () => {
        await boardApi.postClubBoardCommentWrite(boardCommentWriteRequest);
      },
    );
  },
  async [BoardActionTypes.REQUEST_ALL_BOARD_SUB_COMMENT_LIST]({ commit }: BoardActionContext, boardSubCommentRequest: BoardSubCommentRequest): Promise<Comment[]> {
    return actionsNormalTemplate(
      async () => boardApi.getClubBoardSubCommentList(boardSubCommentRequest),
    );
  },
  async [BoardActionTypes.REQUEST_APPLY_LIKE_CLUB_BOARD]({ commit }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return actionsNormalTemplate(
      async () => {
        const { boardSeq } = boardSeqContext;
        const { likeCnt } = await boardApi.postLikeClubBoard(boardSeqContext);
        commit(BoardMutationTypes.CHANGE_BOARD_LIKE, { boardSeq, likeCnt, isLiked: true });
      },
    );
  },
  async [BoardActionTypes.REQUEST_DELETE_LIKE_CLUB_BOARD]({ commit }: BoardActionContext, boardSeqContext: BoardSeqContext) {
    return actionsNormalTemplate(
      async () => {
        const { boardSeq } = boardSeqContext;
        const { likeCnt } = await boardApi.deleteLikeClubBoard(boardSeqContext);
        commit(BoardMutationTypes.CHANGE_BOARD_LIKE, { boardSeq, likeCnt, isLiked: false });
      },
    );
  },
};
export type BoardActions = typeof actions;
