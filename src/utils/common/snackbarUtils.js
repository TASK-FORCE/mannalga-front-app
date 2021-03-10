class SnackBarOption {
    constructor(
        message,
        location = SNACKBAR_LOCATION.BOTTOM,
        color = 'blue',
        time = 2000,
        open = true,
    ) {
        this.message = message;
        this.location = location;
        this.color = color;
        this.time = time;
        this.open = open;
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
