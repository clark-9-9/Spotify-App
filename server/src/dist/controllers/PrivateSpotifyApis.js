"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUsersPlaylists = exports.GetCurrentUsersTracks = void 0;
async function GetCurrentUsersTracks(req, res) {
    // const accessToken = req.cookies.access_token;
    const accessToken = req.body.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", options);
        const data = await response.json();
        res.status(200).json({ data });
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetCurrentUsersTracks = GetCurrentUsersTracks;
async function GetCurrentUsersPlaylists(req, res) {
    // const accessToken = req.cookies.access_token;
    const accessToken = req.body.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", options);
        const data = await response.json();
        res.status(200).json({ data });
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetCurrentUsersPlaylists = GetCurrentUsersPlaylists;
