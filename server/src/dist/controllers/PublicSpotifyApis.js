"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRandomURI = exports.GetArtists = exports.GetAlbums = void 0;
const ClientCredentialsAuth_1 = require("../auth/ClientCredentialsAuth");
async function GetAlbums(req, res) {
    // const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    try {
        const getToken = await (0, ClientCredentialsAuth_1.GetToken)();
        if (getToken.error)
            res.status(401).json({ error: getToken.error });
        const accessToken = getToken.access_token;
        const option = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const albumResponse = await fetch(albumsEndpoint, option);
        const albumsData = await albumResponse.json();
        if (albumsData.error)
            return res.status(401).json({ error: albumsData.error });
        return res.status(200).json({ albumsData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
exports.GetAlbums = GetAlbums;
async function GetArtists(req, res) {
    // const{ limit, offset } = req.query;
    //- main
    const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`;
    // const artistsEndpoint = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=${offset}&limit=${limit}`;
    try {
        const getToken = await (0, ClientCredentialsAuth_1.GetToken)();
        if (getToken.error)
            res.status(401).json({ error: getToken.error });
        const accessToken = getToken.access_token;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const artistsResponse = await fetch(artistsEndpoint, options);
        const artistsData = await artistsResponse.json();
        if (artistsData.error)
            res.status(401).json({ error: artistsData.error });
        return res.status(200).json({ artistsData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
exports.GetArtists = GetArtists;
async function GetRandomURI(req, res) {
    const randomEndpoint = process.env.GET_ALBUM_TRACKS;
    try {
        const getToken = await (0, ClientCredentialsAuth_1.GetToken)();
        if (getToken.error)
            res.status(401).json({ error: getToken.error });
        const accessToken = getToken.access_token;
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        };
        const randomResponse = await fetch(randomEndpoint, options);
        const randomData = await randomResponse.json();
        if (randomData.error)
            res.status(401).json({ error: randomData.error });
        return res.status(200).json({ random: randomData });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
exports.GetRandomURI = GetRandomURI;
