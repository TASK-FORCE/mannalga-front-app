import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import commonApi from '@/apis/CommonApi.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    loading: false,
    snackBarOptions: defaultBuilder.buildDefaultSnackBarOption(),
    openSnackBar: false,
};

const getters = {
    isLoading: (state) => state.loading,
    snackBarOptions: (state) => state.snackBarOptions,
    openSnackBar: (state) => state.openSnackBar,
};

const mutations = {
    changeLoading(state, value) {
        state.loading = !!value;
    },
    openSnackBar(state, snackBarOptions) {
        state.snackBarOptions = snackBarOptions;
        state.openSnackBar = true;
    },
    closeSnackBar(state) {
        state.openSnackBar = false;
    },
};

const actions = {
    uploadTempImage({ commit }, formData) {
        if (formData instanceof FormData) {
            return actionsNormalTemplate(async () => {
                const tempImageInfo = await commonApi.postTempImage(formData);
                return { ...tempImageInfo };
            });
        }

        throw new Error('Image must be file type.');
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
