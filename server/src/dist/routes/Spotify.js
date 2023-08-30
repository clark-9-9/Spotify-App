"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PublicSpotifyApis_1 = require("../controllers/PublicSpotifyApis");
const AuthorizationCodeAuth_1 = require("../auth/AuthorizationCodeAuth");
const PrivateSpotifyApis_1 = require("../controllers/PrivateSpotifyApis");
const router = express_1.default.Router();
router.get("/get-albums", PublicSpotifyApis_1.GetAlbums);
router.get("/get-artists", PublicSpotifyApis_1.GetArtists);
router.get("/get-random", PublicSpotifyApis_1.GetRandomURI);
router.get("/login", AuthorizationCodeAuth_1.Login);
router.post("/callback", AuthorizationCodeAuth_1.Callback);
router.get("/get-playlists", PrivateSpotifyApis_1.GetCurrentUsersPlaylists);
/*
router.get("/callback", Callback);
router.get("/get-token", GetAccessToken);
router.get("/refresh_token", RefreshToken)
*/
exports.default = router;
