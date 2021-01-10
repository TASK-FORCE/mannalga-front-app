const tokenKey = 'appToken';

class AuthUtils {
    static getAppToken = () => (process.browser ? localStorage.getItem(tokenKey) : null);

    static saveAppTokenToLocalStorage = (appToken) => {
        localStorage.setItem(tokenKey, appToken);
    };

    static removeAppTokenToLocalStorage = () => {
        localStorage.removeItem(tokenKey);
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
