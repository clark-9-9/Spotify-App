"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArtists = exports.GetAlbums = void 0;
const BASE_URL = "https://api.spotify.com";
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
async function GetToken() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        },
        body: 'grant_type=client_credentials'
    };
    try {
        const tokenResponse = await fetch(tokenEndpoint, options);
        const tokenData = await tokenResponse.json();
        return tokenData;
    }
    catch (err) {
        throw new Error("Error fetching access token");
    }
}
async function GetAlbums(req, res) {
    try {
        const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
        const getToken = await GetToken();
        const accessToken = getToken.access_token;
        const option = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const albumResponse = await fetch(albumsEndpoint, option);
        const albumsData = await albumResponse.json();
        res.status(200);
        if (albumsData.error)
            res.status(400);
        return res.status(200).json({ albumsData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
exports.GetAlbums = GetAlbums;
async function GetArtists(req, res) {
    try {
        const { limit, offset } = req.query;
        // const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=${offset}&limit=${limit}`;
        // const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums`;
        const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`;
        console.log(limit, offset);
        const getToken = await GetToken();
        const accessToken = getToken.access_token;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const artistsResponse = await fetch(artistsEndpoint, options);
        const artistsData = await artistsResponse.json();
        res.status(200);
        if (artistsData.error)
            res.status(400);
        return res.json({ artistsData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
exports.GetArtists = GetArtists;
