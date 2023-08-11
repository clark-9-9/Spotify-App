import { Request, Response } from "express";

const BASE_URL = "https://api.spotify.com";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

interface AccessTokenType {
    "access_token": string;
    "token_type": string;
    "expires_in": number;
    error?: any;
}


//- The type of Authorization is Client Credentials Flow
async function GetToken(): Promise<AccessTokenType>  {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': authHeader,
        },
        body: 'grant_type=client_credentials'
    };

    try {
        const tokenResponse = await fetch(tokenEndpoint, options)
        const tokenData = await tokenResponse.json();
        return tokenData;
    } catch(err) {
        throw new Error("Error fetching access token");
    }
}


async function GetAlbums(req: Request, res: Response) {
    try {
        const getToken = await GetToken();
        if(getToken.error) res.status(401).json({ error: getToken.error });

        const accessToken = getToken.access_token;
        const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';

        const option = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }

        const albumResponse = await fetch(albumsEndpoint, option);
        const albumsData = await albumResponse.json();

        if(albumsData.error) return res.status(401).json({ error: albumsData.error, getToken }); 
        return res.status(200).json({ albumsData, getToken });      
    } catch(err) {
        return res.status(500).json({ err });
    }
}


async function GetArtists(req: Request, res: Response) {
    // const{ limit, offset } = req.query;
    // const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=${offset}&limit=${limit}`;
    // const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums`;
    const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`;

    try {
        const getToken = await GetToken();
        if(getToken.error) res.status(401).json({ error: getToken.error });

        const accessToken = getToken.access_token;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const artistsResponse = await fetch(artistsEndpoint, options);
        const artistsData = await artistsResponse.json();

        if(artistsData.error) res.status(401).json({ error: artistsData.error });
        return res.status(200).json({ artistsData });

    } catch(err) {
        return res.status(500).json({ err });
    }
}


export { GetAlbums, GetArtists };