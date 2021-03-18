const TOKEN_KEY = 'appToken';

class AuthUtils {
    static getAppToken = () => (process.browser ? localStorage.getItem(TOKEN_KEY) : null);

    static saveAppTokenToLocalStorage = (appToken) => {
        localStorage.setItem(TOKEN_KEY, appToken);
    };

    static removeAppTokenToLocalStorage = () => {
        localStorage.removeItem(TOKEN_KEY);
    };

    static setAppTokenAsDefaultHeader = (headers) => {
        const appToken = this.getAppToken();
        if (appToken) {
            // eslint-disable-next-line no-param-reassign
            headers.common.Authorization = `Bearer ${appToken}`;
        }
    };
}

export { AuthUtils };
