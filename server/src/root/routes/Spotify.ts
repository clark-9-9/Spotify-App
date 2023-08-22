import express, { Router } from "express";
import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/PublicSpotifyApis";
import { 
    Login, 
    Callback, 
    RefreshToken, 
    GetAccessToken
} from "../auth/AuthorizationCodeAuth";

import {
    GetCurrentUsersPlaylists,
} from "../controllers/PrivateSpotifyApis";


const router: Router = express.Router();

router.get("/get-albums", GetAlbums);
router.get("/get-artists", GetArtists);
router.get("/get-random", GetRandomURI);

router.get("/login", Login);
router.get("/callback", Callback);
router.get("/get-token", GetAccessToken);
router.get("/refresh_token", RefreshToken)

router.get("/get-playlists", GetCurrentUsersPlaylists);

export default router;