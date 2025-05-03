import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { fetchAlbum } from "../utils/seeds/musicSeed/album.seed.js";
import { Album } from "../models/album.model.js"

// get all albums controller logic
const getAlbums = asyncHandler(async (req, res) => {
    // get all albums from db
    const getAlbum = await Album.find({});
    //console.log(getAlbum);

    if (!getAlbum || getAlbum.length === 0) {
        throw new ApiError(400, "Album not found in db");
    }

    // returing response
    return res.status(200)
        .json(new ApiResponse(200, getAlbum, "Successfully found albums to play"))
});

// get search album response controller logic
const getSearchAlbumResults = asyncHandler(async (req, res) => {
    const searchAlbum = req.albumResponse;

    if (!searchAlbum) {
        throw new ApiError(400, "Unable to get album response");
    }


    // checking if album already present in db
    const albumsAlreadyInDB = await Album.find({ albumId: await Promise.all(searchAlbum.map(albumId => albumId.id)) });
    //console.log(albumsAlreadyInDB);

    if (albumsAlreadyInDB.length > 0) {
        return res.status(200)
            .json(new ApiResponse(200, albumsAlreadyInDB, "Albums which are already in DB searched Successfully."))
    }

    // sending all data to db
    const albumDataToSend = [];
    await Promise.all(searchAlbum.map(async (albumData) => {
        albumDataToSend.push({
            albumId: albumData.id,
            name: albumData.name,
            description: albumData.description,
            year: albumData.year,
            language: albumData.language,
            artists: albumData.artists,
            image: albumData.image,
        })
    }))

    const sendAlbumData = await Album.insertMany(albumDataToSend)

    return res.status(200)
        .json(new ApiResponse(200, sendAlbumData, "Album searched Successfully."))
});

// play search album controller logic
const playSearchAlbumResults = asyncHandler(async (req, res) => {
    const { albumId } = req.params;
    //console.log(albumId);

    if (!albumId) {
        throw new ApiError(400, "albumId is required.")
    }

    // retriving relevent document
    const searchAlbum = await Album.find({ albumId: albumId });
    //console.log(searchAlbum);

    if (!searchAlbum) {
        throw new ApiError(400, "Unable to get data from db");
    }

    const playAlbum = await fetchAlbum(searchAlbum[0].albumId);
    //console.log(playAlbum)

    // Used to retrieve albums by searching 
    /* const playAlbum = [];
    await Promise.all(
        searchAlbum.map(async (albumId) => {
            const getAlbumToPlay = await fetchAlbum(albumId);
            console.log(getAlbumToPlay);
            playAlbum.push(getAlbumToPlay);
        }));
    */

    if (!playAlbum) {
        throw new ApiError(400, "Unable to get albums response to play")
    }

    return res.status(200)
        .json(new ApiResponse(200, playAlbum, "Successfully get searched albums to play"));
});

export { getAlbums, getSearchAlbumResults, playSearchAlbumResults }
