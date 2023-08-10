"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BASE_URL = "https://api.spotify.com";
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
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
        console.log(err);
        throw new Error("Error fetching access token");
    }
}
async function GetAlbums(req, res) {
    try {
        const getToken = await GetToken();
        const accessToken = getToken.access_token;
        const albumResponse = await fetch(albumsEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const albumData = await albumResponse.json();
        return res.status(200).json({ getToken, accessToken, albumData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
