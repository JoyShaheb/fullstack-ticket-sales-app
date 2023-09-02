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
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
        default: "",
    },
    type: {
        type: String,
        required: true,
        enum: ["concert", "comedy"],
    },
    // related events feature add later
});

export const EventModel = mongoose.model("Event", EventScema);