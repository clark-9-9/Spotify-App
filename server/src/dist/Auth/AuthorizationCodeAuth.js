"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.Callback = exports.Login = void 0;
const node_querystring_1 = __importDefault(require("node:querystring"));
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REDIRECT_URI = "http://localhost:8080/callback";
const REDIRECT_URI = "http://localhost:3000";
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
    const scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private playlist-read-private playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-library-modify user-library-read user-follow-modify user-follow-read';
    const queryParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
    };
    const url = node_querystring_1.default.stringify(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${url}`;
    res.redirect(authUrl);
}
exports.Login = Login;
async function Callback(req, res) {
    const code = req.body.code;
    try {
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';
        const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader,
            },
            body: node_querystring_1.default.stringify({
                code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        };
        const response = await fetch(tokenEndpoint, authOptions);
        const data = await response.json();
        if (!('error' in data)) {
            res.cookie('access_token', data.access_token, { httpOnly: true });
            res.cookie('refresh_token', data.refresh_token, { httpOnly: true });
        }
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
exports.Callback = Callback;
async function RefreshToken(req, res) {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token)
        return res.status(401).json({ error: 'Refresh token missing' });
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
        if ("access_token" in data) {
            res.status(200).json({
                access_token: data.access_token,
                expiries_in: data.expires_in
            });
        }
        else {
            res.status(401).json({ data });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.RefreshToken = RefreshToken;
