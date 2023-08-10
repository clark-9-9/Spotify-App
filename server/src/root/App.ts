import dotenv from "dotenv";
dotenv.config();

// import ConnectDB from "./db/ConnectDB";
import express, { Express } from "express";
import spotifyRoutes from "./routes/Spotify";

const app: Express = express();
app.use(express.json());

app.use("/app/v1", spotifyRoutes);
 



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