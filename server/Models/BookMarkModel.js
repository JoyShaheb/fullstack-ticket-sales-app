import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Replace 'User' with the appropriate model name for users
    required: true,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Replace 'Event' with the appropriate model name for events
    },
  ],
});

export const BookMarkModel = mongoose.model("bookmark", BookMarkSchema);
