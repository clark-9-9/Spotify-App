import express, { Router } from "express";
import { GetAlbums, GetArtists, GetRandomURI } from "../controllers/SpotifyApis";

const router: Router = express.Router();




router.get("/get-albums", GetAlbums);
router.get("/get-artists", GetArtists);
router.get("/get-random", GetRandomURI);



export default router;