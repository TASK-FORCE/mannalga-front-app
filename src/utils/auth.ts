const TOKEN_KEY = 'appToken';

export class AuthUtils {
    static getAppToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    };

    static saveAppTokenToLocalStorage(appToken: string): void {
        localStorage.setItem(TOKEN_KEY, appToken);
    };

    static removeAppTokenToLocalStorage(): void {
        localStorage.removeItem(TOKEN_KEY);
    };
}
