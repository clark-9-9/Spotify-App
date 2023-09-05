import express, { Router } from "express";

import { 
    Login, 
    Callback, 
    RefreshToken
} from "../auth/AuthorizationCodeAuth";

import { 
    GetCurrentUsersPlaylists, 
    GetCurrentUsersTracks,
    GetCurrentUsersFollowing
} from "../controllers/PrivateSpotifyApis";


const router: Router = express.Router();


router.get("/login", Login);
router.post("/callback", Callback);
router.post("/refresh-token", RefreshToken);


//- user data
router.post("/get-tracks", GetCurrentUsersTracks);
router.post("/get-playlists", GetCurrentUsersPlaylists);
router.post("/get-artists", GetCurrentUsersFollowing);

export default router;