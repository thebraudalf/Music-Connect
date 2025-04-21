import cookie from "cookie";
import jwt from "jsonwebtoken";
import { ApiError } from "../ApiError.js";
import { Server } from "socket.io";
import { User } from "../../models/user.model.js";
import { ChatEventEnum } from "../../constants.js";


const initializeSocketIO = (io) => {
    return io.on("connection", async (socket) => {
        try {
            // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
            const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

            let token = cookies?.accessToken; // get the accessToken

            if (!token) {
                // If there is no access token in cookies. Check inside the handshake auth
                token = socket.handshake.auth?.token;
            }

            if (!token) {
                // Token is required for the socket to work
                throw new ApiError(401, "Un-authorized handshake. Token is missing");
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // decode the token

            const user = await User.findById(decodedToken?._id).select(
                "-password -refreshToken"
            );

            // retrieve the user
            if (!user) {
                throw new ApiError(401, "Un-authorized handshake. Token is invalid");
            }
            socket.user = user; // mount te user object to the socket

            // We are creating a room with user id so that if user is joined but does not have any active chat going on.
            // still we want to emit some socket events to the user.
            // so that the client can catch the event and show the notifications.
            socket.join(user._id.toString());
            socket.emit(ChatEventEnum.CONNECTED_EVENT); // emit the connected event so that client is aware
            console.log("User connected 🗼. userId: ", user._id.toString());

            socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
                console.log("user has disconnected 🚫. userId: " + socket.user?._id);
                if (socket.user?._id) {
                    socket.leave(socket.user._id);
                }
            });
        } catch (error) {
            console.log(error);
            socket.emit(
                ChatEventEnum.SOCKET_ERROR_EVENT,
                error?.message || "Something went wrong while connecting to the socket."
            );
        }
    });
};


const emitSocketEvent = (req, userId, event, payload) => {
    req.app.get("io").to(userId).emit(event, payload);
};

export { initializeSocketIO, emitSocketEvent };