class SnackBarOption {
    constructor(
        message,
        location = SNACKBAR_LOCATION.BOTTOM,
        color = 'blue',
        time = 2000,
    ) {
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

export {
    SNACKBAR_LOCATION,
    SnackBarOption,
};
