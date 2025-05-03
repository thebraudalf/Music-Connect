import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { searchaAlbum } from "../utils/seeds/musicSeed/album.seed.js"
//import Joi from "joi";

// middleware for song name validation
// const albumNameValidation = asyncHandler((req, res, next) => {
//     const schema = Joi.object({
//         searchQuery: Joi.string().min(5),
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//         console.log("error", error);
//         return res.status(400)
//             .json(new ApiError(400, "Bad request: ", error))
//     }

//     next();
// })


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
