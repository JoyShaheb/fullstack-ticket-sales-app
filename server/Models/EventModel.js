import mongoose from "mongoose";

const EventScema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "New Event",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  // related events feature add later
});

export const EventModel = mongoose.model("Event", EventScema);
