import { APP_TOKEN } from '@/store/type/auth_type.js';

const isAuth = () => !!getAccessToken();

const getAccessToken = () => (process.browser ? localStorage.getItem(APP_TOKEN) : null);

const saveAppTokenToLocalStorage = (appToken) => {
    localStorage.setItem(APP_TOKEN, appToken);
};

const removeAppTokenToLocalStorage = () => {
    localStorage.removeItem(APP_TOKEN);
};

export {
    isAuth,
    getAccessToken,
    saveAppTokenToLocalStorage,
    removeAppTokenToLocalStorage,
};
