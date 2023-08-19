//- Type of Authorization (Authorization Code Flow)
import { Request, Response, NextFunction } from "express";
import queryString from "node:querystring";
import { ResponseAccessToken, ResponseErrorToken } from "../Types/AuthTypes";


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/callback";



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
    const scope = 'user-read-private user-read-email';

    const queryParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
    };

    const url: string = queryString.stringify(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${url}`;    
    
    res.redirect(authUrl);
}


async function Callback(req: Request, res: Response, next: NextFunction) {
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
                'access_token', 
                "access_token" in data ? data.access_token : null, 
                { httpOnly: true }
            ); 

            res.cookie( 
                'refresh_token', 
                "refresh_token" in data ? data.refresh_token : null, 
                { httpOnly: true }
            ); 

            res.redirect("/")
            // response.ok ? res.status(200): res.status(401);
            // res.json({ data, status: res.statusCode });
        }
    } catch(err) {
        // res.status(500).json(err);
        console.error(err);
    }
}



async function RefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

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
        const data: ResponseAccessToken | ResponseErrorToken = await response.json();
        if (response.ok) res.status(200).json({ data, status: 200 });
        else res.status(401).json({ data, status: 401 });
    } catch(err) {
        res.status(500).json(err);
    }
}


async function GetCurrentUsersPlaylists(req: Request, res: Response)  {
    // if("access_token" in )
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token missing' });
    }

    try {
        const playlistsEndpoint = 'https://api.spotify.com/v1/me';
        const playlistsResponse = await fetch(playlistsEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (playlistsResponse.ok) {
            const playlistsData = await playlistsResponse.json();
            res.status(200).json({ playlistsData });
        } else {
            res.status(playlistsResponse.status).json({ error: 'Failed to fetch playlists' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export { Login, Callback, RefreshToken, GetCurrentUsersPlaylists };