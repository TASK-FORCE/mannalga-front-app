import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import albumApi from '@/apis/AlbumApi.js';
import RequestConverter from '@/store/converter/requestConverter.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    album: defaultBuilder.buildAlbum(),
    albumList: [],
    albumPage: defaultBuilder.buildPage(),
};

const getters = {
    album: (state) => state.album,
    albumList: (state) => state.albumList,
    albumPage: (state) => state.albumPage,
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
};

const actions = {
    async requestAlbumCreate({ _ }, clubAlbumCreateInfo) {
        return actionsNormalTemplate(async () => {
            await albumApi.postClubAlbumCreate(clubAlbumCreateInfo);
        });
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
        return actionsNormalTemplate(async () => {
            const requestDto = {
                clubSeq,
                requestParams: RequestConverter.convertPage(state.albumPage),
            };
            const albumListInfo = await albumApi.getClubAlbumList(requestDto);
            commit('addNextAlbumList', albumListInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
