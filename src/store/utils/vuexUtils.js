import { SnackBarOption } from '@/utils/common/snackbarUtils.js';

const combineWithModuleName = (moduleName, name) => `${moduleName}/${name}`;

const extractResponseData = (response) => response && response.data && response.data.data;

const createSnackbarOption = (value) => {
    let snackBarOption;
    if (value instanceof SnackBarOption) {
        snackBarOption = value;
    } else if (typeof value === 'string') {
        snackBarOption = new SnackBarOption(value);
    } else {
        snackBarOption = new SnackBarOption();
    }
    return snackBarOption;
};

export { combineWithModuleName, extractResponseData, createSnackbarOption };
