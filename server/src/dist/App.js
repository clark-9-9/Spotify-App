"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// process.env.NODE_ENV = 'vars';
// if (process.env.NODE_ENV === 'vars') 
dotenv_1.default.config({ path: '.env.vars' });
// import ConnectDB from "./db/ConnectDB";
const express_1 = __importDefault(require("express"));
const Spotify_1 = __importDefault(require("./routes/Spotify"));
const NotFound_1 = __importDefault(require("./errors/NotFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/app/v1", Spotify_1.default);
// ! Errors
app.use(NotFound_1.default);
const port = process.env.PORT || 3000;
function start() {
    try {
        // const URI = process.env.MONGO_URI;
        // if(!URI) throw new Error("MongoDB URI not defined"); 
        // ConnectDB(URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    }
    catch (err) {
        console.log(err);
    }
}
start();
