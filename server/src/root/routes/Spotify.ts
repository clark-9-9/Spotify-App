import express, { Router } from "express";
// import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/PublicSpotifyApis";
import { 
    Login, 
    Callback, 
    RefreshToken
} from "../auth/AuthorizationCodeAuth";

import { 
    GetCurrentUsersPlaylists, 
    GetCurrentUsersTracks,
} from "../controllers/PrivateSpotifyApis";


const router: Router = express.Router();


router.get("/login", Login);
router.post("/callback", Callback);


//- user data
router.post("/get-tracks", GetCurrentUsersTracks);
router.post("/get-playlists", GetCurrentUsersPlaylists);
router.post("/refresh-token", RefreshToken);

export default router;