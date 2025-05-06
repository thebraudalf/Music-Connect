import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchValidation } from '../middlewares/search.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { searchAlbum } from '../middlewares/album.middleware.js';
import { getAlbums, getSearchAlbumResults, playSearchAlbumResults } from '../controllers/album.controller.js';

const router = Router();

// protected album routes
router.post('/search-album', searchValidation, upload.none(), verifyJWT, searchAlbum, getSearchAlbumResults);
router.get('/play-search-album:albumId', upload.none(), verifyJWT, playSearchAlbumResults);
router.get('/get-album', verifyJWT, getAlbums);

export default router;
