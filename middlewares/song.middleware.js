import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { searchaSong } from "../utils/seeds/musicSeed/song.seed.js";
import {
  produceEvents,
  consumeEvents,
} from "../utils/fluvio/produceAndConsumeEvents.js";
import { ListeningHistory } from "../models/listeningHistory.model.js";

// middleware to search song
const searchSong = asyncHandler(async (req, res, next) => {
  // Step 1: get req details
  // Step 2: call searchSong func to get song meta data
  // Step 3: return res
  // Step 4: pass the middleware

  try {
    // getting request details
    const { searchQuery } = req.body;
    console.log(searchQuery);

    // checking if the searchQuery is present in the request body
    if (!searchQuery) {
      throw new ApiError(400, "search query is required!");
    }

    // calling searchSong function to get song meta data
    const songResponse = await searchaSong(searchQuery);
    //console.log(songResponse);

    if (!songResponse) {
      throw new ApiError(400, "Unable to search song");
    }

    req.songResponse = songResponse;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
});

// song events controller logic
const songsEvents = asyncHandler(async (req, res, next) => {
  // Step 1: get song events, userId and songId from req.body
  // Step 2: publish or produce all events to fluvio and consume or get events data from fluvio
  // Step 4: insert all current events to listeningHistory collection
  // Step 5: return res

  try {
    // getting song events, userId and songId from from req.body
    const { userId, songId, eventType } = req.body;

    // checking if they are given or not
    if (!userId || !songId || !eventType) {
      throw new ApiError(400, "userId, songId and eventType are required.");
    }

    // checking if eventType is play or like only or not
    if (eventType !== "play" && eventType !== "like") {
      throw new ApiError(
        400,
        "eventType only can be play or like and only in small letters.",
      );
    }

    // publishing and producing all events to fluvio
    const songListeningData = {
      event_type: eventType,
      user_id: userId,
      song_id: songId,
      timestamp: new Date().toISOString(),
    };

    await produceEvents(songListeningData);
    const consumeEventData = await consumeEvents();

    if (!consumeEventData) {
      throw new ApiError(400, "Unable to generate consume event data");
    }

    // checking, updating and inserting if data is already in DB
    let updatingHistory;
    if (consumeEventData.event_type === "play") {
      // updating if play count is already in DB
      updatingHistory = await ListeningHistory.findOneAndUpdate(
        {
          songId: consumeEventData.song_id,
          userId: consumeEventData.user_id,
          eventType: consumeEventData.event_type,
        },
        {
          timestamp: consumeEventData.timestamp,
          $inc: { playCount: 1 },
        },
        { new: true, upsert: true },
      );
    } else if (consumeEventData.event_type === "like") {
      // updating if like count is already in DB
      updatingHistory = await ListeningHistory.findOneAndUpdate(
        {
          songId: consumeEventData.song_id,
          userId: consumeEventData.user_id,
          eventType: consumeEventData.event_type,
        },
        {
          timestamp: consumeEventData.timestamp,
          isLiked: true,
        },
        { new: true, upsert: true },
      );
    }

    if (updatingHistory) {
      //console.log(updatingHistory);
      req.updatingHistory = updatingHistory;
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { searchSong, songsEvents };
