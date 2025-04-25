import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import Joi from "joi";

// middleware for signup validation
const registerValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log("error", error);
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

// middleware for login validation
const loginValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        username: Joi.string().min(3).max(100),
        password: Joi.string().min(4).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

const changeCurrentPasswordValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        oldPassword: Joi.string().min(4).required(),
        newPassword: Joi.string().min(4).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

const updateAccountDetailsValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

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

export { registerValidation, loginValidation, changeCurrentPasswordValidation, updateAccountDetailsValidation, verifyJWT }
