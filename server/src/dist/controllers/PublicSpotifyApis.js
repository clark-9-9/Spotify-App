"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArtistTopTrack = exports.GetArtist = exports.GetPlaylist = void 0;
async function GetPlaylist(req, res) {
    const id = req.body.id;
    const accessToken = req.body.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const getPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${id}`;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };
        const response = await fetch(getPlaylistEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
    }
}
exports.GetPlaylist = GetPlaylist;
async function GetArtist(req, res) {
    const id = req.body.id;
    const accessToken = req.body.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const getArtistEndpoint = `https://api.spotify.com/v1/artists/${id}`;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };
        const response = await fetch(getArtistEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
    }
}
exports.GetArtist = GetArtist;
async function GetArtistTopTrack(req, res) {
    const id = req.body.id;
    const accessToken = req.body.access_token;
    if (!accessToken)
        return res.status(401).json({ error: 'Access token missing' });
    try {
        const getArtistTopTrackEndpoint = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        };
        const response = await fetch(getArtistTopTrackEndpoint, options);
        const data = await response.json();
        res.status(200).json({ data });
    }
    catch (err) {
        console.log(err);
    }
}
exports.GetArtistTopTrack = GetArtistTopTrack;
