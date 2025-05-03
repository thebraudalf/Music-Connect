import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchValidation } from '../middlewares/search.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { searchPlaylist } from '../middlewares/playlist.middleware.js';
import { getSearchPlaylistResults, playSearchPlaylistResults, getPlaylists } from '../controllers/playlist.controller.js';

const router = Router();

// protected playlist routes
router.post('/search-playlist', searchValidation, upload.none(), verifyJWT, searchPlaylist, getSearchPlaylistResults);
router.get('/play-search-playlist:playlistId', upload.none(), verifyJWT, playSearchPlaylistResults);
router.get('/get-playlist', verifyJWT, getPlaylists);


export default router;
