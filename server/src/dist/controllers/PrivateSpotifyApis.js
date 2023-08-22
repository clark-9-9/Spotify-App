"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUsersPlaylists = void 0;
async function GetCurrentUsersPlaylists(req, res) {
    const accessToken = req.cookies.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const playlistsEndpoint = 'https://api.spotify.com/v1/me';
        const playlistsResponse = await fetch(playlistsEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (playlistsResponse.ok) {
            const playlistsData = await playlistsResponse.json();
            return res.status(200).json({ playlistsData });
        }
        else {
            return res.status(playlistsResponse.status).json({ error: 'Failed to fetch playlists' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
exports.GetCurrentUsersPlaylists = GetCurrentUsersPlaylists;
;
