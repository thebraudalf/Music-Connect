import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
    songId: {
        type: String,
    },
    name: {
        type: String,
    },
    duration: {
        type: Number,
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
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    }
}, { timestamps: true });

export const Song = mongoose.model('Song', songSchema);
