import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import {
  Album,
  AlbumCommentDeleteRequest,
  AlbumCommentEditRequest,
  AlbumCommentListResponse,
  AlbumCommentPageRequest,
  AlbumCommentWriteRequest,
  AlbumListResponse,
  AlbumPageRequest,
  AlbumSeqContext,
  AlbumSubCommentRequest,
  AlbumWriteRequest
} from '@/interfaces/album';
import { Comment } from '@/interfaces/common';

const albumApi = {
  getClubAlbum({ clubSeq, albumSeq }: AlbumSeqContext): Promise<Album> {
    return axios.get(`/api/club/${clubSeq}/album/${albumSeq}`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  getClubAlbumList({ clubSeq, pageRequest }: AlbumPageRequest): Promise<AlbumListResponse> {
    return axios.get(`/api/club/${clubSeq}/album`, { params: pageRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertAlbumList);
  },

  postClubAlbumCreate({ clubSeq, title, image }: AlbumWriteRequest) {
    return axios.post(`/api/club/${clubSeq}/album`, { title, image });
  },

  postClubAlbumCommentWrite({ albumSeqContext: { clubSeq, albumSeq }, content, parentCommentSeq }: AlbumCommentWriteRequest) {
    return axios.post(`/api/club/${clubSeq}/album/${albumSeq}/comment`, { content }, {
      params: { parentCommentSeq },
    });
  },

  patchClubAlbumCommentEdit({ albumSeqContext: { clubSeq, albumSeq }, content, commentSeq }: AlbumCommentEditRequest) {
    return axios.patch(`/api/club/${clubSeq}/album/${albumSeq}/${commentSeq}`, { content });
  },

  // TODO: 존재하는지 체크 필요
  deleteClubAlbumCommentDelete({ albumSeqContext: { clubSeq, albumSeq }, commentSeq }: AlbumCommentDeleteRequest) {
    return axios.delete(`/api/club/${clubSeq}/album/${albumSeq}/${commentSeq}`);
  },

  getClubAlbumCommentList({ clubSeq, albumSeq, pageRequest }: AlbumCommentPageRequest): Promise<AlbumCommentListResponse> {
    return axios.get(`/api/club/${clubSeq}/album/${albumSeq}/comment`, { params: pageRequest })
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertAlbumCommentList);
  },

  getClubAlbumSubCommentList({ clubSeq, albumSeq, parentCommentSeq }: AlbumSubCommentRequest): Promise<Comment[]> {
    return axios.get(`/api/club/${clubSeq}/album/${albumSeq}/comment/${parentCommentSeq}?depthLimit=2`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  postLikeClubAlbum({ clubSeq, albumSeq }: AlbumSeqContext) {
    return axios.post(`/api/club/${clubSeq}/album/${albumSeq}/like`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  deleteLikeClubAlbum({ clubSeq, albumSeq }: AlbumSeqContext) {
    return axios.delete(`/api/club/${clubSeq}/album/${albumSeq}/like`)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },
};

export default albumApi;
