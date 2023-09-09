import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
});

export const BookMarkModel = mongoose.model("bookmark", BookMarkSchema);