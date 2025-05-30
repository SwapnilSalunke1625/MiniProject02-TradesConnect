import mongoose from "mongoose";
/*
who is posting the job?
who is providing the service?
what is the job?
what is the service required?
what is the price?
what is the location?
what is the rating?
what is the availability?
what are the additional details?
time of job posting?
what are the badges?
*/

const jobPostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    additionalDetails: {
        type: String,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
    },
    jobProgress: {
        type: String,
        default: "new",
        enum: ["new", "pending", "completed"],
    }
}, { timestamps: true });

export const JobPost = mongoose.model("JobPost", jobPostSchema);
