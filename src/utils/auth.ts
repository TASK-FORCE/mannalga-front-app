const TOKEN_KEY = 'appToken';

export class AuthUtils {
  static getAppToken(): string {
    return localStorage.getItem(TOKEN_KEY) || ''
  }

  static saveAppToken(appToken: string): void {
    localStorage.setItem(TOKEN_KEY, appToken);
  }

  static removeAppToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
