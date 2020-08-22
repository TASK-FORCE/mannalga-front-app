import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';

export const actionsLoadingTemplate = async (commit, callback, failCallback) => {
    try {
        commit(`${COMMON}/${CHANGE_LOADING}`, true, { root: true });
        return await callback();
    } catch (e) {
        console.warn(e);
        if (failCallback) {
            failCallback();
        }
        return Promise.reject(e);
    } finally {
        commit(`${COMMON}/${CHANGE_LOADING}`, false, { root: true });
    }
};

export const actionsNormalTemplate = async (callback, failCallback) => {
    try {
        return await callback();
    } catch (e) {
        console.warn(e);
        if (failCallback) {
            failCallback();
        }
        return Promise.reject(e);
    }
};
