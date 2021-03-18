import { MESSAGE } from '@/utils/common/constant/messages.js';
import store from '@/store';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export const actionsLoadingTemplate = async <T>(
    callback: () => Promise<T>,
    mutationTypes: MutationTypes = MutationTypes.CHANGE_LOADING,
    failCallback?,
): Promise<T> => {
    try {
        store.commit(mutationTypes, true);
        return await callback();
    } catch (e) {
        console.log(e);
        handleException(e, failCallback);
    } finally {
        store.commit(mutationTypes, false);
    }
};

export const actionsNormalTemplate = async <T>(callback: () => Promise<T>, failCallback?): Promise<T> => {
    try {
        return await callback();
    } catch (e) {
        console.log(e);
        handleException(e, failCallback);
    }
};

function handleException(e, failCallback) {
    const errorMessageFromServer = extractMessage(e);
    if (errorMessageFromServer) {
        store.commit(MutationTypes.OPEN_SNACK_BAR, errorMessageFromServer);
    } else {
        store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.SERVER_INSTABILITY);
    }

    if (failCallback) {
        failCallback();
    }
    throw e;
}

function extractMessage(e) {
    if (e && e.response && e.response.data) {
        return e.response.data.message;
    }
    return null;
}
