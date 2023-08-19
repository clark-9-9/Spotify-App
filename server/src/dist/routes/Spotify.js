"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SpotifyApis_1 = require("../controllers/SpotifyApis");
const AuthorizationCodeAuth_1 = require("../auth/AuthorizationCodeAuth");
const router = express_1.default.Router();
router.get("/get-albums", SpotifyApis_1.GetAlbums);
router.get("/get-artists", SpotifyApis_1.GetArtists);
router.get("/get-random", SpotifyApis_1.GetRandomURI);
router.get("/login", AuthorizationCodeAuth_1.Login);
router.get("/callback", AuthorizationCodeAuth_1.Callback);
router.get("/refresh_token", AuthorizationCodeAuth_1.RefreshToken);
router.get("/get-playlists", AuthorizationCodeAuth_1.GetCurrentUsersPlaylists);
exports.default = router;
