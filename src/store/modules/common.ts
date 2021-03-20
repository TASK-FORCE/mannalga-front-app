import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import commonApi from '@/apis/CommonApi.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes';
import { CommonActionContext } from '@/store/type/actionContextTypes';
import { SnackBarOption, UploadImageResponse } from '@/interfaces/common';
import { CommonActionTypes } from '@/store/type/actionTypes';
import { changeThemeAndLoad, isDarkTheme } from '@/utils/theme';

export const state = {
    loading: false as boolean,
    snackBarOptions: DefaultBuilder.snackbarOption() as SnackBarOption,
    focusingChildCommentInput: false as boolean,
    isDarkTheme: isDarkTheme() as boolean,
};
export type CommonState = typeof state;

export const mutations = {
    [CommonMutationTypes.CHANGE_LOADING](state: CommonState, value: boolean) {
        state.loading = value;
    },
    [CommonMutationTypes.OPEN_SNACK_BAR](state: CommonState, message: string) {
        state.snackBarOptions = {
            ...state.snackBarOptions,
            message,
            open: true
        }
    },
    [CommonMutationTypes.CLOSE_SNACK_BAR](state: CommonState) {
        state.snackBarOptions = {
            ...state.snackBarOptions,
            open: false,
        }
    },
    [CommonMutationTypes.FOCUS_CHILD_COMMENT_INPUT](state: CommonState) {
        state.focusingChildCommentInput = true;
    },
    [CommonMutationTypes.FOCUS_OUT_CHILD_COMMENT_INPUT](state: CommonState) {
        state.focusingChildCommentInput = false;
    },
    [CommonMutationTypes.CHANGE_THEME](state: CommonState) {
        changeThemeAndLoad();
        state.isDarkTheme = isDarkTheme();
    },
};
export type CommonMutations = typeof mutations;

export const actions = {
    async [CommonActionTypes.UPLOAD_TEMP_IMAGE](context: CommonActionContext, formData: FormData): Promise<UploadImageResponse> {
        return actionsNormalTemplate(async () => {
            const uploadImageResponse = await commonApi.postTempImage(formData);
            return { ...uploadImageResponse };
        });
    },
};
export type CommonActions = typeof actions;
