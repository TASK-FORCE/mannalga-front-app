import { Comment, Page, PageRequest, UploadImageResponse, Writer } from '@/interfaces/common';

export interface Album {
  albumSeq: number;
  title: string;
  file_name: string;
  imgUrl?: string;
  image?: UploadImageResponse;
  likeCnt: number;
  commentCnt: number;
  isLiked: boolean;
  writer: Writer;
  createdAt: string;
}

export interface AlbumPageRequest {
  clubSeq: number;
  pageRequest: PageRequest;
}

export interface AlbumFeed {
  albumSeq: number;
  commentCnt: number;
  file_name: string;
  imgUrl: string;
  likeCnt: number;
  title: string;
  writerClubUserSeq: number;
}

export interface AlbumListResponse {
  albumList: AlbumFeed[];
  albumPage: Page;
}

export interface AlbumCommentListResponse {
  albumCommentList: Comment[];
  albumCommentPage: Page;
}

export interface AlbumCommentPageRequest {
  clubSeq: number;
  albumSeq: number;
  pageRequest: PageRequest;
}

export interface AlbumSeqContext {
  clubSeq: number;
  albumSeq: number;
}

export interface AlbumWriteContext {
  title: string;
  image: UploadImageResponse;
}

export interface AlbumWriteRequest {
  clubSeq: number;
  title: string;
  image: UploadImageResponse;
}

export interface AlbumEditRequest {
  clubSeq: number;
  albumSeq: number;
  title: string;
  image: UploadImageResponse;
}

export interface AlbumDeleteRequest {
  clubSeq: number;
  albumSeq: number;
}

export interface AlbumCommentWriteRequest {
  albumSeqContext: AlbumSeqContext;
  content: string;
  parentCommentSeq?: number;
}

export interface AlbumCommentEditRequest {
  albumSeqContext: AlbumSeqContext;
  commentSeq: number;
  content: string;
}

export interface AlbumCommentDeleteRequest {
  albumSeqContext: AlbumSeqContext;
  commentSeq: number;
}

export interface AlbumSubCommentRequest {
  clubSeq: number;
  albumSeq: number;
  parentCommentSeq: number;
}

export interface AlbumLikeChange {
  albumSeq: number;
  likeCnt: number;
  isLiked: boolean;
}
