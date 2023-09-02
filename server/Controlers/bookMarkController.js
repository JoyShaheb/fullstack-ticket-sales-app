import { BookMarkModel } from "../Models/BookmarkModel.js";
import { EventModel } from "../Models/EventModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// bookmarked events
export const getAllBookMarks = async (req, res) => {
    try {
        const { token } = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
            }

            const allBookMarks = await BookMarkModel.find({});
            res.status(200).json({ message: "saved bookmarks", allBookMarks });
        });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};

export const saveToBookMark = async (req, res) => {
    try {
        const { token } = req.cookies;
        const { eventID } = req.body;

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            const { userID } = decoded;
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
            }

            const event = await EventModel.findById(eventID);
            if (!event) {
                res.status(404).json({ message: "Event not found" });
            }

            let bookmarkEntry = await BookMarkModel.findOne({ userID });

            if (!bookmarkEntry) {
                bookmarkEntry = new BookMarkModel({ userID, bookmarks: [] });
            }

            // Push the event's ID to the bookmarks array in the bookmark entry
            if (!bookmarkEntry.bookmarks.includes(eventID)) {
                bookmarkEntry.bookmarks.push(eventID);
            }

            // Save the bookmark entry
            await bookmarkEntry.save();

            res.status(200).json({ message: "Event saved to Bookmark !" });
        });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};