import express, { Router } from "express";
import { GetAlbums, GetArtists } from "../controllers/Spotify";

const router: Router = express.Router();




router.get("/get-albums", GetAlbums);
router.get("/get-artists", GetArtists);



export default router;