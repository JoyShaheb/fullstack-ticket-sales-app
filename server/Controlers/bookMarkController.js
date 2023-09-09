import { BookMarkModel } from "../Models/BookMarkModel.js";
import { EventModel } from "../Models/EventModel.js";
import dotenv from "dotenv";

dotenv.config();

// get all bookmarked events
export const getAllBookMarks = async (req, res) => {
    try {
        const userID = req.userID;

        if (!userID) {
            res.status(401).json({ message: "Unauthorized" });
            return; // Return early to prevent further execution
        }

        const findUserBookMarks = await BookMarkModel.findOne({ userID });

        if (!findUserBookMarks) {
            res
                .status(200)
                .json({ message: "bookmarks", findUserBookMarks, data: [] });
            return; // Return early if the user has no bookmarks
        }

        const bookmarkedEventIDs = findUserBookMarks.bookmarks;

        // Fetch event data using the bookmarkedEventIDs
        const eventData = await EventModel.find({
            _id: { $in: bookmarkedEventIDs },
        });

        res
            .status(200)
            .json({ message: "bookmarks", findUserBookMarks, data: eventData });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};

// save something to bookmark
export const saveToBookMark = async (req, res) => {
    try {
        const userID = req.userID;
        const { eventID } = req.body;

        if (!userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let findUserBookMarks = await BookMarkModel.findOne({ userID });

        if (!findUserBookMarks) {
            // Create a new bookmark document if the user doesn't have one
            findUserBookMarks = new BookMarkModel({ userID, bookmarks: [] });
        }

        // Check if the eventID is not already in the bookmarks array
        if (!findUserBookMarks.bookmarks.includes(eventID)) {
            findUserBookMarks.bookmarks.push(eventID); // Add the eventID to the existing or new bookmark
            await findUserBookMarks.save(); // Save the updated bookmark to the database
        }

        res.status(200).json({ message: "saved to bookmarks", eventID });
    } catch (err) {
        console.error("Error saving to bookmarks:", err);
        res.status(500).json({ message: "something went wrong" });
    }
};


// remove something from bookmark
export const removeEventFromBookmark = async (req, res) => {
    try {
        const userID = req.userID;
        const { eventID } = req.body;

        if (!userID) {
            res.status(401).json({ message: "Unauthorized" });
            return; // Return early to prevent further execution
        }

        const findUserBookMarks = await BookMarkModel.findOne({ userID });

        if (!findUserBookMarks) {
            // If the user has no bookmarks, there's nothing to remove.
            res.status(200).json({ message: "No bookmarks to remove", eventID });
            return;
        }

        // Check if the eventID exists in the bookmarks array
        const bookmarkIndex = findUserBookMarks.bookmarks.indexOf(eventID);

        if (bookmarkIndex === -1) {
            // If the eventID is not found in the bookmarks array, there's nothing to remove.
            res.status(200).json({ message: "Event is not bookmarked", eventID });
            return;
        }

        // Remove the eventID from the bookmarks array
        findUserBookMarks.bookmarks.splice(bookmarkIndex, 1);

        // Save the updated bookmark to the database
        await findUserBookMarks.save();

        res.status(200).json({ message: "Event removed from bookmarks", eventID });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};