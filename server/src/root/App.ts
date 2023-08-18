import dotenv from "dotenv";
dotenv.config();
// process.env.NODE_ENV = 'vars';
// if (process.env.NODE_ENV === 'vars') 
dotenv.config({ path: '.env.vars' }); 


// import ConnectDB from "./db/ConnectDB";
import express, { Express, Request, Response } from "express";
import cors from "cors"; 
import spotifyRoutes from "./routes/Spotify";
import NotFound from "./errors/NotFound";
import path from "path";
import fs from "node:fs";


const app: Express = express();
// const indexPath = path.join(__dirname, 'public', 'index.html'); 
const indexPath = path.resolve(__dirname, "../../public/index.html");


app.use(express.static(path.resolve(__dirname, "../../public"))); 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use("/", spotifyRoutes); 

app.get('/', (req:Request, res: Response) => {
    res.sendFile(indexPath);
});

// const read = fs.readFileSync(indexPath, "utf-8");
// console.log(read); 



// ! Errors
app.use(NotFound);




const port = process.env.PORT || 3000;
// const port = 3000;
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