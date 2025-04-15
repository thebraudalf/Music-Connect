import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { app } from "./app.js";

dotenv.config();

// connecting to MongoDB and setting up server
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed! ", error);
    });

    
