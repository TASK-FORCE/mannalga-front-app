const SNACKBAR_LOCATION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

const DEFAULT_SNACKBAR_OPTION = {
    MESSAGE: '요청에 실패했습니다.',
    LOCATION: SNACKBAR_LOCATION.BOTTOM,
    COLOR: 'blue',
    TIME: 1000,
};

function buildSnackBarOption(
    message = DEFAULT_SNACKBAR_OPTION.MESSAGE,
    location = DEFAULT_SNACKBAR_OPTION.LOCATION,
    color = DEFAULT_SNACKBAR_OPTION.COLOR,
    time = DEFAULT_SNACKBAR_OPTION.TIME,
) {
    return {
        message,
        location,
        color,
        time,
    };
}

export {
    SNACKBAR_LOCATION,
    buildSnackBarOption,
};
