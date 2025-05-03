import mongoose, { Schema } from "mongoose";

const listeningHistorySchema = new Schema({
  eventType: {
    type: String,
  },
  userId: {
    type: String,
  },
  songId: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  playCount: {
    type: Number,
  },
  isLiked: {
    type: Boolean,
  },
});

export const ListeningHistory = mongoose.model(
  "ListeningHistory",
  listeningHistorySchema,
);
