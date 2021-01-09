import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import albumApi from '@/apis/AlbumApi.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    album: defaultBuilder.buildAlbum(),
    albumList: [],
    albumPage: defaultBuilder.buildPage(),
    albumCommentList: [],
    albumCommentPage: defaultBuilder.buildPage(),
};

const getters = {
    album: (state) => state.album,
    albumList: (state) => state.albumList,
    albumPage: (state) => state.albumPage,
    albumCommentList: (state) => state.albumCommentList,
    albumCommentPage: (state) => state.albumCommentPage,
};

const mutations = {
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
        state.albumPage = defaultBuilder.buildPage();
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
        albumCommentList.forEach(comment => {
            // TODO: seq를 내려주면 그거로 변경하자.
            const isPresentInList = state.albumCommentList.find(({ registerTime, content }) => (registerTime === comment.registerTime) && (content === comment.content));
            if (!isPresentInList) {
                state.albumCommentList.push(comment);
            }
        });
        state.albumCommentPage = albumCommentPage;
    },

    initAlbumCommentList(state) {
        state.albumCommentList = [];
        state.albumCommentPage = defaultBuilder.buildPage();
    },

    changeAlbumLike(state, { likeCnt, isLike }) {
        state.album = {
            ...state.album,
            likeCnt,
            isLike,
        };
    },
};

const actions = {
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
        // 마지막 페이지면 현재 페이지를 조회하여 refresh해준다.
        if (state.albumCommentPage.isLastPage) {
            const requestDto = {
                ...albumCommentRequestInfo,
                requestParams: {
                    size: state.albumCommentPage.size,
                    page: state.albumCommentPage.currentPage,
                },
            };
            const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
            commit('addNextAlbumCommentListWithCheckDuplicate', albumListInfo);
        }
        const requestCommentListRecursive = async () => {
            if (state.albumCommentPage.isLastPage) return;

            const requestDto = {
                ...albumCommentRequestInfo,
                requestParams: RequestConverter.convertPage(state.albumCommentPage),
            };
            const albumListInfo = await albumApi.getClubAlbumCommentList(requestDto);
            commit('addNextAlbumCommentList', albumListInfo);
            requestCommentListRecursive();
        };
        return actionsNormalTemplate(async () => requestCommentListRecursive());
    },

    async requestApplyLikeClubAlbum({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { likeCnt } = await albumApi.postLikeClubAlbum(seqInfo);
                commit('changeAlbumLike', { likeCnt, isLike: true });
            },
        );
    },

    async requestDeleteLikeClubAlbum({ commit }, seqInfo) {
        return actionsNormalTemplate(
            async () => {
                const { likeCnt } = await albumApi.deleteLikeClubAlbum(seqInfo);
                commit('changeAlbumLike', { likeCnt, isLike: false });
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
