import { CHANGE_LOADING, CLOSE_SNACKBAR, DEFAULT_SNACKBAR_OPTIONS, IS_LOADING, OPEN_SNACKBAR, SNACKBAR_OPTIONS, UPLOAD_TEMP_IMAGE } from '@/store/type/common_type.js';
import { actionsLoadingTemplate } from '@/store/helper/actionsTemplate.js';
import { uploadTempImage } from '@/apis/common.js';
import { extractResponseData } from '@/store/helper/vuexUtils.js';

const state = {
    loading: false,
    [SNACKBAR_OPTIONS]: DEFAULT_SNACKBAR_OPTIONS,
};

const getters = {
    [IS_LOADING](state) {
        return state.loading;
    },
    [SNACKBAR_OPTIONS](state) {
        return state[SNACKBAR_OPTIONS];
    },
};

const mutations = {
    [CHANGE_LOADING](state, value) {
        state.loading = !!value;
    },
    [OPEN_SNACKBAR](state, snackBarOptions) {
        state[SNACKBAR_OPTIONS].message = snackBarOptions.message || state[SNACKBAR_OPTIONS].message;
        state[SNACKBAR_OPTIONS].color = snackBarOptions.color || state[SNACKBAR_OPTIONS].color;
        state[SNACKBAR_OPTIONS].location = snackBarOptions.location || state[SNACKBAR_OPTIONS].location;
        state[SNACKBAR_OPTIONS].time = snackBarOptions.time || state[SNACKBAR_OPTIONS].time;
        state[SNACKBAR_OPTIONS].open = true;
    },
    [CLOSE_SNACKBAR](state) {
        state[SNACKBAR_OPTIONS].open = false;
    },
};

const actions = {
    [UPLOAD_TEMP_IMAGE]({ commit }, formData) {
        if (formData instanceof FormData) {
            return actionsLoadingTemplate(commit, async () => {
                const response = await uploadTempImage(formData);
                const data = extractResponseData(response);
                return data.absolutePath;
            });
        }

        throw new Error('Image must be file type.');
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
