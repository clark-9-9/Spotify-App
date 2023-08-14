import dotenv from "dotenv";

dotenv.config();
// process.env.NODE_ENV = 'vars';
// if (process.env.NODE_ENV === 'vars') 
dotenv.config({ path: '.env.vars' }); 


// import ConnectDB from "./db/ConnectDB";
import express, { Express } from "express";
import spotifyRoutes from "./routes/Spotify";
import NotFound from "./errors/NotFound";

const app: Express = express();
app.use(express.json());

app.use("/app/v1", spotifyRoutes);
 

// ! Errors
app.use(NotFound);




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