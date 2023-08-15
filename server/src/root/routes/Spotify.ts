import express, { Router } from "express";
import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/SpotifyApis";
import { Login, Callback } from "../auth/AuthorizationCodeAuth";

const router: Router = express.Router();



router.get("/get-albums", GetAlbums);
router.get("/get-artists", GetArtists);
router.get("/get-random", GetRandomURI);
router.get("/login", Login);
router.get("/callback", Callback);


export default router;