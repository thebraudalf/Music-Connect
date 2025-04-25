import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteImageFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import path from "path";
import { extractPublicId } from "cloudinary-build-url";

// register user logic
const registerUser = asyncHandler(async (req, res) => {
    // Step 1. get user details
    // Step 2. check for validation
    // Step 3. check if user is already registered or not
    // Step 4. check for images, check for avatar 
    // Step 5. upload them to cloudinary  
    // Step 6. register user or create user object in db
    // Step 7. remove password and refresh token field from response
    // Step 8. check for user creation
    // Step 9. return response

    // getting user details
    const { username, email, fullName, password } = req.body;
    //console.log("email: ", email);


    // checking validation of fields 
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }


    // checking if user is already exist 
    const existedUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }


    // checking if avatar and coverImage local path is given 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //console.log(avatarLocalPath);

    // if (!avatarLocalPath) { 
    //     throw new ApiError(400, "Avatar file path is required")
    // }

    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
        //console.log(coverImageLocalPath);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    //console.log(avatar);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    //console.log(coverImage);

    // if (!avatar) {
    //     throw new ApiError(400, "Avatar file is required")
    // }


    // creating user object
    const user = await User.create({
        fullName,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    // removing password and refreshToken field from res
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    // returning response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

// generating access and refresh token
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken: accessToken, refreshToken: refreshToken }

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

// login user logic
const loginUser = asyncHandler(async (req, res) => {
    // Step 1: get user's username, email and password
    // Step 2: check for Validation
    // Step 3: check if user is registered user or not
    // Step 4: check req body password with user password in db 
    // Step 5: generate access token and refresh token
    // Step 6: remove password and refresh token field from response
    // Step 7: send tokens with cookies
    // Step 8: return res

    // get username, email and password
    const { username, email, password } = req.body;
    //console.log("email: ", email);


    // checking validation of fields
    if (!(username || email)) {
        throw new ApiError(400, "username or email is required");
    }


    // checking if user is registered user
    const user = await User.findOne({
        $or: [{ username: username }, { email: email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials")
    }


    // generating access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


    // removing password and refreshToken field from res
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    // sending tokens with cookies
    const options = {
        httpOnly: true,
        secure: true
    }


    // return response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken: accessToken, refreshToken: refreshToken
                },
                "User logged In Successfully"
            )
        )
})

// logout user logic
const logoutUser = asyncHandler(async (req, res) => {
    // Step 1: verify access token and remove access token from db
    // Step 2: clear access token from cookies and return res

    // verifying access token and removing access token from db
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )


    // clearing access token from cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    // returing response
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken".options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

// reLogin(when access token is expired) user logic
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Step 1: get incoming refresh token
    // Step 2: decode or verify refresh token
    // Step 3: check verified refresh token with db refresh token
    // Step 4: send tokens with cookies
    // Step 5: return res

    // getting incoming refresh token
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }


    // decoding and verifying refresh token 
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )


        // checking verifed token with db refresh token
        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }


        // sending tokens with cookies 
        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


        // returning response
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken: accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        console.log(error);
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

// change password logic
const changeCurrentPassword = asyncHandler(async (req, res) => {
    // Step 1: get old and new password
    // Step 2: find user with user id(which is saved in db)
    // Step 3: check if password is correct
    // Step 4: save new password
    // Step 5: return res

    // getting old and new password
    const { oldPassword, newPassword } = req.body


    // finding user with user id(which is saved in db)
    const user = await User.findById(req.user?._id)


    // checking if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }


    // saving new password
    user.password = newPassword
    await user.save({ validateBeforeSave: false })


    // returing response
    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

// get current user logic
const getCurrentUser = asyncHandler(async (req, res) => {
    // Step 1: return res

    // returning response
    return res.status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

// update account details logic
const updateAccountDetails = asyncHandler(async (req, res) => {
    // Step 1: get details or fields to update
    // Step 2: find user with user id(which is saved in db) and update the fields
    // Step 3: return res

    // getting details or fields to update
    const { username, fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }


    // finding user with user id and update the fields
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username: username,
                fullName: fullName,
                email: email
            }
        },
        { new: true }
    ).select("-password")


    // returning response
    res.status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

// update user avatar logic
const updateUserAvatar = asyncHandler(async (req, res) => {
    // Step 1: get user avatar local path
    // Step 2: delete old avatar from cloudinary 
    // Step 3: upload avatar local path to cloudinary
    // Step 4: find user with user id(which is saved in db) and update the avatar
    // Step 5: return res

    // getting user avatar local path
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }


    // deleting old avatar from cloudinary
    const oldAvatarPath = extractPublicId(`"${req.user?.avatar}"`);
    //console.log(oldCoverImagePath.trim())

    const oldAvatar = await deleteImageFromCloudinary(oldAvatarPath.trim())

    if (!oldAvatar) {
        throw new ApiError(400, "Error while deleting old cover image")
    }


    // uploading avatar local path to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }


    // finding user with user id and updating the avatar
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")


    // returing response
    return res.status(200)
        .json(new ApiResponse(200, user, "Avatar image updated successfully"))
})

// update user cover image logic
const updateUserCoverImage = asyncHandler(async (req, res) => {
    // Step 1: get user cover image local path
    // Step 2: delete old cover image of db from cloudinary
    // Step 2: upload cover image local path to cloudinary
    // Step 3: find user with user id and update the cover image
    // Step 4: return res

    // getting  user cover image local path
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }


    // deleting old cover image of db from cloudinary
    // let filenameWithPrefix, filenameWithoutPrefix;
    // if (oldCoverImagePath) {
    //     filenameWithPrefix = path.basename(oldCoverImagePath)
    //     filenameWithoutPrefix = path.basename(filenameWithPrefix, path.extname(filenameWithPrefix)) 
    //     console.log(filenameWithPrefix);
    // } else {
    //     console.error("Cover image is not found");
    // }

    // another logic to delete cover image
    const oldCoverImagePath = extractPublicId(`"${req.user?.coverImage}"`);
    //console.log(oldCoverImagePath.trim())

    const oldCoverImage = await deleteImageFromCloudinary(oldCoverImagePath.trim())

    if (!oldCoverImage) {
        throw new ApiError(400, "Error while deleting old cover image")
    }


    // uploading cover image local path to cloudinary
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading cover image")
    }


    // finding user with user id and updating the cover image
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password")


    // returing response
    return res.status(200)
        .json(new ApiResponse(200, user, "Cover Image updated successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
}
