"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/PublicSpotifyApis";
const AuthorizationCodeAuth_1 = require("../auth/AuthorizationCodeAuth");
const PrivateSpotifyApis_1 = require("../controllers/PrivateSpotifyApis");
const router = express_1.default.Router();
router.get("/login", AuthorizationCodeAuth_1.Login);
router.post("/callback", AuthorizationCodeAuth_1.Callback);
//- user data
router.post("/get-tracks", PrivateSpotifyApis_1.GetCurrentUsersTracks);
router.post("/get-playlists", PrivateSpotifyApis_1.GetCurrentUsersPlaylists);
router.post("/refresh-token", AuthorizationCodeAuth_1.RefreshToken);
exports.default = router;
