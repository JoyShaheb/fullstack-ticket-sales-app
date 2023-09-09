import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hasedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email,
            password: hasedPassword,
        });

        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                email: findUser.email,
                userID: findUser._id,
                userRole: findUser.userRole,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "90d",
            }
        );

        // Set the JWT token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // The cookie is not accessible via JavaScript
            maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
        });

        // Exclude the 'password' property
        findUser.password = undefined;

        return res.status(200).json({
            message: "User logged in successfully",
            userData: {
                token,
                ...findUser._doc,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
}

export const updateUserData = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            profilePicture,
            address,
            phoneNumber,
            // email,
            // password,
            // userRole,
        } = req.body;

        const { id } = req.params;

        const findUser = await UserModel.findOne({ _id: id });

        if (!findUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            firstName,
            lastName,
            profilePicture,
            address,
            phoneNumber,
            // email,
            // password,
            // userRole,
        });

        res
            .status(200)
            .json({ message: "User data updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};