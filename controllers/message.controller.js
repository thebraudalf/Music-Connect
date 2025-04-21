import { ChatMessage } from "../models/message.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emitSocketEvent } from "../utils/socket/index.js";
import { ChatEventEnum } from "../constants.js";

// send message logic
const sendMessage = asyncHandler(async (req, res) => {
    // Step 1: Extract the user message from the request body
    // Step 2: Pass the req.chatResponse to the ChatMessage model to save the message
    // Step 3: If the message is saved successfully, return a success response with the message

    // extrecting the user message from the request body
    const { receiverMessage } = req.body;
    console.log("receiverMessage", receiverMessage);

    // checking if the receiverMessage and content is present in the request body
    if (!receiverMessage) {
        throw new ApiError(400, "Receiver message are required");
    }

    // checking if the req.chatResponse is present in the request body
    const chatResponse = req.chatResponse;

    if (!req.chatResponse) {
        throw new ApiError(400, "Chat response is required");
    }
    //console.log("chatResponse", chatResponse);

    // passing the req.chatResponse to the ChatMessage model to save the message
    // creating a new message object with the sender and receiver id
    const message = await ChatMessage.create({
        receiverId: req.user._id,
        receiverLastMessage: receiverMessage,
        senderMessage: chatResponse,
        senderLastMessage: chatResponse,
    });

    if (!message) {
        throw new ApiError(400, "Unable to send message");
    }

    // emitting the socket event to the user with the message id
    emitSocketEvent(req, req.user._id, ChatEventEnum.MESSAGE_RECEIVED_EVENT, message);

    return res.status(200)
        .json(new ApiResponse(200, "Message sent successfully", message));
});

// get all messages logic
const getAllMessages = asyncHandler(async (req, res) => {
    // Step 1: Get all the messages from the ChatMessage model
    // Step 2: If the messages are found, return a success response with the messages

    const messages = await ChatMessage.find({ receiverId: req.user._id }).select("-receiverId");
    console.log("messages", messages);

    if (!messages) {
        throw new ApiError(400, "Unable to find messages");
    }

    return res.status(200)
        .json(new ApiResponse(200, "Messages retrieved successfully", messages));
});

// delete message logic
const deleteMessage = asyncHandler(async (req, res) => {
    // Step 1: Get the message id from the request params
    // Step 2: Find the message by id and delete it
    // Step 3: If the message is deleted successfully, return a success response

    const { receiverId } = req.params;

    if (!receiverId) {
        throw new ApiError(400, "Message id is required");
    }

    const message = await ChatMessage.findOneAndDelete({ receiverId: req.user._id }).select("-receiverId");

    if (!message) {
        throw new ApiError(400, "Unable to delete message");
    }

    // emitting the socket event to the user with the message id
    emitSocketEvent(req, req.user._id, ChatEventEnum.MESSAGE_DELETE_EVENT, message);

    return res.status(200)
        .json(new ApiResponse(200, "Message deleted successfully", message));
});

export { sendMessage, getAllMessages, deleteMessage };
