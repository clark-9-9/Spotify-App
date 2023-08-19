import { Request } from 'express';
import { ResponseAccessToken, ResponseErrorToken } from "./src/root/Types/AuthTypes"

// ----------------------------------------------------------------

declare module '*.txt' {
    const content: string;
    export default content;
}

declare module '*.html' {
    const value: string;
    export default value
}


declare module 'express' {
    interface Request {
        data?: ResponseAccessToken | ResponseErrorToken;
    }
}
