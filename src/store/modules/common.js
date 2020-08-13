const state = {
    loading: false,
    snackBarOption: {
        message: '',
        open: false,
        color: 'pink',
        location: 'bottom',
    },
};

const getters = {
    isLoading(state) {
        return state.loading;
    },
    snackBarOption(state) {
        return state.snackBarOption;
    },
};

const mutations = {
    changeLoading(state, value) {
        state.loading = !!value;
    },
    openSnackBar(state, snackBarOption) {
        state.snackBarOption.message = snackBarOption.message || state.snackBarOption.message;
        state.snackBarOption.color = snackBarOption.color || state.snackBarOption.color;
        state.snackBarOption.location = snackBarOption.location || state.snackBarOption.location;
        state.snackBarOption.time = snackBarOption.time || state.snackBarOption.time;
        state.snackBarOption.open = true;
    },
    closeSnackBar(state) {
        state.snackBarOption.open = false;
    },
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
};
