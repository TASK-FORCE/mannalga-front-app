import store from '@/store';
import router from '@/router';
import { MutationTypes, UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { AxiosError } from 'axios';
import { PATH } from '@/router/route_path_type';
import { MESSAGE } from '@/utils/common/constant/messages';
import { AuthUtils } from '@/utils/auth';

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

export const actionsNormalTemplate = async <T>(callback: () => Promise<T>, failCallback?: any): Promise<T> => {
  try {
    return await callback();
  } catch (e) {
    handleException(e, failCallback);
    return Promise.reject();
  }
};

function handleException(e: any, failCallback?: any) {
  if (isUnauthorizedError(e)) {
    handleForUnauthorized();
  } else {
    handleForOthers(e, failCallback);
  }
  throw e;
}

function isUnauthorizedError(e: any): boolean {
  return !!e.response?.status && e.response?.status === 401;
}

function handleForUnauthorized(): void {
  AuthUtils.removeAppToken();
  if (isLoginPage()) {
    return;
  }
  store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.TOKEN_EXPIRED);
  router.push(PATH.LOGIN);
}


function isLoginPage() {
  return router.currentRoute.path === PATH.LOGIN
}

function extractMessage(e: AxiosError) {
  if (e && e.response && e.response.data) {
    return e.response.data.message;
  }
  return null;
}

function handleForOthers(e: any, failCallback?: any) {
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

