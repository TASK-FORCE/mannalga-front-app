import store from '@/store';
import { MutationTypes, UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { AxiosError } from 'axios';
import { MESSAGE } from '@/utils/common/constant/messages';
import { AuthUtils } from '@/utils/auth';
import routerHelper from '@/router/RouterHelper';

export const actionsLoadingTemplate = async <T>(
  callback: () => Promise<T>,
  mutationTypes: MutationTypes = UIMutationTypes.CHANGE_LOADING,
  failCallback?: any,
): Promise<T> => {
  try {
    store.commit(mutationTypes, true);
    return await callback();
  } catch (e) {
    handleException(e, failCallback);
    return Promise.reject();
  } finally {
    store.commit(mutationTypes, false);
  }
};

export const actionsNormalTemplate = async <T>(callback: () => Promise<T>, failCallback?: () => any): Promise<T> => {
  try {
    return await callback();
  } catch (e) {
    handleException(e, failCallback);
    return Promise.reject();
  }
};

function handleException(e: any, failCallback?: () => any) {
  if (AuthUtils.isUnauthorizedError(e)) {
    handleForUnauthorized();
  } else {
    handleForOthers(e, failCallback);
  }
  throw e;
}

function handleForUnauthorized(): void {
  AuthUtils.removeAppToken();
  routerHelper.pushWhenUnauthorizedError();
  store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.TOKEN_EXPIRED);
}


function extractMessage(e: AxiosError) {
  if (e && e.response && e.response.data) {
    return e.response.data.message;
  }
  return null;
}

function handleForOthers(e: any, failCallback?: () => any) {
  const errorMessageFromServer = extractMessage(e);
  if (errorMessageFromServer) {
    store.commit(UIMutationTypes.OPEN_SNACK_BAR, errorMessageFromServer);
  } else {
    store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SERVER_INSTABILITY);
  }

  if (failCallback) {
    failCallback();
  }
}

