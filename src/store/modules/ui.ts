import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import commonApi from '@/apis/CommonApi.ts';
import StateInitializer from '@/store/utils/StateInitializer.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { UIActionContext } from '@/store/type/actionContextTypes';
import { SnackBarOption, UploadImageResponse } from '@/interfaces/common';
import { UIActionTypes } from '@/store/type/actionTypes';
import { changeThemeAndLoad, isDarkTheme } from '@/utils/theme';

export const state = {
  loading: false as boolean,
  snackBarOptions: StateInitializer.snackbarOption() as SnackBarOption,
  isDarkTheme: isDarkTheme() as boolean,
  width: window.innerWidth as number,
};
export type UIState = typeof state;

export const mutations = {
  [UIMutationTypes.CHANGE_LOADING](state: UIState, value: boolean) {
    state.loading = value;
  },
  [UIMutationTypes.OPEN_SNACK_BAR](state: UIState, message: string) {
    state.snackBarOptions = {
      ...state.snackBarOptions,
      message,
      open: true
    }
  },
  [UIMutationTypes.CLOSE_SNACK_BAR](state: UIState) {
    state.snackBarOptions = {
      ...state.snackBarOptions,
      open: false,
    }
  },
  [UIMutationTypes.CHANGE_THEME](state: UIState) {
    changeThemeAndLoad();
    state.isDarkTheme = isDarkTheme();
  },
  [UIMutationTypes.CHANGE_WIDTH](state: UIState, width: number) {
    state.width = width;
  },
};
export type UIMutations = typeof mutations;

export const actions = {
  async [UIActionTypes.UPLOAD_TEMP_IMAGE](context: UIActionContext, formData: FormData): Promise<UploadImageResponse> {
    return actionsNormalTemplate(async () => {
      const uploadImageResponse = await commonApi.postTempImage(formData);
      return { ...uploadImageResponse };
    });
  },
};
export type UIActions = typeof actions;
