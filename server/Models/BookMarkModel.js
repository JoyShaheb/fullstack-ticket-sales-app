import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema({
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

export const BookMarkModel = mongoose.model("bookmark", BookMarkSchema);