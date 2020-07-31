const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const isAuth = () => !!getAccessToken();

const getAccessToken = () => (process.browser ? localStorage.getItem(ACCESS_TOKEN) : null);

const saveAppTokenToLocalStorage = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const removeAppTokenToLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export {
    isAuth,
    getAccessToken,
    saveAppTokenToLocalStorage,
    removeAppTokenToLocalStorage,
};
