interface AuthResponse {
    state: string;
    code?: string;
    error?: string;
}


export interface ResponseAccessToken {
    "access_token": string;
    "token_type": string;
    "scope": string;
    "expires_in": number;
    "refresh_token": string;
}
 

export interface ResponseErrorToken {
    "error": string;
    "error_description": string;
}