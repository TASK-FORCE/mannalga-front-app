import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import {
  Board,
  BoardCommentDeleteRequest,
  BoardCommentEditRequest,
  BoardCommentListResponse,
  BoardCommentPageRequest,
  BoardCommentWriteRequest,
  BoardListResponse,
  BoardPageRequest,
  BoardSeqContext,
  BoardSubCommentRequest,
  BoardWriteRequestWishSeq
} from '@/interfaces/board/board';
import { Comment } from '@/interfaces/common';

const boardApi = {
  getClubBoardList({ category, title, clubSeq, pageRequest }: BoardPageRequest): Promise<BoardListResponse> {
    return axios.get(`/api/clubs/${clubSeq}/board`, { params: { ...pageRequest, category, title } })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertBoardList);
  },

  postClubBoardCreate({ clubSeq, boardWriteRequest }: BoardWriteRequestWishSeq): Promise<void> {
    return axios.post(`/api/clubs/${clubSeq}/board`, boardWriteRequest);
  },

  putClubBoardEdit({ clubSeq, boardSeq, boardWriteRequest }: BoardWriteRequestWishSeq): Promise<void> {
    return axios.put(`/api/clubs/${clubSeq}/meetings/${boardSeq}`, boardWriteRequest);
  },


  getClubBoard({ clubSeq, boardSeq }: BoardSeqContext): Promise<Board> {
    return axios.get(`/api/clubs/${clubSeq}/board/${boardSeq}`)
      .then(ResponseConverter.extractSuperInventionResponseData)
  },

  getClubBoardCommentList({ clubSeq, boardSeq, pageRequest }: BoardCommentPageRequest): Promise<BoardCommentListResponse> {
    return axios.get(`/api/club/${clubSeq}/board/${boardSeq}/comment`, { params: pageRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertBoardCommentList);
  },

  postClubBoardCommentWrite({ boardSeqContext: { clubSeq, boardSeq }, content, parentCommentSeq }: BoardCommentWriteRequest) {
    return axios.post(`/api/club/${clubSeq}/board/${boardSeq}/comment`, { content }, {
      params: { parentCommentSeq },
    });
  },

  patchClubBoardCommentEdit({ boardSeqContext: { clubSeq, boardSeq }, content, commentSeq }: BoardCommentEditRequest) {
    return axios.patch(`/api/club/${clubSeq}/board/${boardSeq}/${commentSeq}`, { content });
  },

  deleteClubBoardCommentDelete({ boardSeqContext: { clubSeq, boardSeq }, commentSeq }: BoardCommentDeleteRequest) {
    return axios.delete(`/api/club/${clubSeq}/board/${boardSeq}/${commentSeq}`);
  },

  getClubBoardSubCommentList({ clubSeq, boardSeq, parentCommentSeq }: BoardSubCommentRequest): Promise<Comment[]> {
    return axios.get(`/api/club/${clubSeq}/board/${boardSeq}/comment/${parentCommentSeq}?depthLimit=2`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  postLikeClubBoard({ clubSeq, boardSeq }: BoardSeqContext) {
    return axios.post(`/api/club/${clubSeq}/board/${boardSeq}/like`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  deleteLikeClubBoard({ clubSeq, boardSeq }: BoardSeqContext) {
    return axios.delete(`/api/club/${clubSeq}/board/${boardSeq}/like`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },
};

export default boardApi;
