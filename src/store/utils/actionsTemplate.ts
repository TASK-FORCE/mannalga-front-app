import { MESSAGE } from '@/utils/common/constant/messages.ts';
import store from '@/store';
import { MutationTypes, UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { AxiosError } from 'axios';

export const actionsLoadingTemplate = async <T>(
  callback: () => Promise<T>,
  mutationTypes: MutationTypes = UIMutationTypes.CHANGE_LOADING,
  failCallback?: any,
): Promise<T> => {
  try {
    store.commit(mutationTypes, true);
    return await callback();
  } catch (e) {
    console.log(e);
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
    console.log(e);
    handleException(e, failCallback);
    return Promise.reject();
  }
};

function handleException(e: AxiosError, failCallback?: any) {
  const errorMessageFromServer = extractMessage(e);
  if (errorMessageFromServer) {
    store.commit(UIMutationTypes.OPEN_SNACK_BAR, errorMessageFromServer);
  } else {
    store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SERVER_INSTABILITY);
  }

  if (failCallback) {
    failCallback();
  }
  throw e;
}

function extractMessage(e: AxiosError) {
  if (e && e.response && e.response.data) {
    return e.response.data.message;
  }
  return null;
}
