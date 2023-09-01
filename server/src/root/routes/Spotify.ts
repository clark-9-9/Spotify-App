import express, { Router } from "express";
// import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/PublicSpotifyApis";
import { 
    Login, 
    Callback, 
} from "../auth/AuthorizationCodeAuth";

import { 
    GetCurrentUsersPlaylists, 
    GetCurrentUsersTracks,
} from "../controllers/PrivateSpotifyApis";


const router: Router = express.Router();


router.get("/login", Login);
router.post("/callback", Callback);


//- user data
router.get("/get-tracks", GetCurrentUsersTracks);
router.get("/get-playlists", GetCurrentUsersPlaylists);


export default router;