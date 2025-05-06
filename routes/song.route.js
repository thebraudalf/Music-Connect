import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchValidation, songEventsValidation } from "../middlewares/search.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { searchSong, songsEvents } from "../middlewares/song.middleware.js";
import {
  getSearchSongResults,
  playSearchSongResults,
  getSongs,
  playSuggestedSong,
} from "../controllers/song.controller.js";

const router = Router();

// protected song routes
router.post(
  "/search-song",
  searchValidation,
  upload.none(),
  verifyJWT,
  searchSong,
  getSearchSongResults,
);
router.get("/play-search-song:songId", verifyJWT, playSearchSongResults);
router.get("/get-song", verifyJWT, getSongs);
router.post("/get-suggested-songs", songEventsValidation, upload.none(), verifyJWT, songsEvents, playSuggestedSong);

export default router;
