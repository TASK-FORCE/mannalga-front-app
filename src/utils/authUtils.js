import { APP_TOKEN } from '@/store/type/auth_type.js';

const getAppToken = () => (process.browser ? localStorage.getItem(APP_TOKEN) : null);

const saveAppTokenToLocalStorage = (appToken) => {
    localStorage.setItem(APP_TOKEN, appToken);
};

const removeAppTokenToLocalStorage = () => {
    localStorage.removeItem(APP_TOKEN);
};

const setAppTokenAsDefaultHeader = (headers) => {
    const appToken = getAppToken();
    if (appToken) {
        // eslint-disable-next-line no-param-reassign
        headers.common.Authorization = `Bearer ${appToken}`;
    }
};

export {
    getAppToken,
    saveAppTokenToLocalStorage,
    removeAppTokenToLocalStorage,
    setAppTokenAsDefaultHeader,
};
