import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

// verifying access token
const verifyJWT = asyncHandler(async (req, _, next) => {
    // Step 1: get access token from cookies and from header
    // Step 2: check if is there any token
    // Step 3: decode token to verify
    // Step 4: remove password and access token from db
    // Step 5: req user 

    try {
        // getting access token from cookies and from authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log(token);

        // checking if is there any token 
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // decoding token to verify
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // removing password and access token from db
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        //console.log(error);
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
})

export { verifyJWT }
