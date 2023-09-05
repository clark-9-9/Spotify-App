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


export interface RefreshTokenResponseType {
    "access_token": string;
    "expires_in": number;
}


export interface ExpiredToken_BadRequest_BadOAuth {
    error: {
        status: number;
        message: string;    
    }
}