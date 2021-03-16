import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import commonApi from '@/apis/CommonApi.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { changeThemeAndLoad, isDarkTheme } from '@/plugins/vuetify.js';
import { SnackBarOption } from '@/utils/common/snackbarUtils';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes';
import { CommonActionContext } from '@/store/type/actionContextTypes';
import { UploadImageResponse } from '@/interfaces/common';

export const state = {
    loading: false as boolean,
    snackBarOptions: DefaultBuilder.snackbarOption() as SnackBarOption,
    focusingChildCommentInput: false as boolean,
    isDarkTheme: false as boolean,
};
export type CommonState = typeof state;

export const mutations = {
    [MutationTypes.CHANGE_LOADING](state: CommonState, value: boolean) {
        state.loading = value;
    },
    [MutationTypes.OPEN_SNACK_BAR](state: CommonState, message: string) {
        state.snackBarOptions = new SnackBarOption(
            message,
            state.snackBarOptions.location,
            state.snackBarOptions.color,
            state.snackBarOptions.time,
            true
        );
    },
    [MutationTypes.CLOSE_SNACK_BAR](state: CommonState) {
        state.snackBarOptions = new SnackBarOption(
            state.snackBarOptions.message,
            state.snackBarOptions.location,
            state.snackBarOptions.color,
            state.snackBarOptions.time,
            false
        );
    },
    [MutationTypes.FOCUS_CHILD_COMMENT_INPUT](state: CommonState) {
        state.focusingChildCommentInput = true;
    },
    [MutationTypes.FOCUS_OUT_CHILD_COMMENT_INPUT](state: CommonState) {
        state.focusingChildCommentInput = false;
    },
    [MutationTypes.CHANGE_THEME](state: CommonState) {
        changeThemeAndLoad();
        state.isDarkTheme = isDarkTheme();
    },
};
export type CommonMutations = typeof mutations;

export const actions = {
    async [ActionTypes.UPLOAD_TEMP_IMAGE](context: CommonActionContext, formData: FormData): Promise<UploadImageResponse> {
        return actionsNormalTemplate(async () => {
            const uploadImageResponse = await commonApi.postTempImage(formData);
            return { ...uploadImageResponse };
        });
    },
};
export type CommonActions = typeof actions;
