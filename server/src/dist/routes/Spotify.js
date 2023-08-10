"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Spotify_1 = require("../controllers/Spotify");
const router = express_1.default.Router();
router.get("/get-albums", Spotify_1.GetAlbums);
router.get("/get-artists", Spotify_1.GetArtists);
exports.default = router;
