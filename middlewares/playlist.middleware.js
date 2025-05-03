import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { searchaPlaylist } from "../utils/seeds/musicSeed/playlist.seed.js"
//import Joi from "joi";

// middleware for playlist name validation
// const playlistNameValidation = asyncHandler((req, res, next) => {
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


// middleware to search playlist
const searchPlaylist = asyncHandler(async (req, res, next) => {

    try {
        // getting request details
        const { searchQuery } = req.body;
        console.log(searchQuery);

        // checking if the searchQuery is present in the request body
        if (!searchQuery) {
            throw new ApiError(400, "search query is required!");
        }

        // calling searchaPlaylist function to get playlist meta data
        const playlistResponse = await searchaPlaylist(searchQuery);
        //console.log(playlistResponse);

        if (!playlistResponse) {
            throw new ApiError(400, "Unable to search playlist");
        }

        req.playlistResponse = playlistResponse;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
});

export { searchPlaylist };
