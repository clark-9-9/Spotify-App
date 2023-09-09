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

import { 
    GetArtist, 
    GetArtistTopTrack, 
    GetPlaylist 
} from "../controllers/PublicSpotifyApis";


const router: Router = express.Router();


router.get("/login", Login);
router.post("/callback", Callback);
router.post("/refresh-token", RefreshToken);


//- user data
router.post("/get-tracks", GetCurrentUsersTracks);
router.post("/get-playlists", GetCurrentUsersPlaylists);
router.post("/get-artists", GetCurrentUsersFollowing);


//- single api
router.post("/get-playlist", GetPlaylist);
router.post("/get-artist", GetArtist);
router.post("/get-artist-tracks", GetArtistTopTrack);


export default router;