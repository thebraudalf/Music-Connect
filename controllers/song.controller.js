import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fetchSong, searchaSong } from "../utils/seeds/musicSeed/song.seed.js";
import { Song } from "../models/song.model.js";
import { ChatMessage } from "../models/message.model.js";
import { ListeningHistory } from "../models/listeningHistory.model.js";
import { generateChatCompetion } from "../utils/ai/PromptTemplate.js";

// get all songs controller logic
const getSongs = asyncHandler(async (req, res) => {
  // get all songs from db
  const getSong = await Song.find({});
  //console.log(getSong);

  if (!getSong || getSong.length === 0) {
    throw new ApiError(400, "Song not found in db");
  }

  // returing response
  return res
    .status(200)
    .json(new ApiResponse(200, getSong, "Successfully found songs to play"));
});

// get search song response controller logic
const getSearchSongResults = asyncHandler(async (req, res) => {
  const searchSong = req.songResponse;

  if (!searchSong) {
    throw new ApiError(400, "Unable to get song response");
  }

  // checking if song already present in db
  const songsAlreadyInDB = await Song.find({
    songId: await Promise.all(searchSong.map((songId) => songId.id)),
  });
  //console.log(songsAlreadyInDB);

  if (songsAlreadyInDB.length > 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          songsAlreadyInDB,
          "Songs which are already in DB searched Successfully.",
        ),
      );
  }

  // sending all data to db
  const songDataToSend = [];
  await Promise.all(
    searchSong.map(async (songData) => {
      songDataToSend.push({
        songId: songData.id,
        name: songData.name,
        duration: songData.duration,
        year: songData.year,
        language: songData.language,
        artists: songData.artists,
        image: songData.image,
        downloadUrl: songData.downloadUrl,
      });
    }),
  );

  const sendSongData = await Song.insertMany(songDataToSend);

  return res
    .status(200)
    .json(new ApiResponse(200, sendSongData, "Song searched Successfully."));
});

// play search song controller logic
const playSearchSongResults = asyncHandler(async (req, res) => {
  const { songId } = req.params;
  //console.log(songId);

  if (!songId) {
    throw new ApiError(400, "songId is required.");
  }

  // retriving relevent document
  const searchSong = await Song.find({ songId: songId });
  //console.log(searchSong);

  if (!searchSong) {
    throw new ApiError(400, "Unable to get data from db");
  }

  const playSong = await fetchSong(searchSong[0].songId);
  //console.log(playSong)

  // Used to retrieve songs by searching
  /* const playSong = [];
    await Promise.all(
        searchSong.map(async (songId) => {
            const getSongToPlay = await fetchSong(songId);
            console.log(getSongToPlay);
            playSong.push(getSongToPlay);
        }));
    */

  if (!playSong) {
    throw new ApiError(400, "Unable to get songs response to play");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playSong,
        "Successfully found searched songs to play",
      ),
    );
});

// next song suggestion controller logic
const playSuggestedSong = asyncHandler(async (req, res) => {
  // Step 1: get current songId and validate it
  // Step 2: find current song from DB via songId
  // Step 3: find user current mood from db by receiverId
  // Step 4: find songId from listening history from db and find song meta data(specially song title and artist)
  // Step 5: generate suggestion of next song to play through (current song: title, & artist), (user current mood: receiverMessage) and (listening history: through Step: 4 we get title, & artists)
  // Step 6: find next song based on generated text response which is title and artists
  // Step 7: return res of next song to play

  const currentSongId = req.updatingHistory.songId;

  if (!currentSongId) {
    throw new ApiError(400, "Song ID is required.");
  }

  const currentSong = await Song.findOne({ songId: currentSongId });
  if (!currentSong) {
    throw new ApiError(404, "Current song not found.");
  }

  const userCurrentMood = await ChatMessage.find({ receiverId: req.user._id });
  if (!userCurrentMood) {
    throw new ApiError(404, "User current mood not found.");
  }

  const listeningHistory = await ListeningHistory.find({
    userId: req.user._id.toHexString(),
  });
  if (!listeningHistory) {
    throw new ApiError(404, "Listening history not found.");
  }

  const listeningHistorySongs = await Song.find({
    songId: listeningHistory.map((history) => history.songId),
  });
  if (!listeningHistorySongs) {
    throw new ApiError(404, "Listening history songs not found.");
  }

  // Helper function for artist name extraction
  const getArtistNames = (artists) => {
    if (!artists || !Array.isArray(artists)) {
      return [];
    }
    return artists
      .flatMap((artist) => {
        if (artist?.primary && Array.isArray(artist.primary)) {
          return artist.primary
            .map((primaryArtist) => primaryArtist?.name)
            .filter(Boolean); // Filter out undefined names
        } else if (artist?.primary && artist.primary[0]?.name) {
          return [artist.primary[0].name];
        }
        return [];
      })
      .filter(Boolean);
  };

  const promptToGiveContext = () => {
    const currentArtistNames =
      getArtistNames(currentSong.artists).join(" & ") || "unknown";
    const mood =
      userCurrentMood?.map((mood) => mood.receiverLastMessage).join(", ") ||
      "unknown";
    const historySongNames =
      listeningHistorySongs?.map((song) => song.name).join(", ") ||
      "no recent history";
    const historyArtistNames =
      listeningHistorySongs
        ?.map((song) => getArtistNames(song.artists).join(" & "))
        .join(", ") || "no recent history";

    return new Object({
      role: "system",
      content: `# Role: Next Song Recommender # Goal: Based on the currently playing song "${currentSong.name}" by ${currentArtistNames} (genre: 'predict genre based on current song', mood: ${mood}), and (the recent listening history of ${historySongNames} by ${historyArtistNames}), recommend ONLY some songs with the EXACT titles: one of the example is ${currentSong.name} and by the EXACT artists: one of the example is ${currentArtistNames}. Do not provide any explanations, reasoning, or additional text. Just output example: ${currentSong.name} by ${currentArtistNames}`,
    });
  };

  try {
    const generateSongSuggestion = await generateChatCompetion(
      undefined,
      undefined,
      promptToGiveContext,
    );

    //console.log(generateSongSuggestion);

    if (!generateSongSuggestion) {
      throw new ApiError(500, "Failed to generate song suggestion from AI.");
    }

    // Basic extraction - you might need more sophisticated parsing)
    const [recommendedTitle, recommendedArtist] = generateSongSuggestion
      .split(" by ")
      .map((part) => part.replace(/"/g, "").trim());
    console.log(recommendedTitle, recommendedArtist);

    if (!recommendedTitle || !recommendedArtist) {
      return res
        .status(500)
        .json({ message: "Could not parse AI recommendation" });
    }

    const suggestedSongsDetails = [];

    // Iterate through the recommended titles and call the API
    for (const title of recommendedTitle) {
      try {
        const songData = await searchaSong(title);
        if (songData) {
          suggestedSongsDetails.push(songData);
        } else {
          console.warn(`No song data found for title: ${title}`);
        }
      } catch (error) {
        console.error(`Error searching for "${title}":`, error);
      }
    }

    //console.log("Suggested Songs Details from API:", suggestedSongsDetails);

    // returing response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          suggestedSongsDetails,
          "Song suggestion retrieved successfully!",
        ),
      );
  } catch (aiError) {
    console.error("AI Song Suggestion Error:", aiError);
    throw new ApiError(500, "Error generating song suggestion.", aiError); // Wrap AI errors
  }
});

export {
  getSongs,
  getSearchSongResults,
  playSearchSongResults,
  playSuggestedSong,
};
