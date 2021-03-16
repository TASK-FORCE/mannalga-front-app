import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import albumApi from '@/apis/AlbumApi.js';
import RequestConverter from '@/store/converter/RequestConverter.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import CommentHelper from '@/store/service/helper/CommentHelper.js';

export const state = {
    album: DefaultBuilder.buildAlbum(),
    albumList: [],
    albumPage: DefaultBuilder.buildPage(),
    albumCommentList: [],
    albumCommentPage: DefaultBuilder.buildPage(),
};

export const getters = {
    album: (state) => state.album,
    albumList: (state) => state.albumList,
    albumPage: (state) => state.albumPage,
    albumCommentList: (state) => state.albumCommentList,
    albumCommentPage: (state) => state.albumCommentPage,
};

export const mutations = {
    setAlbum(state, album) {
        state.album = album;
    },

    setAlbumList(state, { albumList, albumPage }) {
        state.albumList = albumList;
        state.albumPage = albumPage;
    },

    addNextAlbumList(state, { albumList, albumPage }) {
        state.albumList = state.albumList.concat(albumList);
        state.albumPage = albumPage;
    },

    initAlbumList(state) {
        state.albumList = [];
        state.albumPage = DefaultBuilder.buildPage();
    },

    setAlbumCommentList(state, { albumCommentList, albumCommentPage }) {
        state.albumCommentList = albumCommentList;
        state.albumCommentPage = albumCommentPage;
    },

    addNextAlbumCommentList(state, { albumCommentList, albumCommentPage }) {
        state.albumCommentList = state.albumCommentList.concat(albumCommentList);
        state.albumCommentPage = albumCommentPage;
    },

    addNextAlbumCommentListWithCheckDuplicate(state, { albumCommentList, albumCommentPage }) {
        const alreadyExistSeqs = state.albumCommentList.map(({ commentSeq }) => commentSeq);
        albumCommentList
            .filter(({ commentSeq }) => !alreadyExistSeqs.includes(commentSeq))
            .forEach(comment => state.albumCommentList.push(comment));
        state.albumCommentPage = albumCommentPage;
    },

    initAlbumCommentList(state) {
        state.albumCommentList = [];
        state.albumCommentPage = DefaultBuilder.buildPage();
    },

    countChildCommentCnt(state, seq) {
        state.albumCommentList = state.albumCommentList
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

    changeAlbumLike(state, { albumSeq, likeCnt, isLiked }) {
        const albumSeqNum = parseInt(albumSeq, 10);
        state.albumList = state.albumList.map(album => {
            if (album.albumSeq === albumSeqNum) {
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

    countAlbumCommentCnt(state, albumSeq) {
        const albumSeqNum = parseInt(albumSeq, 10);
        state.albumList = state.albumList.map(album => {
            if (album.albumSeq === albumSeqNum) {
                return {
                    ...album,
                    commentCnt: album.commentCnt + 1,
                };
            }
            return album;
        });
    },
};

export const actions = {
    async requestAlbumCreate({ _ }, clubAlbumCreateInfo) {
        return actionsNormalTemplate(
            async () => {
                await albumApi.postClubAlbumCreate(clubAlbumCreateInfo);
            },
        );
    },

    async requestAlbum({ commit }, seqInfo) {
        return actionsLoadingTemplate(
            commit,
            async () => {
                const album = await albumApi.getClubAlbum(seqInfo);
                commit('setAlbum', album);
            },
        );
    },

    async requestFirstAlbumList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(async () => {
            commit('initAlbumList');
            const requestDto = {
                clubSeq,
                requestParams: RequestConverter.convertPage(state.albumPage),
            };
            const albumListInfo = await albumApi.getClubAlbumList(requestDto);
            commit('setAlbumList', albumListInfo);
        });
    },

    async requestNextAlbumList({ commit, state }, clubSeq) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    clubSeq,
                    requestParams: RequestConverter.convertPage(state.albumPage),
                };
                const albumListInfo = await albumApi.getClubAlbumList(requestDto);
                commit('addNextAlbumList', albumListInfo);
            },
        );
    },

    async requestAlbumCommentWrite({ _ }, albumCommentWriteInfo) {
        return actionsNormalTemplate(
            async () => {
                await albumApi.postClubAlbumCommentWrite(albumCommentWriteInfo);
            },
        );
    },

    async requestFirstAlbumCommentList({ commit, state }, albumCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => {
                commit('initAlbumCommentList');
                const requestDto = {
                    ...albumCommentRequestInfo,
                    requestParams: RequestConverter.convertPage(state.albumCommentPage),
                };
                const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
                commit('setAlbumCommentList', albumListInfo);
            },
        );
    },

    async requestNextAlbumCommentList({ commit, state }, albumCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => {
                const requestDto = {
                    ...albumCommentRequestInfo,
                    requestParams: RequestConverter.convertPage(state.albumCommentPage),
                };
                const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
                commit('addNextAlbumCommentList', albumListInfo);
            },
        );
    },

    async requestAllAlbumCommentListWithPaging({ commit, state }, albumCommentRequestInfo) {
        return CommentHelper.requestAllCommentListWithPaging(
            albumCommentRequestInfo,
            () => state.albumCommentPage,
            async (requestDto) => {
                const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
                commit('addNextAlbumCommentListWithCheckDuplicate', albumListInfo);
            },
            async (requestDto) => {
                const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
                commit('addNextAlbumCommentList', albumListInfo);
            },
        );
    },

    async requestAllAlbumSubCommentList({ _ }, albumSubCommentRequestInfo) {
        return actionsNormalTemplate(
            async () => albumApi.getClubAlbumSubCommentList(albumSubCommentRequestInfo),
        );
    },

    async requestApplyLikeClubAlbum({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { albumSeq } = seqInfo;
                const { likeCnt } = await albumApi.postLikeClubAlbum(seqInfo);
                commit('changeAlbumLike', { albumSeq, likeCnt, isLiked: true });
            },
        );
    },

    async requestDeleteLikeClubAlbum({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { albumSeq } = seqInfo;
                const { likeCnt } = await albumApi.deleteLikeClubAlbum(seqInfo);
                commit('changeAlbumLike', { albumSeq, likeCnt, isLiked: false });
            },
        );
    },
};
