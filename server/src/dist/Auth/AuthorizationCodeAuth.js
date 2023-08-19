"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUsersPlaylists = exports.RefreshToken = exports.Callback = exports.Login = void 0;
const node_querystring_1 = __importDefault(require("node:querystring"));
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/callback";
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
;
async function Login(req, res) {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const queryParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
    };
    const url = node_querystring_1.default.stringify(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${url}`;
    res.redirect(authUrl);
}
exports.Login = Login;
async function Callback(req, res, next) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    // const storedState = req.cookies ? req.cookies[stateKey] : null;
    try {
        if (state === null || code === null) {
            res.redirect('/#' +
                node_querystring_1.default.stringify({
                    error: 'authorization_failed'
                }));
        }
        else {
            const tokenEndpoint = "https://accounts.spotify.com/api/token";
            const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
            const authOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": authHeader
                },
                body: node_querystring_1.default.stringify({
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code',
                }),
            };
            const response = await fetch(tokenEndpoint, authOptions);
            const data = await response.json();
            res.cookie('access_token', "access_token" in data ? data.access_token : null, { httpOnly: true });
            res.cookie('refresh_token', "refresh_token" in data ? data.refresh_token : null, { httpOnly: true });
            res.redirect("/");
            // response.ok ? res.status(200): res.status(401);
            // res.json({ data, status: res.statusCode });
        }
    }
    catch (err) {
        // res.status(500).json(err);
        console.error(err);
    }
}
exports.Callback = Callback;
async function RefreshToken(req, res) {
    const refresh_token = req.cookies.refresh_token;
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token)}`;
    const authOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader
        },
        body: body
    };
    try {
        const response = await fetch(tokenEndpoint, authOptions);
        const data = await response.json();
        if (response.ok)
            res.status(200).json({ data, status: 200 });
        else
            res.status(401).json({ data, status: 401 });
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.RefreshToken = RefreshToken;
async function GetCurrentUsersPlaylists(req, res) {
    // if("access_token" in )
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token missing' });
    }
    try {
        const playlistsEndpoint = 'https://api.spotify.com/v1/me';
        const playlistsResponse = await fetch(playlistsEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (playlistsResponse.ok) {
            const playlistsData = await playlistsResponse.json();
            res.status(200).json({ playlistsData });
        }
        else {
            res.status(playlistsResponse.status).json({ error: 'Failed to fetch playlists' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.GetCurrentUsersPlaylists = GetCurrentUsersPlaylists;
;
