"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRandomURI = exports.GetArtists = exports.GetAlbums = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SpotifyAuth_1 = require("./SpotifyAuth");
const BASE_URL = "https://api.spotify.com";
async function GetAlbums(req, res) {
    // const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    const albumsEndpoint = 'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc';
    try {
        const getToken = await (0, SpotifyAuth_1.GetToken)();
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
        const getToken = await (0, SpotifyAuth_1.GetToken)();
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
    //- main
    // const randomEndpoint = "https://api.spotify.com/v1/artists/{id}";
    // const randomEndpoint = "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb";
    // const randomEndpoint = "https://api.spotify.com/v1/artists/4W3fa7tiXGVXl3KilbACqt?si=4bEkVXo_TYCWDRhWOzbVGA";
    // const randomEndpoint = process.env.GET_ALBUM as RequestInfo;
    // const randomEndpoint = process.env.GET_SEVERAL_ALBUMS as RequestInfo;
    const randomEndpoint = process.env.GET_ALBUM_TRACKS;
    try {
        const getToken = await (0, SpotifyAuth_1.GetToken)();
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
