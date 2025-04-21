import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {Server} from "socket.io";
import { createServer } from "http";
import { initializeSocketIO } from "./utils/socket/index.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

initializeSocketIO(io); // initialize the socket io

export { httpServer }
