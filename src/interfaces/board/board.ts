import { Comment, Page, PageRequest, UploadImageResponse, Writer } from '@/interfaces/common';

export interface Board {
  boardSeq: number;
  category: BoardCategoryType;
  commentCnt: number;
  content: string;
  createdAt: string;
  imageList: BoardImage[];
  isLiked: boolean;
  likeCnt: number;
  title: string;
  updatedAt: string;
  writer: Writer;
}

export interface BoardImage {
  imgSeq: number;
  createdAt: string;
  img: UploadImageResponse;
}

export interface BoardFeed {
  boardSeq: number;
  category: BoardCategoryType;
  commentCnt: number;
  createAt: string;
  likeCnt: number;
  mainImageUrl: string;
  simpleContent: string;
  title: string;
  writer: Writer;
}

export interface BoardListResponse {
  boardList: BoardFeed[];
  boardPage: Page;
}

export interface BoardSeqContext {
  clubSeq: number;
  boardSeq: number;
}

export interface BoardWriteRequestWishSeq {
  clubSeq: number;
  boardSeq?: number;
  boardWriteRequest: BoardWriteRequest;
}

export interface BoardWriteRequest {
  title: string;
  content: string;
  category: BoardCategoryType;
  imgList: UploadImageResponse[];
}

export interface BoardWriteContext {
  title: string;
  content: string;
  category: BoardCategoryType;
  imgList: UploadImageResponse[];
}

export interface BoardListRequest {
  clubSeq: number;
  category?: BoardCategoryType;
  text?: string;
}

export interface BoardPageRequest {
  clubSeq: number;
  category?: BoardCategoryType;
  title?: string;
  content?: string;
  pageRequest: PageRequest;
}

export enum BoardCategoryType {
  NOTICE = 'NOTICE',
  NORMAL = 'NORMAL'
}

export interface BoardCommentPageRequest {
  clubSeq: number;
  boardSeq: number;
  pageRequest: PageRequest;
}

export interface BoardCommentListResponse {
  boardCommentList: Comment[];
  boardCommentPage: Page;
}

export interface BoardLikeChange {
  boardSeq: number;
  likeCnt: number;
  isLiked: boolean;
}

export interface BoardCommentWriteRequest {
  boardSeqContext: BoardSeqContext;
  content: string;
  parentCommentSeq?: number;
}

export interface BoardCommentEditRequest {
  boardSeqContext: BoardSeqContext;
  commentSeq: number;
  content: string;
}

export interface BoardCommentDeleteRequest {
  boardSeqContext: BoardSeqContext;
  commentSeq: number;
}

export interface BoardSubCommentRequest {
  clubSeq: number;
  boardSeq: number;
  parentCommentSeq: number;
}
