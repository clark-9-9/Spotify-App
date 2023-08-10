import dotenv from "dotenv";
dotenv.config();

import ConnectDB from "./db/ConnectDB";
import express, { Express, Request, Response } from "express";


const app: Express = express();


const BASE_URL = "https://api.spotify.com";
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const albumsEndpoint = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'; 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;



app.get("/get-albums", async (req: Request, res: Response) => {
    try {
        const tokenResponse = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
            },
            body: 'grant_type=client_credentials'
        })

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        

        const albumResponse = await fetch(albumsEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
      
        const albumData = await albumResponse.json();
        return res.status(200).json({ tokenData, accessToken, albumData });      

    } catch(err) {
        console.error("Error: ", err);
        return res.json({ err });
    }
})


 



const port: string | number = process.env.PORT || 3000;
function start() {
  
    try {
        // const URI = process.env.MONGO_URI;
        // if(!URI) throw new Error("MongoDB URI not defined"); 
        // ConnectDB(URI);

        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch(err) {
        console.log(err);
    }
}

start();