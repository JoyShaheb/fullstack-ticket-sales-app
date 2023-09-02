import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        default: "",
    },
    lastName: {
        type: String,
        required: false,
        default: "",
    },
    profilePicture: {
        type: String,
        required: false,
        default: "",
    },
    address: {
        type: String,
        required: false,
        default: "",
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
        default: "",
    },
    userRole: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

export const UserModel = mongoose.model("User", userSchema);