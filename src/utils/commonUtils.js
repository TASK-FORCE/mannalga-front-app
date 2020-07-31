function isEmpty(target) {
    if (!target) {
        return true;
    }

    if (typeof target === 'string') {
        return target === '';
    }

    if (target instanceof Array) {
        return target.length === 0;
    }
    // isEmpty 기능을 추가하고 싶으면 추가한다.

    console.error(`isEmpty를 구현하지 않았습니다. target:${target}`);
    return false;
}

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
    isEmpty,
    SNACKBAR_LOCATION,
    buildSnackBarOption,
    buildSnackBarMessage,
};
