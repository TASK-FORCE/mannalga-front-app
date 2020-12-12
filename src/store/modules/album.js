import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import albumApi from '@/apis/AlbumApi.js';

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
    async requestAlbumCreate({ _ }, clubAlbumCreateInfo) {
        return actionsNormalTemplate(async () => {
            await albumApi.postClubAlbumCreate(clubAlbumCreateInfo);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
