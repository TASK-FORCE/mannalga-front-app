import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import albumApi from '@/apis/AlbumApi.ts';
import RequestConverter from '@/apis/converter/RequestConverter.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import CommentHelper from '@/store/service/helper/CommentHelper.ts';
import { Comment, Page } from '@/interfaces/common';
import { AlbumMutationTypes } from '@/store/type/mutationTypes';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import { AlbumActionContext } from '@/store/type/actionContextTypes';
import {
    Album,
    AlbumCommentListResponse,
    AlbumCommentPageRequest,
    AlbumCommentWriteRequest,
    AlbumFeed,
    AlbumLikeChange,
    AlbumListResponse,
    AlbumSeqContext,
    AlbumSubCommentRequest,
    AlbumWriteRequest
} from '@/interfaces/album';

export const state = {
    album: DefaultBuilder.album() as Album,
    albumList: [] as AlbumFeed[],
    albumPage: DefaultBuilder.page() as Page,
    albumCommentList: [] as Comment[],
    albumCommentPage: DefaultBuilder.page() as Page,
};
export type AlbumState = typeof state;

export const mutations = {
    [AlbumMutationTypes.SET_ALBUM](state: AlbumState, album: Album) {
        state.album = album;
    },
    [AlbumMutationTypes.SET_ALBUM_LIST](state: AlbumState, { albumList, albumPage }: AlbumListResponse) {
        state.albumList = albumList;
        state.albumPage = albumPage;
    },
    [AlbumMutationTypes.ADD_NEXT_ALBUM_LIST](state: AlbumState, { albumList, albumPage }: AlbumListResponse) {
        state.albumList = state.albumList.concat(albumList);
        state.albumPage = albumPage;
    },
    [AlbumMutationTypes.INIT_ALBUM_LIST](state: AlbumState) {
        state.albumList = [];
        state.albumPage = DefaultBuilder.page();
    },
    [AlbumMutationTypes.SET_ALBUM_COMMENT_LIST](state: AlbumState, { albumCommentList, albumCommentPage }: AlbumCommentListResponse) {
        state.albumCommentList = albumCommentList;
        state.albumCommentPage = albumCommentPage;
    },
    [AlbumMutationTypes.ADD_NEXT_ALBUM_COMMENT_LIST](state: AlbumState, { albumCommentList, albumCommentPage }: AlbumCommentListResponse) {
        state.albumCommentList = state.albumCommentList.concat(albumCommentList);
        state.albumCommentPage = albumCommentPage;
    },
    [AlbumMutationTypes.ADD_NEXT_ALBUM_COMMENT_LIST_WITH_CHECK_DUPLICATE](state: AlbumState, { albumCommentList, albumCommentPage }: AlbumCommentListResponse) {
        const alreadyExistSeqs = state.albumCommentList.map(({ commentSeq }) => commentSeq);
        albumCommentList
            .filter(({ commentSeq }) => !alreadyExistSeqs.includes(commentSeq))
            .forEach(comment => state.albumCommentList.push(comment));
        state.albumCommentPage = albumCommentPage;
    },
    [AlbumMutationTypes.INIT_ALBUM_COMMENT_LIST](state: AlbumState) {
        state.albumCommentList = [];
        state.albumCommentPage = DefaultBuilder.page();
    },
    [AlbumMutationTypes.COUNT_CHILD_COMMENT_CNT](state: AlbumState, commentSeq: number) {
        state.albumCommentList = state.albumCommentList
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
    [AlbumMutationTypes.CHANGE_ALBUM_LIKE](state: AlbumState, { albumSeq, likeCnt, isLiked }: AlbumLikeChange) {
        state.albumList = state.albumList
            .map(album => {
                if (album.albumSeq === albumSeq) {
                    return {
                        ...album,
                        likeCnt,
                        isLiked,
                    };
                }
                return album;
            });

        state.album = {
            ...state.album,
            likeCnt,
            isLiked,
        };
    },
    [AlbumMutationTypes.COUNT_ALBUM_COMMENT_CNT](state: AlbumState, albumSeq: number) {
        state.albumList = state.albumList.map(album => {
            if (album.albumSeq === albumSeq) {
                return {
                    ...album,
                    commentCnt: album.commentCnt + 1,
                };
            }
            return album;
        });
    },
};
export type AlbumMutations = typeof mutations;

export const actions = {
    async [AlbumActionTypes.REQUEST_ALBUM_CREATE]({}: AlbumActionContext, albumWriteRequest: AlbumWriteRequest) {
        return actionsNormalTemplate(
            async () => {
                await albumApi.postClubAlbumCreate(albumWriteRequest);
            },
        );
    },
    async [AlbumActionTypes.REQUEST_ALBUM]({ commit }: AlbumActionContext, albumSeqContext: AlbumSeqContext) {
        return actionsLoadingTemplate(
            async () => {
                const album = await albumApi.getClubAlbum(albumSeqContext);
                commit(AlbumMutationTypes.SET_ALBUM, album);
            },
        );
    },
    async [AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST]({ commit, state }: AlbumActionContext, clubSeq: number) {
        return actionsNormalTemplate(async () => {
            commit(AlbumMutationTypes.INIT_ALBUM_LIST);
            const albumPageRequest = RequestConverter.convertAlbumPageRequest(clubSeq, state.albumPage);
            const albumListResponse = await albumApi.getClubAlbumList(albumPageRequest);
            commit(AlbumMutationTypes.SET_ALBUM_LIST, albumListResponse);
        });
    },
    async [AlbumActionTypes.REQUEST_NEXT_ALBUM_LIST]({ commit, state }: AlbumActionContext, clubSeq: number) {
        return actionsNormalTemplate(
            async () => {
                const albumPageRequest = RequestConverter.convertAlbumPageRequest(clubSeq, state.albumPage);
                const albumListResponse = await albumApi.getClubAlbumList(albumPageRequest);
                commit(AlbumMutationTypes.ADD_NEXT_ALBUM_LIST, albumListResponse);
            },
        );
    },
    async [AlbumActionTypes.REQUEST_ALBUM_COMMENT_WRITE]({}: AlbumActionContext, albumCommentWriteRequest: AlbumCommentWriteRequest) {
        return actionsNormalTemplate(
            async () => {
                await albumApi.postClubAlbumCommentWrite(albumCommentWriteRequest);
            },
        );
    },

    async [AlbumActionTypes.REQUEST_FIRST_ALBUM_COMMENT_LIST]({ commit, state }: AlbumActionContext, albumSeqContext: AlbumSeqContext) {
        return actionsNormalTemplate(
            async () => {
                commit(AlbumMutationTypes.INIT_ALBUM_COMMENT_LIST);
                const albumCommentPageRequest = RequestConverter.convertAlbumCommentPageRequest(albumSeqContext, state.albumCommentPage);
                const albumCommentListResponse = await albumApi.getClubAlbumCommentList(albumCommentPageRequest);
                commit(AlbumMutationTypes.SET_ALBUM_COMMENT_LIST, albumCommentListResponse);
            },
        );
    },

    async [AlbumActionTypes.REQUEST_NEXT_ALBUM_COMMENT_LIST]({ commit, state }: AlbumActionContext, albumSeqContext: AlbumSeqContext) {
        return actionsNormalTemplate(
            async () => {
                const albumCommentPageRequest = RequestConverter.convertAlbumCommentPageRequest(albumSeqContext, state.albumCommentPage);
                const albumCommentListResponse = await albumApi.getClubAlbumCommentList(albumCommentPageRequest);
                commit(AlbumMutationTypes.ADD_NEXT_ALBUM_COMMENT_LIST, albumCommentListResponse);
            },
        );
    },
    async [AlbumActionTypes.REQUEST_ALL_ALBUM_COMMENT_LIST_WITH_PAGING]({ commit, state }: AlbumActionContext, albumSeqContext: AlbumSeqContext) {
        return CommentHelper.requestAllCommentListWithPaging<AlbumCommentPageRequest>(
            (page: Page) => RequestConverter.convertAlbumCommentPageRequest(albumSeqContext, page),
            () => state.albumCommentPage,
            async (albumCommentPageRequest: AlbumCommentPageRequest) => {
                const albumListInfo = await albumApi.getClubAlbumCommentList(albumCommentPageRequest);
                commit(AlbumMutationTypes.ADD_NEXT_ALBUM_COMMENT_LIST_WITH_CHECK_DUPLICATE, albumListInfo);
            },
            async (albumCommentPageRequest: AlbumCommentPageRequest) => {
                const albumListInfo = await albumApi.getClubAlbumCommentList(albumCommentPageRequest);
                commit(AlbumMutationTypes.ADD_NEXT_ALBUM_COMMENT_LIST, albumListInfo);
            },
        );
    },
    async [AlbumActionTypes.REQUEST_ALL_ALBUM_SUB_COMMENT_LIST]({}: AlbumActionContext, albumSubCommentRequest: AlbumSubCommentRequest): Promise<Comment[]> {
        return actionsNormalTemplate(
            async () => albumApi.getClubAlbumSubCommentList(albumSubCommentRequest),
        );
    },
    async [AlbumActionTypes.REQUEST_APPLY_LIKE_CLUB_ALBUM]({ commit }: AlbumActionContext, albumSeqContext: AlbumSeqContext) {
        return actionsNormalTemplate(
            async () => {
                const { albumSeq } = albumSeqContext;
                const { likeCnt } = await albumApi.postLikeClubAlbum(albumSeqContext);
                commit(AlbumMutationTypes.CHANGE_ALBUM_LIKE, { albumSeq, likeCnt, isLiked: true });
            },
        );
    },
    async [AlbumActionTypes.REQUEST_DELETE_LIKE_CLUB_ALBUM]({ commit }, albumSeqContext: AlbumSeqContext) {
        return actionsNormalTemplate(
            async () => {
                const { albumSeq } = albumSeqContext;
                const { likeCnt } = await albumApi.deleteLikeClubAlbum(albumSeqContext);
                commit(AlbumMutationTypes.CHANGE_ALBUM_LIKE, { albumSeq, likeCnt, isLiked: false });
            },
        );
    },
};
export type AlbumActions = typeof actions;
