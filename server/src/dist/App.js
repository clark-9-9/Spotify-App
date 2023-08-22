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
const cors_1 = __importDefault(require("cors"));
const Spotify_js_1 = __importDefault(require("./routes/Spotify.js"));
const NotFound_js_1 = __importDefault(require("./errors/NotFound.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const indexPath = path_1.default.resolve(__dirname, "./public/index.html");
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public")));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", Spotify_js_1.default);
app.get('/', (req, res) => {
    res.sendFile(indexPath);
});
app.get('/home', (req, res) => {
    res.send("<h1>hello world</h1>");
});
app.use(NotFound_js_1.default);
const port = process.env.PORT || 3000;
// const port = 3000;
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
