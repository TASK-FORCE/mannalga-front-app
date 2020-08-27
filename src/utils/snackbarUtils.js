const SNACKBAR_LOCATION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

const MESSAGE = '요청에 실패했습니다.';
const LOCATION = SNACKBAR_LOCATION.BOTTOM;
const COLOR = 'blue';
const TIME = 2000;

function buildSnackBarOption(
    message = MESSAGE,
    location = LOCATION,
    color = COLOR,
    time = TIME,
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
