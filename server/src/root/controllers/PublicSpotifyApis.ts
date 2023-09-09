import { Request, Response } from "express";
import { GetToken } from "../auth/ClientCredentialsAuth";



async function GetPlaylist(req: Request, res: Response) {
    const id: string = req.body.id;
    const accessToken: string = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
    

    try {
        const getPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${id}`;
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };

        const response = await fetch(getPlaylistEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (err) {
        console.log(err);
    }
}

async function GetArtist(req: Request, res: Response) {
    const id: string = req.body.id;
    const accessToken: string = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
    
    try {
        const getArtistEndpoint = `https://api.spotify.com/v1/artists/${id}`;
        
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }, 
        };

        const response = await fetch(getArtistEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (err) {
        console.log(err);
    }
}


async function GetArtistTopTrack(req: Request, res: Response) {
    const id: string = req.body.id;
    const accessToken: string = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
    
    try {
        const getArtistTopTrackEndpoint = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
        
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }, 
        };

        const response = await fetch(getArtistTopTrackEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (err) {
        console.log(err);
    }
}


export { 
    GetPlaylist,
    GetArtist,
    GetArtistTopTrack
};