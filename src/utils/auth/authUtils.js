const tokenKey = 'appToken';
const getAppToken = () => (process.browser ? localStorage.getItem(tokenKey) : null);

const saveAppTokenToLocalStorage = (appToken) => {
    localStorage.setItem(tokenKey, appToken);
};

const removeAppTokenToLocalStorage = () => {
    localStorage.removeItem(tokenKey);
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
