import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { fetchPlaylist } from "../utils/seeds/musicSeed/playlist.seed.js";
import { Playlist } from "../models/playlist.model.js"

// get all playlists controller logic
const getPlaylists = asyncHandler(async (req, res) => {
    // get all playlists from db
    const getPlaylist = await Playlist.find({});
    //console.log(getPlaylist);

    if (!getPlaylist || getPlaylist.length === 0) {
        throw new ApiError(400, "Playlist not found in db");
    }

    // returing response
    return res.status(200)
        .json(new ApiResponse(200, getPlaylist, "Successfully found playlists to play"))
});

// get search playlist response controller logic
const getSearchPlaylistResults = asyncHandler(async (req, res) => {
    const searchPlaylist = req.playlistResponse;

    if (!searchPlaylist) {
        throw new ApiError(400, "Unable to get playlist response");
    }


    // checking if playlist already present in db
    const playlistsAlreadyInDB = await Playlist.find({ playlistId: await Promise.all(searchPlaylist.map(playlistId => playlistId.id)) });
    //console.log(playlistsAlreadyInDB);

    if (playlistsAlreadyInDB.length > 0) {
        return res.status(200)
            .json(new ApiResponse(200, playlistsAlreadyInDB, "playlists which are already in DB searched Successfully."))
    }

    // sending all data to db
    const playlistDataToSend = [];
    await Promise.all(searchPlaylist.map(async (playlistData) => {
        playlistDataToSend.push({
            playlistId: playlistData.id,
            name: playlistData.name,
            language: playlistData.language,
            image: playlistData.image,
        })
    }))

    const sendPlaylistData = await Playlist.insertMany(playlistDataToSend)

    return res.status(200)
        .json(new ApiResponse(200, sendPlaylistData, "Playlist searched Successfully."))
});

// play search playlist controller logic
const playSearchPlaylistResults = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    //console.log(playlistId);

    if (!playlistId) {
        throw new ApiError(400, "playlistId is required.")
    }

    // retriving relevent document
    const searchPlaylist = await Playlist.find({ playlistId: playlistId });
    //console.log(searchPlaylist);

    if (!searchPlaylist) {
        throw new ApiError(400, "Unable to get data from db");
    }

    const playPlaylist = await fetchPlaylist(searchPlaylist[0].playlistId);
    console.log(playPlaylist)

    // Used to retrieve playlists by searching 
    /* const playPlaylist = [];
    await Promise.all(
        searchPlaylist.map(async (playlistId) => {
            const getPlaylistToPlay = await fetchPlaylist(playlistId);
            console.log(getPlaylistToPlay);
            playPlaylist.push(getPlaylistToPlay);
        }));
    */

    if (!playPlaylist) {
        throw new ApiError(400, "Unable to get playlist response to play")
    }

    return res.status(200)
        .json(new ApiResponse(200, playPlaylist, "Successfully get searched playlists to play"));
});

export { getPlaylists, getSearchPlaylistResults, playSearchPlaylistResults }
