import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    playlistId: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    year: {
        type: String,
    },
    language: {
        type: String,
    },
    artists: {
        type: [Object],
    },
    image: {
        type: [Object],
    },
    downloadUrl: {
        type: [Object],
    }
}, { timestamps: true });

export const Playlist = mongoose.model('Playlist', playlistSchema);
