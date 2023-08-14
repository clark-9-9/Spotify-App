const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

interface AccessTokenType {
    "access_token": string;
    "token_type": string;
    "expires_in": number;
    error?: any;
}


//- Type of Authorization (Client Credentials Flow)
async function GetToken(): Promise<AccessTokenType>  {
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
        const tokenResponse = await fetch(tokenEndpoint, options)
        const tokenData = await tokenResponse.json();
        return tokenData;
    } catch(err) {
        throw new Error("Error fetching access token");
    }
}



//- Type of Authorization (Authorization Code with PKCE Flow)








export { GetToken };