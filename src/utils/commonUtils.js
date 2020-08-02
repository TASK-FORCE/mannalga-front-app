const SNACKBAR_LOCATION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

const DEFAULT_SNACKBAR_OPTION = {
    message: '요청에 실패했습니다.',
    location: SNACKBAR_LOCATION.BOTTOM,
    color: 'blue',
};

function buildSnackBarMessage(message) {
    if (message) {
        return { message };
    }
    return DEFAULT_SNACKBAR_OPTION;
}

function buildSnackBarOption(message, location, color) {
    if (message && location && color) {
        return {
            message,
            location,
            color,
        };
    }
    return DEFAULT_SNACKBAR_OPTION;
}

export {
    SNACKBAR_LOCATION,
    buildSnackBarOption,
    buildSnackBarMessage,
};
