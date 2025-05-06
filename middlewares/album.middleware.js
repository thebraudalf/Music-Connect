import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { searchaAlbum } from "../utils/seeds/musicSeed/album.seed.js"


// middleware to search album
const searchAlbum = asyncHandler(async (req, res, next) => {

    try {
        // getting request details
        const { searchQuery } = req.body;
        //console.log(searchQuery);

        // checking if the searchQuery is present in the request body
        if (!searchQuery) {
            throw new ApiError(400, "search query is required!");
        }

        // calling searchaAlbum function to get song meta data
        const albumResponse = await searchaAlbum(searchQuery);
        //console.log(albumResponse);

        if (!albumResponse) {
            throw new ApiError(400, "Unable to search album");
        }

        req.albumResponse = albumResponse;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
});

export { searchAlbum };
