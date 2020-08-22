import { CHANGE_LOADING, COMMON } from '@/store/type/common_type.js';

export const actionsLoadingTemplate = async (commit, callback) => {
    try {
        commit(`${COMMON}/${CHANGE_LOADING}`, true, { root: true });
        return await callback();
    } catch (e) {
        console.warn(e);
        return Promise.reject(e);
    } finally {
        commit(`${COMMON}/${CHANGE_LOADING}`, false, { root: true });
    }
};
