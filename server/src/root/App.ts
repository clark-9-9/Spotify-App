import dotenv from "dotenv";
dotenv.config();

import ConnectDB from "./db/ConnectDB";
import express, { Express, Request, Response } from "express";


const app: Express = express();



 



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