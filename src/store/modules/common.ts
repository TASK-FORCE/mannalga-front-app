import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import commonApi from '@/apis/CommonApi.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';
import { changeThemeAndLoad, isDarkTheme } from '@/plugins/vuetify.js';

export const state = {
    loading: false,
    snackBarOptions: DefaultBuilder.buildDefaultSnackBarOption(),
    openSnackBar: false,
    isFocusingChildCommentInput: false,
    isDarkTheme: false,
};

export enum CommonGetterTypes {
    IS_LOADING = 'common/isLoading',
    SNACK_BAR_OPTIONS = 'common/snackBarOptions',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    IS_FOCUSING_CHILD_COMMENT_INPUT = 'common/isFocusingChildCommentInput',
    IS_DARK_THEME = 'common/isDarkTheme',
}

export const getters = {
    [CommonGetterTypes.IS_LOADING]: (state): boolean => state.loading,
    [CommonGetterTypes.SNACK_BAR_OPTIONS]: (state) => state.snackBarOptions,
    [CommonGetterTypes.OPEN_SNACK_BAR]: (state) => state.openSnackBar,
    [CommonGetterTypes.IS_FOCUSING_CHILD_COMMENT_INPUT]: (state) => state.isFocusingChildCommentInput,
    [CommonGetterTypes.IS_DARK_THEME]: (state) => state.isDarkTheme,
};

export enum CommonMutationTypes {
    CHANGE_LOADING = 'common/changeLoading',
    OPEN_SNACK_BAR = 'common/openSnackBar',
    CLOSE_SNACK_BAR = 'common/closeSnackBar',
    FOCUS_CHILD_COMMENT_INPUT = 'common/focusChildCommentInput',
    FOCUS_OUT_CHILD_COMMENT_INPUT = 'common/focusOutChildCommentInput',
    CHANGE_THEME = 'common/changeTheme',
}

export const mutations = {
    [CommonMutationTypes.CHANGE_LOADING](state, value) {
        state.loading = !!value;
    },
    [CommonMutationTypes.OPEN_SNACK_BAR](state, snackBarOptions) {
        state.snackBarOptions = snackBarOptions;
    },
    [CommonMutationTypes.CLOSE_SNACK_BAR](state) {
        state.snackBarOptions = { ...state.snackBarOptions, open: false, };
    },
    [CommonMutationTypes.FOCUS_CHILD_COMMENT_INPUT](state) {
        state.isFocusingChildCommentInput = true;
    },
    [CommonMutationTypes.FOCUS_OUT_CHILD_COMMENT_INPUT](state) {
        state.isFocusingChildCommentInput = false;
    },
    [CommonMutationTypes.CHANGE_THEME](state) {
        changeThemeAndLoad();
        state.isDarkTheme = isDarkTheme();
    },
};

export enum CommonActionTypes {
    UPLOAD_TEMP_IMAGE = 'common/uploadTempImage'
}

export const actions = {
    [CommonActionTypes.UPLOAD_TEMP_IMAGE]({ commit }, formData) {
        if (formData instanceof FormData) {
            return actionsNormalTemplate(async () => {
                const tempImageInfo = await commonApi.postTempImage(formData);
                return { ...tempImageInfo };
            });
        }

        throw new Error('Image must be file type.');
    },
};

export type CommonState = typeof state;
export type CommonGetters = typeof getters;
export type CommonMutations = typeof mutations;
export type CommonActions = typeof actions;
