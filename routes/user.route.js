import { Router } from "express";
import {
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerValidation, loginValidation, changeCurrentPasswordValidation, updateAccountDetailsValidation, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerValidation,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]), registerUser);

router.route("/login").post(loginValidation, upload.none(), loginUser);


// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(changeCurrentPasswordValidation, upload.none(), verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(updateAccountDetailsValidation, upload.none(), verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

export default router
