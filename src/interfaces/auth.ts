export interface KakaoTokenRequest {
    grant_type: string;
    client_id: string;
    redirect_uri: string;
    code: string;
}

export interface KakaoTokenResponse {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: string;
}

export interface ServerTokenRequest {
    access_token: string;
    expireds_in: string;
    refresh_token: string;
    refresh_token_expires_in: string;
}
