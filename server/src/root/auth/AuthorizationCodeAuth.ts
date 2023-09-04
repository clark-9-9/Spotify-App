//- Type of Authorization (Authorization Code Flow)
import { Request, Response } from "express";
import queryString from "node:querystring";
import { ResponseAccessToken, ResponseErrorToken } from "../Types/AuthTypes.js";
 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REDIRECT_URI = "http://localhost:8080/callback";
const REDIRECT_URI = "http://localhost:3000";



function generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
  
async function Login(req: Request, res: Response) {
    const state = generateRandomString(16);
    const scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-library-modify user-library-read user-follow-modify user-follow-read';

    const queryParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
    };

    const url: string = queryString.stringify(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${url}`;    
    
    res.redirect(authUrl);
}


async function Callback(req: Request, res: Response) {
    const code = req.body.code;
    
    try {
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';
        const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader,
            },
            body: queryString.stringify({
                code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        };

        const response = await fetch(tokenEndpoint, authOptions);
        const data: ResponseAccessToken | ResponseErrorToken = await response.json();
        if(!('error' in data)) {
            res.cookie('access_token', data.access_token, { httpOnly: true });
            res.cookie('refresh_token', data.refresh_token, { httpOnly: true });
        }  
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


async function RefreshToken(req: Request, res: Response) {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) return res.status(401).json({ error: 'Refresh token missing' });
    
    const tokenEndpoint = "https://accounts.spotify.com/api/token"; 
    const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token as string)}`;

    const authOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader
        },
        body: body
    }

    try {
        const response = await fetch(tokenEndpoint, authOptions);
        const data: Omit<ResponseAccessToken, "refresh_token"> | ResponseErrorToken = await response.json();
        if ("access_token" in data) {
            res.status(200).json({ 
                access_token: data.access_token,  
                expiries_in: data.expires_in
            });
        } else {
            res.status(401).json({ data });
        }
    } catch(error) {
        return res.status(500).json(error);
    }
}



/*
async function Callback(req: Request, res: Response) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    // const storedState = req.cookies ? req.cookies[stateKey] : null;
    
    try {
        if(state === null || code === null) {
            res.redirect('/#' +
            queryString.stringify({
                error: 'authorization_failed'
            }));
        } else {
            const tokenEndpoint = "https://accounts.spotify.com/api/token"; 
            const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
            const authOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": authHeader
                }, 
                body: queryString.stringify({
                    code: code as string,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code',
                }),
            }
            const response = await fetch(tokenEndpoint, authOptions);
            const data: ResponseAccessToken | ResponseErrorToken = await response.json();
            
            res.cookie( 
                'access_token', "access_token" in data ? data.access_token : null, 
                { httpOnly: true }
            ); 

            res.cookie( 
                'refresh_token', "refresh_token" in data ? data.refresh_token : null, 
                { httpOnly: true }
            ); 
            
            res.status(200).redirect("/"); 
           
        }
    } catch(error) {
        res.status(500).json({ error });
    }
}

async function RefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) return res.status(401).json({ error: 'Refresh token missing' });
    
    const tokenEndpoint = "https://accounts.spotify.com/api/token"; 
    const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token as string)}`;

    const authOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader
        },
        body: body
    }

    try {
        const response = await fetch(tokenEndpoint, authOptions);
        // const data: Omit<ResponseAccessToken, "refresh_token"> | ResponseErrorToken = await response.json();
        const data: ResponseAccessToken | ResponseErrorToken = await response.json();
        if ("access_token" in data) {
            return res.status(200).json({ 
                access_token: data.access_token,  
                refresh_token: data.refresh_token,
            });
        } else {
            return res.status(401).json({ error: data.error });
        }
    } catch(error) {
        return res.status(500).json(error);
    }
}

async function GetAccessToken(req: Request, res:Response) {
    const access_token = req.cookies.access_token;
    if (!access_token) return res.status(401).json({ error: 'Access token missing' });
    res.status(200).json({ access_token });
}
*/



export {
    Login,
    Callback,
    RefreshToken
};

