import { actionsLoadingTemplate } from '@/store/utils/actionsTemplate.js';
import commonApi from '@/apis/CommonApi.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    loading: false,
    snackBarOptions: defaultBuilder.buildDefaultSnackBarOption(),
};

const getters = {
    isLoading(state) {
        return state.loading;
    },
    snackBarOptions(state) {
        return state.snackBarOptions;
    },
};

const mutations = {
    changeLoading(state, value) {
        state.loading = !!value;
    },
    openSnackBar(state, snackBarOptions) {
        state.snackBarOptions = snackBarOptions;
        state.snackBarOptions.open = true;
    },
    closeSnackBar(state) {
        state.snackBarOptions.open = false;
    },
};

const actions = {
    uploadTempImage({ commit }, formData) {
        if (formData instanceof FormData) {
            return actionsLoadingTemplate(commit, async () => {
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
