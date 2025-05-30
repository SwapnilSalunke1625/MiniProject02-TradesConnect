import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    postJob,
    getJobPosts,
    getJobPostsForSP,
    sendMail, // Import the new controller function
    acceptJob,
    rejectJob,
    completeJob,
    rateJob
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/register")
//     .post(upload.fields(
//         [
//             { name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }
//         ]
//     ), registerUser);
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/sendMail").post(sendMail);

//secured User routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// Job Post routes
router.route("/job-post").post(verifyJWT, postJob);
router.route("/get-job-posts").get(verifyJWT, getJobPosts);
router.route("/get-job-posts-for-sp").get(verifyJWT, getJobPostsForSP);
router.route('/:jobId/accept').patch(verifyJWT, acceptJob);
router.route('/:jobId/reject').patch(verifyJWT, rejectJob);
router.route('/:jobId/complete').patch(verifyJWT, completeJob);
router.route('/:jobId/rate').patch(verifyJWT, completeJob);

export default router;