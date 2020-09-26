class SnackBarOption {
    constructor(message, location, color, time) {
        this.message = message;
        this.location = location;
        this.color = color;
        this.time = time;
    }
}

const SNACKBAR_LOCATION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

const buildSnackBarOption = (
    message = '요청에 실패했습니다.',
    location = SNACKBAR_LOCATION.BOTTOM,
    color = 'blue',
    time = 2000,
) => new SnackBarOption(message, location, color, time);

export {
    SNACKBAR_LOCATION,
    buildSnackBarOption,
    SnackBarOption,
};
