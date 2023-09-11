"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthorizationCodeAuth_1 = require("../auth/AuthorizationCodeAuth");
const PrivateSpotifyApis_1 = require("../controllers/PrivateSpotifyApis");
const PublicSpotifyApis_1 = require("../controllers/PublicSpotifyApis");
const router = express_1.default.Router();
router.get("/login", AuthorizationCodeAuth_1.Login);
router.post("/callback", AuthorizationCodeAuth_1.Callback);
router.post("/refresh-token", AuthorizationCodeAuth_1.RefreshToken);
//- user data
router.post("/get-tracks", PrivateSpotifyApis_1.GetCurrentUsersTracks);
router.post("/get-playlists", PrivateSpotifyApis_1.GetCurrentUsersPlaylists);
router.post("/get-artists", PrivateSpotifyApis_1.GetCurrentUsersFollowing);
router.post("/get-albums", PrivateSpotifyApis_1.GetUserSavedAlbums);
//- single api
router.post("/get-playlist", PublicSpotifyApis_1.GetPlaylist);
router.post("/get-artist", PublicSpotifyApis_1.GetArtist);
router.post("/get-artist-tracks", PublicSpotifyApis_1.GetArtistTopTrack);
router.post("/get-album", PublicSpotifyApis_1.GetAlbum);
exports.default = router;
