import { Request, Response } from "express";



async function GetCurrentUsersTracks(req: Request, res: Response) { 
    const accessToken = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });

    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }   
}


async function GetCurrentUsersPlaylists(req: Request, res: Response) {
    const accessToken = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });

    
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
}


async function GetCurrentUsersFollowing(req: Request, res: Response) {
    const accessToken = req.body.access_token;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });

    
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const response = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50", options);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
}





export { 
    GetCurrentUsersTracks,
    GetCurrentUsersPlaylists,
    GetCurrentUsersFollowing
};