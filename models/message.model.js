import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema(
  {
    receiverLastMessage: {
      type: String,
    },
    senderLastMessage: {
      type: String,
    },
    senderMessage: {
      type: String,
    },
    receiverMessage: {
      type: String,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
