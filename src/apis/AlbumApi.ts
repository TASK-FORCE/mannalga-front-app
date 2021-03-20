import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import {
    Album,
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
    getClubAlbum({ clubSeq, albumSeq }): Promise<Album> {
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
