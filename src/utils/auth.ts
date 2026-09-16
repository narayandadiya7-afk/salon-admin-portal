/**
 * Auth Utility
 * Enhanced authentication utilities with proper logout and token management
 */

import { StoreUtil } from "./store";

// Token keys from environment
const ACCESS_TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_ACCESS_TOKEN_KEY || "access_token";
const REFRESH_TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_REFRESH_TOKEN_KEY || "refresh_token";

class AuthUtil {
  /**
   * Set access token in cookie
   */
  static setToken(token: string): void {
    StoreUtil.setCookie(ACCESS_TOKEN_KEY, `Bearer ${token}`);
  }

  /**
   * Get access token from cookie
   */
  static getToken(): string | null {
    const token = StoreUtil.getCookie(ACCESS_TOKEN_KEY);
    return token || null;
  }

  /**
   * Get authorization header object
   */
  static getAuthHeader(): object {
    const token = this.getToken();
    return token ? { Authorization: token } : {};
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.length > 0;
  }

  /**
   * Check if token exists
   */
  static isTokenExist(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Clear all authentication data
   */
  static clearAuth(): void {
    StoreUtil.removeCookie(ACCESS_TOKEN_KEY);
    StoreUtil.removeCookie(REFRESH_TOKEN_KEY);
    StoreUtil.removeAllCookies();
  }

  /**
   * Logout user - clear cookies and redirect
   */
  static logout(): void {
    // Clear all auth data
    this.clearAuth();

    // Redirect to login page
    window.location.href = "/login";
  }

  /**
   * Get logged user details from token (placeholder - implement based on your token structure)
   */
  static async getLoggedUserDetail<TUser>(): Promise<TUser | undefined> {
    // TODO: Implement token decoding or API call to get user details
    return undefined;
  }

  /**
   * Fetch user preferences (placeholder)
   */
  static async fetchPreferences<TPreference>(): Promise<TPreference | null> {
    // TODO: Implement preferences fetching
    return null;
  }

  /**
   * Refresh access token using refresh token (placeholder)
   */
  static async refreshToken(): Promise<boolean> {
    const refreshToken = StoreUtil.getCookie(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return false;
    }
    // TODO: Implement token refresh logic
    return false;
  }
}

export { AuthUtil as default };
