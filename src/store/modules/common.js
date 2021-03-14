import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import commonApi from '@/apis/CommonApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import { changeThemeAndLoad, isDarkTheme } from '@/plugins/vuetify.js';

const state = {
    loading: false,
    snackBarOptions: DefaultBuilder.buildDefaultSnackBarOption(),
    openSnackBar: false,
    isFocusingChildCommentInput: false,
    isDarkTheme: false,
};

const getters = {
    isLoading: (state) => state.loading,
    snackBarOptions: (state) => state.snackBarOptions,
    openSnackBar: (state) => state.openSnackBar,
    isFocusingChildCommentInput: (state) => state.isFocusingChildCommentInput,
    isDarkTheme: (state) => state.isDarkTheme,
};

const mutations = {
    changeLoading(state, value) {
        state.loading = !!value;
    },
    openSnackBar(state, snackBarOptions) {
        state.snackBarOptions = snackBarOptions;
    },
    closeSnackBar(state) {
        state.snackBarOptions = {
            ...state.snackBarOptions,
            open: false,
        };
    },
    focusChildCommentInput(state) {
        state.isFocusingChildCommentInput = true;
    },
    focusOutChildCommentInput(state) {
        state.isFocusingChildCommentInput = false;
    },
    changeTheme(state) {
        changeThemeAndLoad();
        state.isDarkTheme = isDarkTheme();
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
