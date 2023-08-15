"use strict";
//- Type of Authorization (Client Credentials Flow)
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToken = void 0;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
async function GetToken() {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const authHeader = 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': authHeader,
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
exports.GetToken = GetToken;
